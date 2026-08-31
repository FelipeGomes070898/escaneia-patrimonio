/**
 * Worker do Escaneia Patrimônio — quatro trabalhos em um só:
 *
 * 1) Proxy do sistema do governo: contorna o bloqueio de CORS que impede o
 *    app (hospedado no GitHub Pages) de buscar diretamente uma página de
 *    e-estado.ro.gov.br em segundo plano. Uso: GET /?url=https://e-estado.ro.gov.br/...
 *
 * 2) API dos registros online: guarda, num banco D1 (banco de dados de
 *    verdade da Cloudflare, tipo uma planilha com tabelas), a parte de
 *    texto de cada item escaneado (tombo, descrição, local, horário).
 *    Endpoints:
 *      GET    /api/registros        -> lista todos os registros
 *      POST   /api/registros        -> cria ou atualiza um registro (corpo em JSON)
 *      DELETE /api/registros/{id}   -> remove um registro
 *
 * 3) Fotos online: guarda as fotos dos itens num bucket R2 (armazenamento
 *    de arquivos da Cloudflare), pra qualquer aparelho conseguir ver a
 *    foto de um item registrado em outro celular.
 *    Endpoints:
 *      POST /api/foto/{id}  -> envia a foto (corpo = a imagem em si)
 *      GET  /api/foto/{id}  -> devolve a foto
 *
 * 4) Backup automático: todo dia, de madrugada, salva uma cópia de todos
 *    os registros num arquivo JSON dentro do mesmo bucket R2 (pasta
 *    "backups/"), por segurança.
 *
 * IMPORTANTE — este Worker precisa de 3 vinculações (bindings) configuradas
 * no painel da Cloudflare, com esses nomes exatos:
 *   - D1 Database  -> nome da variável: DB
 *   - R2 Bucket    -> nome da variável: FOTOS_R2
 *   - Cron Trigger -> ex.: todo dia às 07:00 UTC (03:00 em Rondônia)
 * (ver instruções de configuração enviadas junto com este arquivo)
 */

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

addEventListener('scheduled', (event) => {
  event.waitUntil(runBackup());
});

const ALLOWED_HOST = 'e-estado.ro.gov.br';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const JSON_HEADERS = { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' };

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const reqUrl = new URL(request.url);

  // --- API de registros (texto) ---
  if (reqUrl.pathname === '/api/registros') {
    if (request.method === 'GET') return listarRegistros();
    if (request.method === 'POST') return salvarRegistro(request);
    return new Response('Método não suportado.', { status: 405, headers: CORS_HEADERS });
  }
  if (reqUrl.pathname.startsWith('/api/registros/') && request.method === 'DELETE') {
    const id = decodeURIComponent(reqUrl.pathname.slice('/api/registros/'.length));
    return excluirRegistro(id);
  }

  // --- API de fotos ---
  if (reqUrl.pathname.startsWith('/api/foto/')) {
    const id = decodeURIComponent(reqUrl.pathname.slice('/api/foto/'.length));
    if (request.method === 'POST') return salvarFoto(id, request);
    if (request.method === 'GET') return buscarFoto(id);
    return new Response('Método não suportado.', { status: 405, headers: CORS_HEADERS });
  }

  // --- Proxy do site do governo (contorna CORS) ---
  return buscarSiteDoGoverno(reqUrl);
}

function getDb() { return typeof DB === 'undefined' ? null : DB; }
function getBucket() { return typeof FOTOS_R2 === 'undefined' ? null : FOTOS_R2; }

function semDbConfigurado() {
  return new Response('O banco de dados "DB" ainda não está vinculado a este Worker.', { status: 500, headers: CORS_HEADERS });
}
function semBucketConfigurado() {
  return new Response('O armazenamento de fotos "FOTOS_R2" ainda não está vinculado a este Worker.', { status: 500, headers: CORS_HEADERS });
}

/* ------------------------------------------------------------------ *
 * Registros (D1)
 * ------------------------------------------------------------------ */

async function listarRegistros() {
  const db = getDb();
  if (!db) return semDbConfigurado();
  const { results } = await db.prepare(
    `SELECT id, tipo, patrimonio,
            patrimonio_key AS patrimonioKey,
            descricao, local, link,
            criado_em AS criadoEm,
            atualizado_em AS atualizadoEm,
            dispositivo,
            foto_url AS fotoUrl
     FROM registros
     ORDER BY atualizado_em DESC`
  ).all();
  return new Response(JSON.stringify(results || []), { headers: JSON_HEADERS });
}

