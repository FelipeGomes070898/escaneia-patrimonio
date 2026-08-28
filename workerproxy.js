/**
 * Worker do Escaneia Patrimônio — dois trabalhos em um só:
 *
 * 1) Proxy do sistema do governo: contorna o bloqueio de CORS que impede o
 *    app (hospedado no GitHub Pages) de buscar diretamente uma página de
 *    e-estado.ro.gov.br em segundo plano. Uso: GET /?url=https://e-estado.ro.gov.br/...
 *
 * 2) API dos registros online: guarda, numa KV (um "banco de dados" simples
 *    da Cloudflare), a parte de texto de cada item escaneado (tombo,
 *    descrição, local, horário — sem foto, pra ficar leve). Assim, o que é
 *    registrado em um aparelho fica visível para os outros aparelhos que
 *    também tenham o app aberto, sem precisar estar no mesmo celular.
 *    Endpoints:
 *      GET    /api/registros        -> lista todos os registros
 *      POST   /api/registros        -> cria ou atualiza um registro (corpo em JSON)
 *      DELETE /api/registros/{id}   -> remove um registro
 *
 * IMPORTANTE: para o item 2 funcionar, este Worker precisa de uma KV
 * Namespace vinculada com o nome exato "REGISTROS_KV" (ver instruções de
 * configuração enviadas junto com este arquivo).
 */

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

const ALLOWED_HOST = 'e-estado.ro.gov.br';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const JSON_HEADERS = { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' };

// Chave única na KV onde a lista inteira de registros é guardada (formato
// simples: um array de objetos, em JSON).
const REGISTROS_KEY = 'lista_registros';

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const reqUrl = new URL(request.url);

  // --- API de registros online ---
  if (reqUrl.pathname === '/api/registros') {
    if (request.method === 'GET') return listarRegistros();
    if (request.method === 'POST') return salvarRegistro(request);
    return new Response('Método não suportado.', { status: 405, headers: CORS_HEADERS });
  }
  if (reqUrl.pathname.startsWith('/api/registros/') && request.method === 'DELETE') {
    const id = decodeURIComponent(reqUrl.pathname.slice('/api/registros/'.length));
    return excluirRegistro(id);
  }

  // --- Proxy do site do governo (contorna CORS) ---
  return buscarSiteDoGoverno(reqUrl);
}

function getKv() {
  if (typeof REGISTROS_KV === 'undefined') return null;
  return REGISTROS_KV;
}

async function listarRegistros() {
  const kv = getKv();
  if (!kv) return semKvConfigurada();
  const raw = await kv.get(REGISTROS_KEY);
  const lista = raw ? JSON.parse(raw) : [];
  return new Response(JSON.stringify(lista), { headers: JSON_HEADERS });
}

async function salvarRegistro(request) {
  const kv = getKv();
  if (!kv) return semKvConfigurada();

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response('JSON inválido.', { status: 400, headers: CORS_HEADERS });
  }
  if (!data || !data.id) {
    return new Response('Campo "id" ausente.', { status: 400, headers: CORS_HEADERS });
  }

  const raw = await kv.get(REGISTROS_KEY);
  const lista = raw ? JSON.parse(raw) : [];
  const idx = lista.findIndex((r) => r.id === data.id);
  if (idx >= 0) lista[idx] = data; else lista.push(data);
  await kv.put(REGISTROS_KEY, JSON.stringify(lista));

  return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
}

async function excluirRegistro(id) {
  const kv = getKv();
  if (!kv) return semKvConfigurada();

  const raw = await kv.get(REGISTROS_KEY);
  let lista = raw ? JSON.parse(raw) : [];
  lista = lista.filter((r) => r.id !== id);
  await kv.put(REGISTROS_KEY, JSON.stringify(lista));

  return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
}

function semKvConfigurada() {
  return new Response(
    'A KV "REGISTROS_KV" ainda não está vinculada a este Worker. Veja as instruções de configuração.',
    { status: 500, headers: CORS_HEADERS }
  );
}

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