async function salvarRegistro(request) {
  const db = getDb();
  if (!db) return semDbConfigurado();

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response('JSON inválido.', { status: 400, headers: CORS_HEADERS });
  }
  if (!data || !data.id) {
    return new Response('Campo "id" ausente.', { status: 400, headers: CORS_HEADERS });
  }

  await db.prepare(
    `INSERT INTO registros
       (id, tipo, patrimonio, patrimonio_key, descricao, local, link, criado_em, atualizado_em, dispositivo, foto_url)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
     ON CONFLICT(id) DO UPDATE SET
       tipo = excluded.tipo,
       patrimonio = excluded.patrimonio,
       patrimonio_key = excluded.patrimonio_key,
       descricao = excluded.descricao,
       local = excluded.local,
       link = excluded.link,
       criado_em = excluded.criado_em,
       atualizado_em = excluded.atualizado_em,
       dispositivo = excluded.dispositivo,
       foto_url = COALESCE(excluded.foto_url, registros.foto_url)`
  ).bind(
    data.id,
    data.tipo || '',
    data.patrimonio || '',
    data.patrimonioKey || '',
    data.descricao || '',
    data.local || '',
    data.link || '',
    data.criadoEm || '',
    data.atualizadoEm || '',
    data.dispositivo || '',
    data.fotoUrl || null
  ).run();

  return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
}

async function excluirRegistro(id) {
  const db = getDb();
  if (!db) return semDbConfigurado();

  await db.prepare('DELETE FROM registros WHERE id = ?1').bind(id).run();

  const bucket = getBucket();
  if (bucket) {
    try { await bucket.delete('foto_' + id + '.jpg'); } catch (e) { /* melhor esforço */ }
  }

  return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
}

/* ------------------------------------------------------------------ *
 * Fotos (R2)
 * ------------------------------------------------------------------ */

async function salvarFoto(id, request) {
  const bucket = getBucket();
  if (!bucket) return semBucketConfigurado();
  if (!id) return new Response('id ausente.', { status: 400, headers: CORS_HEADERS });

  const contentType = request.headers.get('Content-Type') || 'image/jpeg';
  const bytes = await request.arrayBuffer();
  if (!bytes || bytes.byteLength === 0) {
    return new Response('Foto vazia.', { status: 400, headers: CORS_HEADERS });
  }

  await bucket.put('foto_' + id + '.jpg', bytes, { httpMetadata: { contentType } });
  return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
}

async function buscarFoto(id) {
  const bucket = getBucket();
  if (!bucket) return semBucketConfigurado();

  const obj = await bucket.get('foto_' + id + '.jpg');
  if (!obj) return new Response('Não encontrada.', { status: 404, headers: CORS_HEADERS });

  const headers = new Headers(CORS_HEADERS);
  headers.set('Content-Type', (obj.httpMetadata && obj.httpMetadata.contentType) || 'image/jpeg');
  headers.set('Cache-Control', 'public, max-age=604800');
  return new Response(obj.body, { headers });
}

/* ------------------------------------------------------------------ *
 * Backup automático (Cron Trigger)
 * ------------------------------------------------------------------ */

async function runBackup() {
  const db = getDb();
  const bucket = getBucket();
  if (!db || !bucket) return;
  try {
    const { results } = await db.prepare('SELECT * FROM registros').all();
    const dataHoje = new Date().toISOString().slice(0, 10);
    await bucket.put('backups/registros-' + dataHoje + '.json', JSON.stringify(results || []), {
      httpMetadata: { contentType: 'application/json; charset=utf-8' }
    });
  } catch (e) {
    /* melhor esforço — se falhar, tenta de novo no próximo dia */
  }
}

/* ------------------------------------------------------------------ *
 * Proxy do site do governo
 * ------------------------------------------------------------------ */

async function buscarSiteDoGoverno(reqUrl) {
  const target = reqUrl.searchParams.get('url');

  if (!target) {
    return new Response('Parâmetro "url" ausente. Use assim: ?url=https://e-estado.ro.gov.br/publico/bens/31290158', {
      status: 400,
      headers: CORS_HEADERS
    });
  }

  let targetUrl;
  try {
    targetUrl = new URL(target);
  } catch (e) {
    return new Response('URL inválida.', { status: 400, headers: CORS_HEADERS });
  }

  if (targetUrl.hostname !== ALLOWED_HOST) {
    return new Response('Domínio não permitido. Este proxy só busca páginas de ' + ALLOWED_HOST + '.', {
      status: 403,
      headers: CORS_HEADERS
    });
  }

  try {
    const upstream = await fetch(targetUrl.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EscaneiaPatrimonioBot/1.0)' }
    });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': upstream.headers.get('Content-Type') || 'text/html; charset=utf-8'
      }
    });
  } catch (e) {
    return new Response('Erro ao buscar o site do governo: ' + (e && e.message ? e.message : String(e)), {
      status: 502,
      headers: CORS_HEADERS
    });
  }
}
