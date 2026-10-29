/* Rota do Concurso - app de estudo offline (HTML/JS puro). Progresso salvo no navegador (localStorage). */
(function () {
  'use strict';
  var C = window.CONC;
  /* Contas locais: cada usuário tem os seus dados (progresso, histórico, erros) em chaves próprias do navegador. */
  var LS_USERS = 'estudo.users', LS_LEGADO = 'estudo.v1', LS_LEGADO_SIM = 'estudo.sim', UID = '';
  var $app = document.getElementById('app');
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem armazenamento: segue em memória */ } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { } }
  function chave() { return 'estudo.v1.' + UID; }
  function chaveSim() { return 'estudo.sim.' + UID; }

  /* ---------- Estado ---------- */
  function defaults() { return { done: {}, answers: {}, erros: {}, rev: {}, notas: {}, links: {}, sims: [], cron: {}, meta: 5, tema: '', nivel: '', concurso: '', perfil: null, dia: {}, metaq: 30, metaNota: 70, visto: {}, retomar: null, quizAtual: null, conclAvisada: {} }; }
  var S = defaults();
  function carregar() { try { S = Object.assign(defaults(), JSON.parse(lsGet(chave()) || '{}')); } catch (e) { S = defaults(); } }
  function save() { if (UID) lsSet(chave(), JSON.stringify(S)); }
  function loadSim() { try { return JSON.parse(lsGet(chaveSim()) || 'null'); } catch (e) { return null; } }
  function saveSim(s) { if (!UID) return; if (s) lsSet(chaveSim(), JSON.stringify(s)); else lsDel(chaveSim()); }

  /* ---------- Utilidades ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return iso(new Date()); }
  function addDays(isoStr, n) { var d = new Date(isoStr + 'T12:00:00'); d.setDate(d.getDate() + n); return iso(d); }
  function brDate(isoStr) { var p = isoStr.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function mat(id) { return C.materias.filter(function (m) { return m.id === id; })[0]; }
  function topico(m, t) { var mm = mat(m); return mm && mm.topicos.filter(function (x) { return x.id === t; })[0]; }
  function nvInfo() { return C.niveis.filter(function (n) { return n.id === S.nivel; })[0]; }
  function topsOf(m) { return m.topicos.filter(function (t) { return t.nv.indexOf(S.nivel) >= 0; }); }
  function mats() { return C.materias.filter(function (m) { return topsOf(m).length; }); }
  function visivel(mid, tid) { var t = topico(mid, tid); return !!t && t.nv.indexOf(S.nivel) >= 0; }
  function qById(id) { return C.questoes.filter(function (q) { return q.id === id; })[0]; }
  function qsOf(m, t) { return C.questoes.filter(function (q) { return (!m || q.m === m) && (!t || q.t === t) && visivel(q.m, q.t); }); }
  function tkey(m, t) { return m + '/' + t; }
  function ask(msg, yes) {
    var o = document.createElement('div'); o.className = 'modal';
    o.innerHTML = '<div class="box" role="dialog" aria-modal="true"><p>' + esc(msg) + '</p><div class="row"><button class="btn pri" id="ask-y">Sim</button><button class="btn" id="ask-n">Cancelar</button></div></div>';
    document.body.appendChild(o);
    o.querySelector('#ask-n').onclick = function () { o.remove(); };
    o.querySelector('#ask-y').onclick = function () { o.remove(); yes(); };
    o.querySelector('#ask-y').focus();
  }
  function toast(msg) { var d = document.createElement('div'); d.className = 'toast'; d.textContent = msg; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 2200); }
  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }
  function bar(p, cor) { return '<div class="bar"><i style="width:' + p + '%' + (cor ? ';background:' + cor : '') + '"></i></div>'; }
  var LET = ['A', 'B', 'C', 'D', 'E'];

  /* ---------- Contas: login e senha ---------- */
  function usuarios() { try { return JSON.parse(lsGet(LS_USERS) || '[]'); } catch (e) { return []; } }
  function salvaUsuarios(l) { lsSet(LS_USERS, JSON.stringify(l)); }
  function normLogin(l) { return String(l || '').trim().toLowerCase(); }
  /* Identificador de login: celular, e-mail ou nome de usuário. Guardado normalizado (celular como "tel:DDD+número"). */
  var TIPOS = { celular: { nome: 'Celular', rotulo: 'Número de celular (com DDD)', ph: 'Ex.: (69) 99999-9999', tipo: 'tel', modo: 'tel', auto: 'tel' },
    email: { nome: 'E-mail', rotulo: 'E-mail', ph: 'Ex.: maria@email.com', tipo: 'email', modo: 'email', auto: 'email' },
    usuario: { nome: 'Usuário', rotulo: 'Nome de usuário', ph: 'Ex.: maria.silva', tipo: 'text', modo: 'text', auto: 'username' } };
  function soDigitos(t) { var d = String(t || '').replace(/\D/g, ''); if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2); if (d.length === 11 + 1 && d.charAt(0) === '0') d = d.slice(1); return d; }
  function pareceCelular(t) { return /^[\d\s()+.\-]+$/.test(String(t || '').trim()) && soDigitos(t).length >= 8; }
  function tipoDoLogin(l) { return String(l).indexOf('tel:') === 0 ? 'celular' : String(l).indexOf('@') > 0 ? 'email' : 'usuario'; }
  /* Entrada digitada no login: descobre se é celular, e-mail ou usuário */
  function detectaLogin(raw) { raw = String(raw || '').trim(); if (raw.indexOf('@') > 0) return raw.toLowerCase(); if (pareceCelular(raw)) return 'tel:' + soDigitos(raw); return raw.toLowerCase(); }
  /* Valida e normaliza o identificador no cadastro, conforme a opção escolhida */
  function validaIdentificador(tipo, raw) {
    raw = String(raw || '').trim();
    if (tipo === 'celular') { var d = soDigitos(raw); if (d.length < 10 || d.length > 11 || +d.slice(0, 2) < 11) return { erro: 'Digite o celular com DDD, por exemplo (69) 99999-9999.' }; if (d.length === 11 && d.charAt(2) !== '9') return { erro: 'Celular com 11 dígitos começa com 9 depois do DDD.' }; return { login: 'tel:' + d }; }
    if (tipo === 'email') { if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw)) return { erro: 'Digite um e-mail válido, como nome@email.com.' }; return { login: raw.toLowerCase() }; }
    if (!/^[a-zA-Z0-9._\-]{3,30}$/.test(raw)) return { erro: 'O usuário precisa ter de 3 a 30 caracteres: letras, números, ponto, hífen ou sublinhado, sem espaços.' };
    if (/^\d+$/.test(raw)) return { erro: 'O usuário não pode ser só números (use a opção Celular para isso).' };
    return { login: raw.toLowerCase() };
  }
  function mostraLogin(l) { l = String(l); if (l.indexOf('tel:') !== 0) return l; var d = l.slice(4); return '(' + d.slice(0, 2) + ') ' + (d.length === 11 ? d.slice(2, 7) + '-' + d.slice(7) : d.slice(2, 6) + '-' + d.slice(6)); }
  /* Dono: só quem digita o código secreto (guardado no site apenas como hash). Vale por conta, neste aparelho. */
  function codigoDonoOk(cod) {
    var a = window.ADMIN; if (!a || !a.hash) return false;
    return sha256hex(a.sal + String(cod || '').toUpperCase().replace(/[^A-Z0-9]/g, '')) === a.hash;
  }
  /* Papéis: dono (e-mails autorizados, guardados como hash) > colaborador (liberado pelo dono) > aluno (padrão) */
  function loginEhDono(login) { var a = window.ADMIN; if (!a || !a.donos || !login) return false; return a.donos.indexOf(sha256hex(String(a.salEmail) + String(login).trim().toLowerCase())) >= 0; }
  function papelDe(u) { if (!u) return 'aluno'; return loginEhDono(u.login) ? 'dono' : (u.papel === 'colaborador' ? 'colaborador' : 'aluno'); }
  function papelAtual() { return papelDe(usuarioAtual()); }
  /* menu da área: aparece para o dono e para colaboradores */
  function mostraAreaDono() { var p = papelAtual(); return !!UID && (p === 'dono' || p === 'colaborador'); }
  /* acesso liberado: dono precisa também do código (o e-mail do login não é verificado); colaborador foi liberado pelo dono */
  function ehDono() { var p = papelAtual(); return !!UID && ((p === 'dono' && S.donoOk === true) || p === 'colaborador'); }
  function ehDonoPleno() { return papelAtual() === 'dono' && ehDono(); }
  var PAPEL_NOME = { dono: 'Dono', colaborador: 'Colaborador', aluno: 'Aluno' };
  function usuarioAtual() { return usuarios().filter(function (u) { return u.id === UID; })[0] || null; }
  function sessaoId() { var v = ''; try { v = sessionStorage.getItem('estudo.sessao') || ''; } catch (e) { } return v || lsGet('estudo.sessao') || ''; }
  /* Contador de cadastros do site inteiro (serviço externo gratuito; aproximado). Cada conta soma 1 uma única vez. */
  var CONTADOR = 'https://abacus.jasoncameron.dev', CONT_NS = 'rota-concurso-pvh-2026', CONT_KEY = 'cadastros';
  function contaCadastro(id) {
    var l = usuarios(), u = l.filter(function (x) { return x.id === id; })[0];
    if (!u || u.contado || !window.fetch) return;
    fetch(CONTADOR + '/hit/' + CONT_NS + '/' + CONT_KEY).then(function (r) { return r.ok ? r.json() : Promise.reject(); }).then(function () {
      var l2 = usuarios(); l2.forEach(function (x) { if (x.id === id) x.contado = true; }); salvaUsuarios(l2);
    }).catch(function () { });
  }
  function totalSite() {
    if (!window.fetch) return Promise.resolve(null);
    return fetch(CONTADOR + '/get/' + CONT_NS + '/' + CONT_KEY).then(function (r) { return r.status === 404 ? { value: 0 } : r.ok ? r.json() : Promise.reject(); }).then(function (j) { return +j.value || 0; }).catch(function () { return null; });
  }
  function iniciaSessao(id, lembrar) {
    try { sessionStorage.setItem('estudo.sessao', id); sessionStorage.removeItem('estudo.nvok'); sessionStorage.removeItem('estudo.retomado'); } catch (e) { }
    if (lembrar) lsSet('estudo.sessao', id); else lsDel('estudo.sessao');
    UID = id; nivelConfirmado = false; contaCadastro(id); carregar(); guardaRetomar(); applyTheme(); iniciaVisita(); desenhaPill();
  }
  /* cópia de "onde parou" da visita anterior: a visita atual vai sobrescrever S.retomar */
  var retomarAnterior = null;
  function guardaRetomar() { retomarAnterior = S.retomar ? JSON.parse(JSON.stringify(S.retomar)) : null; }
  function encerraSessao() {
    try { sessionStorage.removeItem('estudo.sessao'); sessionStorage.removeItem('estudo.nvok'); } catch (e) { }
    salvaTudo(); T.sess = null; T.sim = null; lsDel('estudo.sessao'); UID = ''; S = defaults(); nivelConfirmado = false; loginModo = ''; applyTheme();
  }
  function b64(bytes) { var t = ''; for (var i = 0; i < bytes.length; i++) t += String.fromCharCode(bytes[i]); return btoa(t); }
  function deB64(t) { var r = atob(t), o = new Uint8Array(r.length); for (var i = 0; i < r.length; i++) o[i] = r.charCodeAt(i); return o; }
  function novoSal() { var a = new Uint8Array(16); if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a); else for (var i = 0; i < 16; i++) a[i] = Math.floor(Math.random() * 256); return b64(a); }
  /* SHA-256 em JavaScript puro: só é usado quando o navegador não oferece WebCrypto (página aberta fora de https) */
  function sha256hex(ascii) {
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    var mp = Math.pow, mw = mp(2, 32), i, j, result = '', words = [], abl = ascii.length * 8;
    var hash = sha256hex.h = sha256hex.h || [], k = sha256hex.k = sha256hex.k || [], pc = k.length, ic = {};
    for (var cand = 2; pc < 64; cand++) { if (!ic[cand]) { for (i = 0; i < 313; i += cand) ic[i] = cand; hash[pc] = (mp(cand, 0.5) * mw) | 0; k[pc++] = (mp(cand, 1 / 3) * mw) | 0; } }
    ascii += '\x80'; while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) { j = ascii.charCodeAt(i); words[i >> 2] |= j << ((3 - i) % 4) * 8; }
    words[words.length] = ((abl / mw) | 0); words[words.length] = abl;
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), oldHash = hash; hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
        var t1 = hash[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10)) | 0));
        var t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(t1 + t2) | 0].concat(hash); hash[4] = (hash[4] + t1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) { var bt = (hash[i] >> (j * 8)) & 255; result += ((bt < 16) ? 0 : '') + bt.toString(16); }
    return result;
  }
  function hashSenha(senha, sal, metodo) {
    metodo = metodo || ((window.crypto && crypto.subtle) ? 'p' : 'f');
    if (metodo === 'p') {
      if (!(window.crypto && crypto.subtle)) return Promise.resolve(null); /* conta criada em https, aberta em contexto sem WebCrypto */
      return crypto.subtle.importKey('raw', new TextEncoder().encode(senha), 'PBKDF2', false, ['deriveBits'])
        .then(function (k) { return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: deB64(sal), iterations: 150000, hash: 'SHA-256' }, k, 256); })
        .then(function (b) { return 'p:' + b64(new Uint8Array(b)); });
    }
    return new Promise(function (ok) { var h = sal + unescape(encodeURIComponent(senha)); for (var i = 0; i < 5000; i++) h = sha256hex(h); ok('f:' + h); });
  }
  function senhaConfere(u, senha) { return hashSenha(senha, u.sal, String(u.h).charAt(0)).then(function (h) { return h != null && h === u.h; }).catch(function () { return false; }); }

  /* ---------- Tempo de estudo: só conta com a página visível, com foco e com atividade ---------- */
  var T = { conta: false, ativo: false, input: Date.now(), tick: Date.now(), n: 0, m: null, t: null, estudo: false, sim: null, sess: null, motivo: '' };
  var ESTUDO_ROTAS = ['aula', 'materia', 'quiz', 'simulado', 'simrev', 'erros', 'revisao', 'resumo', 'praticar', 'trilha'];
  function idleMax() { return (window.ESTUDO_IDLE || 180) * 1000; } /* parado por 3 min = pausa */
  function tempoDe() { S.tempo = S.tempo || { site: 0, estudo: 0, dias: {}, diasEst: {}, mats: {}, topicos: {}, sessoes: [] }; if (!S.tempo.diasEst) S.tempo.diasEst = Object.assign({}, S.tempo.dias); /* versão antiga: dias só tinha estudo */ return S.tempo; }
  function atividade() { S.atividade = S.atividade || { entradas: 0, ultima: 0, ping: 0 }; return S.atividade; }
  function motivoPausa() {
    if (!UID || !S.perfil) return 'sem login';
    if (document.hidden) return 'página fechada ou em segundo plano';
    if (document.hasFocus && !document.hasFocus()) return 'janela sem foco';
    if (Date.now() - T.input >= idleMax()) return 'sem atividade';
    return '';
  }
  function marcaContexto(p, q) {
    var v = p[1] || ''; T.estudo = ESTUDO_ROTAS.indexOf(v) >= 0; T.m = null; T.t = null;
    if (v === 'aula') { T.m = p[2]; T.t = p[3]; } else if (v === 'materia' || (v === 'resumo' && p[2])) T.m = p[2]; else if (v === 'quiz' && q.m) { T.m = q.m; T.t = q.t || null; }
  }
  function iniciaVisita() {
    var a = atividade(); a.entradas++; a.ultima = Date.now(); a.ping = Date.now();
    T.sess = { ini: Date.now(), seg: 0 }; var tp = tempoDe(); tp.sessoes.push(T.sess); if (tp.sessoes.length > 40) tp.sessoes.shift();
    T.input = Date.now(); T.tick = Date.now(); save();
  }
  function tempoTick() {
    var now = Date.now(), d = Math.min((now - T.tick) / 1000, 2.5); T.tick = now;
    var mp = motivoPausa(), at = !mp; T.motivo = mp || (!T.estudo ? 'fora das telas de estudo (o cronômetro conta só em aulas, questões, simulados e revisões)' : '');
    T.conta = at && T.estudo;
    if (at !== T.ativo) { T.ativo = at; if (UID) save(); }
    if (UID && S.perfil) {
      atividade().ping = now;
      if (at) {
        var tp = tempoDe(), dia = today(); tp.site += d; tp.dias[dia] = (tp.dias[dia] || 0) + d; /* todo tempo ativo no site */
        if (T.estudo) { /* aulas, questões, simulados, resumo...: conta como estudo */
          tp.estudo += d; tp.diasEst[dia] = (tp.diasEst[dia] || 0) + d;
          if (T.m) tp.mats[T.m] = (tp.mats[T.m] || 0) + d;
          if (T.m && T.t) { var k = T.m + '/' + T.t; tp.topicos[k] = (tp.topicos[k] || 0) + d; }
          if (T.sess) T.sess.seg += d;
        }
        if (T.sim) T.sim.dec = (T.sim.dec || 0) + d;
      }
      if (++T.n % 10 === 0) { save(); if (T.sim) saveSim(T.sim); }
    }
    desenhaPill();
  }
  function salvaTudo() { tempoTick(); if (UID) { save(); if (T.sim) saveSim(T.sim); } }
  ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove', 'click', 'wheel'].forEach(function (ev) { window.addEventListener(ev, function () { T.input = Date.now(); }, { passive: true, capture: true }); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) salvaTudo(); else { T.input = Date.now(); T.tick = Date.now(); tempoTick(); } });
  window.addEventListener('pagehide', salvaTudo); window.addEventListener('blur', salvaTudo);
  window.addEventListener('focus', function () { T.tick = Date.now(); T.input = Date.now(); tempoTick(); });
  function semanaEst() { var tp = tempoDe(), t = 0; for (var i = 0; i < 7; i++) t += tp.diasEst[addDays(today(), -i)] || 0; return t; }
  function fmtH(sec) { sec = Math.floor(sec); return pad(Math.floor(sec / 3600)) + ':' + pad(Math.floor(sec % 3600 / 60)) + ':' + pad(sec % 60); }
  function fmtDur(sec) { sec = Math.round(sec || 0); if (sec < 60) return sec + ' s'; var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60); return h ? h + ' h ' + pad(m) + ' min' : m + ' min'; }
  function desenhaPill() {
    var el = document.getElementById('tpill');
    if (!el) {
      el = document.createElement('button'); el.id = 'tpill'; el.type = 'button'; el.setAttribute('aria-live', 'off');
      var top = document.querySelector('.topbar'), chip = document.getElementById('nvchip'); if (top) top.insertBefore(el, chip || null); else document.body.appendChild(el);
      el.onclick = function () { toast(T.conta ? 'Cronômetro contando: tempo de estudo de hoje.' : 'Cronômetro pausado: ' + T.motivo + '.'); };
    }
    var ver = !!UID && !!S.perfil; el.hidden = !ver; if (!ver) return;
    var tq = tempoDe(), hojeEst = tq.diasEst[today()] || 0;
    el.className = 'tpill ' + (T.conta ? 'on' : 'off');
    el.innerHTML = '<span class="tp-d"></span><span class="tp-t">' + fmtH(hojeEst) + '</span>';
    el.title = T.conta ? 'Tempo de estudo de hoje. Pausa sozinho se você sair da página ou ficar parado por 3 minutos.' : 'Cronômetro pausado: ' + T.motivo;
    var a1 = document.getElementById('tt-hoje'); if (a1) { a1.textContent = fmtDur(hojeEst); document.getElementById('tt-sem').textContent = fmtDur(semanaEst()); document.getElementById('tt-tot').textContent = fmtDur(tq.estudo); }
    el.setAttribute('aria-label', (T.conta ? 'Tempo de estudo de hoje: ' : 'Cronômetro pausado. Tempo de estudo de hoje: ') + fmtDur(hojeEst));
  }
  setInterval(tempoTick, 1000);

  /* ---------- Tema ---------- */
  function applyTheme() { if (S.tema) document.documentElement.setAttribute('data-theme', S.tema); else document.documentElement.removeAttribute('data-theme'); }
  document.getElementById('btn-theme').onclick = function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark' || (!S.tema && matchMedia('(prefers-color-scheme: dark)').matches);
    S.tema = dark ? 'light' : 'dark'; save(); applyTheme();
  };
  applyTheme();

  /* ---------- Progresso ---------- */
  function topicDone(m, t, v) { var d = S.done[tkey(m, t)]; return !!(d && d['v' + v]); }
  function matProgress(m, v) { var mm = mat(m); var n = 0; topsOf(mm).forEach(function (t) { if (topicDone(m, t.id, v)) n++; }); return n; }
  function acc(filter) {
    var tries = 0, hits = 0;
    Object.keys(S.answers).forEach(function (id) {
      var q = qById(id); if (!q || !filter(q)) return;
      tries += S.answers[id].tries; hits += S.answers[id].hits;
    });
    return { tries: tries, hits: hits, p: pct(hits, tries) };
  }
  function record(q, ok, marcada) {
    var a = S.answers[q.id] || { tries: 0, hits: 0 };
    a.tries++; if (ok) a.hits++; a.last = ok; a.ts = Date.now(); S.answers[q.id] = a;
    S.dia = S.dia || {}; S.dia[today()] = (S.dia[today()] || 0) + 1;
    if (!ok) { S.erros[q.id] = Object.assign(S.erros[q.id] || {}, { ts: Date.now(), res: false }, marcada != null ? { minha: marcada } : {}); }
    else if (S.erros[q.id]) { S.erros[q.id].res = true; }
  }
  function markDone(m, t, v) {
    var k = tkey(m, t); S.done[k] = S.done[k] || {}; S.done[k]['v' + v] = Date.now();
    var base = today();
    var keep = (S.rev[k] || []).filter(function (r) { return r.feito; });
    [1, 7, 21].forEach(function (d) { keep.push({ due: addDays(base, d), dias: d, feito: false, v: v }); });
    S.rev[k] = keep; save();
  }
  function voltaAtual() {
    var t = today();
    if (t < '2026-10-12') return { n: 0, nome: 'Preparação (organizar e pedir isenção)' };
    if (t <= '2026-11-01') return { n: 1, nome: 'Volta 1: básico e contexto' };
    if (t <= '2026-11-22') return { n: 2, nome: 'Volta 2: intermediário' };
    if (t <= '2026-12-06') return { n: 3, nome: 'Volta 3: revisão e questões' };
    return { n: 3, nome: 'Reta final' };
  }
  function revDue() {
    var list = [], t = today();
    Object.keys(S.rev).forEach(function (k) {
      S.rev[k].forEach(function (r, i) { if (!r.feito) list.push({ k: k, i: i, r: r, atrasada: r.due < t, hoje: r.due === t }); });
    });
    return list.sort(function (a, b) { return a.r.due < b.r.due ? -1 : 1; });
  }

  /* ---------- Navegação ---------- */
  var NAV = [
    ['#/', 'Painel', '🏠'], ['#/trilha', 'Trilha', '🗺️'], ['#/praticar', 'Questões', '✏️'],
    ['#/simulados', 'Simulados', '⏱️'], ['#/mais', 'Mais', '☰']
  ];
  var SIDE = NAV.slice(0, 4).concat([['#/erros', 'Erros', '📓'], ['#/revisao', 'Revisão', '🔁'], ['#/cronograma', 'Cronograma', '📅'], ['#/edital', 'Edital', '📄'], ['#/conta', 'Conta', '👤'], ['#/config', 'Ajustes', '⚙️']]);
  function drawNav(h) {
    var cur = h.split('?')[0], chip = document.getElementById('nvchip'), ni = nvInfo();
    if (chip) { chip.hidden = !ni; chip.textContent = ni && S.concurso ? '🎓 ' + concInfo(S.concurso).nome + ' · ' + NV_CURTO[S.nivel] : ''; chip.title = 'Seu nível cadastrado. Toque para trocar.'; }
    function on(href) { if (href === '#/') return cur === '#/' || cur === ''; if (href === '#/mais') return ['#/mais', '#/erros', '#/revisao', '#/cronograma', '#/edital', '#/config', '#/conta', '#/resumo', '#/dono'].indexOf(cur) >= 0 || cur.indexOf('#/dono') === 0; return cur.indexOf(href) === 0 || (href === '#/trilha' && /^#\/(materia|aula)/.test(cur)) || (href === '#/praticar' && cur.indexOf('#/quiz') === 0); }
    var SIDE2 = mostraAreaDono() ? SIDE.concat([['#/dono', 'Dono', '🛡️']]) : SIDE;
    document.getElementById('sidenav').innerHTML = SIDE2.map(function (n) { return '<a href="' + n[0] + '" class="' + (on(n[0]) ? 'on' : '') + '">' + n[1] + '</a>'; }).join('');
    document.getElementById('bottomnav').innerHTML = NAV.map(function (n) { return '<a href="' + n[0] + '" class="' + (on(n[0]) ? 'on' : '') + '"><span class="ic">' + n[2] + '</span>' + n[1] + '</a>'; }).join('');
  }

  var timerId = null;
  function route() {
    if (timerId) { clearInterval(timerId); timerId = null; }
    var h = location.hash || '#/';
    var p = h.split('?')[0].split('/'); // ['#','x',...]
    var q = {}; (h.split('?')[1] || '').split('&').forEach(function (kv) { if (kv) { var a = kv.split('='); q[a[0]] = decodeURIComponent(a[1] || ''); } });
    T.sim = null; marcaContexto(p, q);
    if (!UID) return vLogin();
    if (!S.perfil) { drawNav(h); return vCadastro(); }
    migraPerfil();
    if (!inscs().some(function (i) { return i.c === S.concurso && i.n === S.nivel; })) { setAlvo(inscs()[0].c, inscs()[0].n); save(); }
    drawNav(h);
    var v = p[1] || '';
    var fn = {
      '': vPainel, trilha: vTrilha, materia: function () { vMateria(p[2]); }, aula: function () { vAula(p[2], p[3], q.aba); },
      praticar: vPraticar, simrev: function () { vSimRev(p[2]); }, quiz: function () { vQuiz(q); }, simulados: vSimulados, simulado: vSimRun, erros: vErros,
      revisao: vRevisao, dono: function () { if (p[2]) vDonoUser(p[2]); else vDono(); }, resumo: function () { vResumo(p[2]); }, conta: vConta, nivel: vNivel, cadastro: vCadastro, cronograma: vCron, edital: vEdital, config: vConfig, mais: vMais
    }[v] || vPainel;
    fn();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  function go(h) { if (location.hash === h) route(); else location.hash = h; }

  /* ---------- Telas de login e conta ---------- */
  var loginModo = '', loginTipo = 'celular', loginPre = '', loginMsgOk = false;
  function vLogin(msg) {
    var chip = document.getElementById('nvchip'); if (chip) chip.hidden = true;
    document.getElementById('sidenav').innerHTML = ''; document.getElementById('bottomnav').innerHTML = '';
    var lista = usuarios(); if (!loginModo) loginModo = lista.length ? 'entrar' : 'inicio';
    var criar = loginModo === 'criar', inicio = loginModo === 'inicio';
    var h = '<div class="card" style="border-left:6px solid var(--pri)"><b>Rota do Concurso</b><p class="small" style="margin:.3rem 0">Concursos de Porto Velho/RO 2026. Cada pessoa tem o seu próprio login, e o seu progresso e histórico ficam separados dos de outras pessoas.</p></div>' +
      '<h1>' + (inicio ? 'Bem-vindo(a)' : criar ? 'Criar conta' : 'Entrar') + '</h1>' +
      (inicio ? '' : '<div class="tabs"><button class="tab ' + (criar ? '' : 'on') + '" id="tb-ent">Entrar</button><button class="tab ' + (criar ? 'on' : '') + '" id="tb-cri">Criar conta</button></div>');
    var impBtn = '<button type="button" class="btn sm" id="lg-imp">📥 Importar conta de outro aparelho</button>';
    if (inicio) {
      h += '<div class="card"><p style="margin:0 0 .6rem"><b>Já tem conta?</b> Entre com o seu login e a sua senha. <b>É o primeiro acesso?</b> Crie a sua conta uma única vez.</p>' +
        '<div style="display:grid;gap:.6rem"><button class="btn pri" id="go-ent">🔑 Entrar na minha conta</button><button class="btn" id="go-cri">✨ Criar conta (primeiro acesso)</button></div>' +
        '<p class="small mut" style="margin:.8rem 0 .4rem">Já criou a conta em outro celular ou computador? Leve-a para este aparelho:</p>' + impBtn + '<div id="lg-err" class="small" role="alert" style="min-height:1.2em;margin:.4rem 0"></div></div>';
    } else if (criar) {
      h += '<form id="fl" class="card" novalidate><label for="lg-nome">Seu nome</label><input type="text" id="lg-nome" maxlength="60" autocomplete="name" placeholder="Ex.: Maria Silva">' +
        '<div style="font-weight:600;margin:.6rem 0 .3rem">Como você quer se cadastrar?</div><div class="tabs" role="tablist" id="lg-tipos">' + Object.keys(TIPOS).map(function (k) { return '<button type="button" class="tab ' + (k === loginTipo ? 'on' : '') + '" data-t="' + k + '">' + TIPOS[k].nome + '</button>'; }).join('') + '</div>' +
        '<label for="lg-user">' + TIPOS[loginTipo].rotulo + ' (será o seu login)</label><input type="' + TIPOS[loginTipo].tipo + '" id="lg-user" maxlength="80" inputmode="' + TIPOS[loginTipo].modo + '" autocomplete="' + TIPOS[loginTipo].auto + '" autocapitalize="none" placeholder="' + TIPOS[loginTipo].ph + '">' +
        '<label for="lg-pw">Senha (mínimo 6 caracteres)</label><input type="password" id="lg-pw" autocomplete="new-password">' +
        '<label for="lg-pw2">Repita a senha</label><input type="password" id="lg-pw2" autocomplete="new-password">' +
        '<label class="chk" style="font-weight:400;margin-top:.5rem"><input type="checkbox" id="lg-lembrar" checked><span>Manter conectado neste aparelho</span></label>' +
        '<div id="lg-err" class="small" role="alert" style="color:var(--bad);min-height:1.2em;margin:.4rem 0">' + esc(msg || '') + '</div><button type="submit" class="btn pri">Criar conta e entrar</button> <span class="small">Já tem conta? <a href="#/" id="ln-ent">Entrar</a></span>' +
        '<p class="small mut" style="margin-top:.8rem">🔒 A conta e o histórico ficam salvos <b>só neste aparelho</b> (não há servidor). Para usar a mesma conta em outro celular ou computador, exporte-a em Minha conta e importe na tela de entrada. O celular ou e-mail não é verificado (não enviamos código): serve só como seu login. A senha é guardada de forma criptografada, mas serve para separar os usuários, não para proteger dados sensíveis.' + (lsGet(LS_LEGADO) && !lista.length ? ' Seu progresso de antes será mantido nesta primeira conta.' : '') + '</p></form>';
    } else {
      h += (lista.length ? '' : '<div class="aviso">Ainda não há nenhuma conta <b>neste aparelho</b>. Se é o seu primeiro acesso, use <b>Criar conta</b>. Se você já criou a conta em outro celular ou computador, use <b>Importar conta</b>.</div>') + '<form id="fl" class="card" novalidate>' + (lista.length > 1 ? '<div class="small mut">Contas neste aparelho:</div><div class="row" style="margin:.3rem 0">' + lista.map(function (u) { return '<button type="button" class="btn sm" data-u="' + esc(mostraLogin(u.login)) + '">👤 ' + esc(String(u.nome).split(' ')[0]) + '</button>'; }).join('') + '</div>' : '') +
        '<label for="lg-user">Celular, e-mail ou usuário</label><input type="text" id="lg-user" maxlength="80" autocomplete="username" autocapitalize="none" placeholder="Como você se cadastrou">' +
        '<label for="lg-pw">Senha</label><input type="password" id="lg-pw" autocomplete="current-password">' +
        '<label class="chk" style="font-weight:400;margin-top:.5rem"><input type="checkbox" id="lg-lembrar" checked><span>Manter conectado neste aparelho</span></label>' +
        '<div id="lg-err" class="small" role="alert" style="color:' + (loginMsgOk ? 'var(--ok)' : 'var(--bad)') + ';min-height:1.2em;margin:.4rem 0">' + esc(msg || '') + '</div><button type="submit" class="btn pri">Entrar</button>' +
        '<p class="small mut" style="margin:.8rem 0 .4rem">Primeiro acesso? <a href="#/" id="ln-cri">Criar conta</a> · Esqueceu a senha? Não há recuperação (o site não tem servidor); importe um backup da conta ou crie outra.</p>' + impBtn + '</form>';
    }
    h += '<input type="file" id="lg-file" accept=".json,application/json" hidden>';
    $app.innerHTML = h;
    var te = document.getElementById('tb-ent'), tc = document.getElementById('tb-cri');
    function vaiPara(m) { return function (e) { if (e && e.preventDefault) e.preventDefault(); loginModo = m; loginMsgOk = false; vLogin(); }; }
    [['tb-ent', 'entrar'], ['tb-cri', 'criar'], ['go-ent', 'entrar'], ['go-cri', 'criar'], ['ln-ent', 'entrar'], ['ln-cri', 'criar']].forEach(function (x) { var el = document.getElementById(x[0]); if (el) el.onclick = vaiPara(x[1]); });
    var ib = document.getElementById('lg-imp'), fi = document.getElementById('lg-file');
    if (ib && fi) { ib.onclick = function () { fi.click(); }; fi.onchange = function () { var f = fi.files[0]; if (f) importaConta(f); fi.value = ''; }; }
    if (loginPre && document.getElementById('lg-user') && !criar) { document.getElementById('lg-user').value = loginPre; loginPre = ''; var pwEl = document.getElementById('lg-pw'); if (pwEl) pwEl.focus(); }
    Array.prototype.forEach.call($app.querySelectorAll('#lg-tipos [data-t]'), function (b) { b.onclick = function () { var v = ['lg-nome', 'lg-pw', 'lg-pw2'].map(function (i) { return document.getElementById(i).value; }); loginTipo = b.getAttribute('data-t'); vLogin(); ['lg-nome', 'lg-pw', 'lg-pw2'].forEach(function (i, k) { document.getElementById(i).value = v[k]; }); document.getElementById('lg-user').focus(); }; });
    Array.prototype.forEach.call($app.querySelectorAll('[data-u]'), function (b) { b.onclick = function () { document.getElementById('lg-user').value = b.getAttribute('data-u'); document.getElementById('lg-pw').focus(); }; });
    var erro = function (t) { document.getElementById('lg-err').textContent = t; };
    var lembrar = function () { return document.getElementById('lg-lembrar').checked; };
    if (!document.getElementById('fl')) return;
    document.getElementById('fl').onsubmit = function (e) {
      e.preventDefault();
      var rawId = document.getElementById('lg-user').value, login = criar ? '' : detectaLogin(rawId), pw = document.getElementById('lg-pw').value;
      if (!criar) {
        var u = usuarios().filter(function (x) { return x.login === login; })[0];
        if (!u) return erro(lista.length ? 'Usuário ou senha incorretos.' : 'Não há conta com esse login neste aparelho. Crie uma conta ou importe a sua.');
        return senhaConfere(u, pw).then(function (ok) {
          if (!ok) return erro(String(u.h).charAt(0) === 'p' && !(window.crypto && crypto.subtle) ? 'Este navegador não consegue verificar a senha aqui. Abra o site pelo endereço https.' : 'Usuário ou senha incorretos.');
          iniciaSessao(u.id, lembrar()); go('#/'); route(); confirmarNivel(); if (!document.querySelector('.modal')) oferecerRetomar();
        });
      }
      var nome = document.getElementById('lg-nome').value.replace(/\s+/g, ' ').trim(), pw2 = document.getElementById('lg-pw2').value;
      if (nome.length < 2) return erro('Digite seu nome.');
      var vi = validaIdentificador(loginTipo, rawId); if (vi.erro) return erro(vi.erro); login = vi.login;
      if (pw.length < 6) return erro('A senha precisa ter pelo menos 6 caracteres.');
      if (pw !== pw2) return erro('As senhas não são iguais.');
      var us = usuarios();
      if (us.some(function (x) { return x.login === login; })) return erro('Já existe uma conta com ' + (loginTipo === 'celular' ? 'esse celular' : loginTipo === 'email' ? 'esse e-mail' : 'esse usuário') + ' neste aparelho. Entre na conta ou use outro.');
      var sal = novoSal();
      return hashSenha(pw, sal).then(function (hh) {
        var nu = { id: 'u' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36), nome: nome, login: login, sal: sal, h: hh, criado: Date.now() };
        us.push(nu); salvaUsuarios(us);
        if (us.length === 1 && lsGet(LS_LEGADO)) { /* primeira conta do aparelho: adota o progresso de antes */
          lsSet('estudo.v1.' + nu.id, lsGet(LS_LEGADO)); lsSet('estudo.v1.legado-backup', lsGet(LS_LEGADO)); lsDel(LS_LEGADO);
          var sm = lsGet(LS_LEGADO_SIM); if (sm) { lsSet('estudo.sim.' + nu.id, sm); lsDel(LS_LEGADO_SIM); }
        }
        iniciaSessao(nu.id, lembrar()); go('#/'); route(); confirmarNivel();
      });
    };
  }

  /* Levar a conta para outro aparelho: o arquivo tem o cadastro, a senha (criptografada) e todo o progresso */
  function exportaConta() {
    var u = usuarioAtual(); if (!u) return;
    save();
    var blob = new Blob([JSON.stringify({ tipo: 'rota-conta', versao: 1, exportado: Date.now(), user: { id: u.id, nome: u.nome, login: u.login, sal: u.sal, h: u.h, criado: u.criado }, dados: Object.assign({}, S, { donoOk: false }) })], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'conta-rota-do-concurso-' + today() + '.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function importaConta(file) {
    var fail = function (t) { loginMsgOk = false; var e = document.getElementById('lg-err'); if (e) { e.style.color = 'var(--bad)'; e.textContent = t; } };
    if (file.size > 5 * 1024 * 1024) return fail('Arquivo grande demais para ser uma conta.');
    var r = new FileReader();
    r.onload = function () {
      var o; try { o = JSON.parse(r.result); } catch (x) { return fail('Esse arquivo não é válido.'); }
      var u = o && o.user;
      if (!o || o.tipo !== 'rota-conta' || !u || !u.login || !u.sal || !u.h || !u.nome || !o.dados || typeof o.dados !== 'object') return fail('Esse arquivo não é uma conta exportada pela Rota do Concurso.');
      var us = usuarios();
      if (us.some(function (x) { return x.login === u.login; })) { loginModo = 'entrar'; loginPre = mostraLogin(u.login); loginMsgOk = false; return vLogin('Já existe uma conta com esse login neste aparelho. Entre com a sua senha.'); }
      var id = us.some(function (x) { return x.id === u.id; }) || !u.id ? 'u' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36) : u.id;
      us.push({ id: id, nome: String(u.nome).slice(0, 60), login: String(u.login), sal: String(u.sal), h: String(u.h), criado: u.criado || Date.now() });
      o.dados.donoOk = false; salvaUsuarios(us); lsSet('estudo.v1.' + id, JSON.stringify(o.dados));
      loginModo = 'entrar'; loginPre = mostraLogin(u.login); loginMsgOk = true; vLogin('Conta importada! Entre com a sua senha.');
    };
    r.onerror = function () { fail('Não consegui ler o arquivo.'); };
    r.readAsText(file);
  }

  function vConta() {
    var u = usuarioAtual(); if (!u) return go('#/');
    var h = '<h1>Minha conta</h1><div class="card"><div class="row"><b>' + esc(u.nome) + '</b><span class="sp"></span><span class="small mut">' + TIPOS[tipoDoLogin(u.login)].nome.toLowerCase() + ': ' + esc(mostraLogin(u.login)) + ' · função: ' + PAPEL_NOME[papelDe(u)] + '</span></div><p class="small mut" style="margin:.3rem 0">Conta criada em ' + brDate(iso(new Date(u.criado))) + '. Os dados desta conta (progresso, histórico de simulados, caderno de erros) ficam separados dos das outras contas deste aparelho.</p>' +
      '<div class="row"><button class="btn pri" id="ct-sair">Sair da conta</button></div></div>' +
      '<div class="card"><h3 style="margin-top:0">Usar esta conta em outro aparelho</h3><p class="small mut">Exporte a conta (cadastro, senha e todo o progresso) e, no outro celular ou computador, toque em <b>Importar conta</b> na tela de entrada. O arquivo contém a sua senha criptografada e o seu histórico: guarde com cuidado.</p><button class="btn" id="ct-exp">📤 Exportar minha conta</button></div>' +
      '<div class="card"><h3 style="margin-top:0">Alterar login</h3><p class="small mut">Troque o celular, e-mail ou usuário que você usa para entrar (o progresso continua).</p><label for="ct-lg">Novo login</label><input type="text" id="ct-lg" autocapitalize="none" placeholder="Ex.: seu@email.com"><label for="ct-lgpw">Senha atual</label><input type="password" id="ct-lgpw" autocomplete="current-password"><div id="ct-lgerr" class="small" role="alert" style="color:var(--bad);min-height:1.2em;margin:.4rem 0"></div><button class="btn" id="ct-lgbtn">Salvar novo login</button></div>' +
      '<div class="card"><h3 style="margin-top:0">Alterar senha</h3><label for="ct-at">Senha atual</label><input type="password" id="ct-at" autocomplete="current-password"><label for="ct-nv">Nova senha (mínimo 6)</label><input type="password" id="ct-nv" autocomplete="new-password"><label for="ct-nv2">Repita a nova senha</label><input type="password" id="ct-nv2" autocomplete="new-password"><div id="ct-err" class="small" role="alert" style="min-height:1.2em;margin:.4rem 0"></div><button class="btn" id="ct-pw">Salvar nova senha</button></div>' +
      '<div class="card"><h3 style="margin-top:0">Excluir conta</h3><p class="small mut">Apaga esta conta e todo o progresso e histórico dela deste aparelho. Não dá para desfazer.</p><button class="btn" id="ct-del" style="color:var(--bad)">Excluir minha conta</button></div>';
    $app.innerHTML = h;
    document.getElementById('ct-lgbtn').onclick = function () {
      var raw = document.getElementById('ct-lg').value, er = document.getElementById('ct-lgerr'), tipo = raw.indexOf('@') > 0 ? 'email' : pareceCelular(raw) ? 'celular' : 'usuario', vi = validaIdentificador(tipo, raw);
      if (vi.erro) { er.textContent = vi.erro; return; }
      if (usuarios().some(function (x) { return x.login === vi.login && x.id !== u.id; })) { er.textContent = 'Já existe outra conta com esse login neste aparelho.'; return; }
      senhaConfere(u, document.getElementById('ct-lgpw').value).then(function (ok) {
        if (!ok) { er.textContent = 'A senha atual está incorreta.'; return; }
        var l = usuarios(); l.forEach(function (x) { if (x.id === u.id) x.login = vi.login; }); salvaUsuarios(l); toast('Login alterado'); vConta();
      });
    };
    document.getElementById('ct-exp').onclick = function () { exportaConta(); toast('Arquivo da conta salvo'); };
    document.getElementById('ct-sair').onclick = function () { encerraSessao(); go('#/'); route(); };
    document.getElementById('ct-pw').onclick = function () {
      var at = document.getElementById('ct-at').value, nv = document.getElementById('ct-nv').value, nv2 = document.getElementById('ct-nv2').value, er = document.getElementById('ct-err');
      er.style.color = 'var(--bad)';
      if (nv.length < 6) { er.textContent = 'A nova senha precisa ter pelo menos 6 caracteres.'; return; }
      if (nv !== nv2) { er.textContent = 'As senhas novas não são iguais.'; return; }
      senhaConfere(u, at).then(function (ok) {
        if (!ok) { er.textContent = 'A senha atual está incorreta.'; return; }
        var sal = novoSal();
        hashSenha(nv, sal).then(function (hh) { var us = usuarios(); us.forEach(function (x) { if (x.id === u.id) { x.sal = sal; x.h = hh; } }); salvaUsuarios(us); toast('Senha alterada'); vConta(); });
      });
    };
    document.getElementById('ct-del').onclick = function () {
      ask('Excluir a conta "' + u.nome + '" e todo o progresso dela neste aparelho? Isso não pode ser desfeito.', function () {
        salvaUsuarios(usuarios().filter(function (x) { return x.id !== u.id; })); lsDel(chave()); lsDel(chaveSim());
        encerraSessao(); loginModo = 'entrar'; go('#/'); route();
      });
    };
  }

  /* ---------- Área do dono: contas deste aparelho (progresso, tempo e atividade) ---------- */
  function dadosDe(id) { if (id === UID) return S; try { return Object.assign(defaults(), JSON.parse(lsGet('estudo.v1.' + id) || '{}')); } catch (e) { return defaults(); } }
  function fmtDT(ts) { if (!ts) return '--'; var d = new Date(ts); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function resumoUsuario(u) {
    var d = dadosDe(u.id), a = d.atividade || { entradas: 0, ultima: 0, ping: 0 }, tp = d.tempo || { site: 0, estudo: 0, dias: {}, mats: {}, topicos: {}, sessoes: [] };
    var online = u.id === UID ? T.ativo : (Date.now() - (a.ping || 0) < 45000);
    var de = tp.diasEst || tp.dias || {}, hoje = de[today()] || 0, noSiteHoje = (tp.dias || {})[today()] || 0, sem = 0; for (var i = 0; i < 7; i++) sem += de[addDays(today(), -i)] || 0;
    var tries = 0, hits = 0; Object.keys(d.answers || {}).forEach(function (id) { tries += d.answers[id].tries; hits += d.answers[id].hits; });
    var feitos = Object.keys(d.done || {}).filter(function (k) { return d.done[k] && d.done[k].v1; }).length;
    var sims = d.sims || [], media = sims.length ? Math.round(sims.reduce(function (x, y) { return x + pct(y.acertos, y.total); }, 0) / sims.length) : null;
    var abertos = Object.keys(d.erros || {}).filter(function (id) { return !d.erros[id].res; }).length;
    var onde = ''; if (d.retomar) { var r = d.retomar, mm = r.m && mat(r.m), tt = r.m && r.t && topico(r.m, r.t); onde = r.tipo === 'aula' && mm && tt ? mm.nome + ' · ' + tt.titulo : r.tipo === 'quiz' ? 'fazendo questões' : r.tipo === 'simulado' ? 'em um simulado' : mm ? mm.nome : ''; }
    return { u: u, d: d, a: a, tp: tp, online: online, hoje: hoje, noSiteHoje: noSiteHoje, sem: sem, tries: tries, hits: hits, acc: pct(hits, tries), feitos: feitos, sims: sims, media: media, abertos: abertos, onde: onde, insc: ((d.perfil && d.perfil.insc) || []).map(rotulo) };
  }
  function pillOn(r) { return r.online ? '<span class="pill ok">🟢 online agora</span>' : '<span class="pill">⚪ ' + (r.a.ping ? 'visto ' + ha(r.a.ping) : 'nunca entrou') + '</span>'; }
  function vDonoGate() {
    if (papelAtual() !== 'dono') {
      $app.innerHTML = '<h1>Área do dono</h1><div class="card"><p style="margin:0">Esta área é restrita ao dono do site.</p><p style="margin:.6rem 0 0"><a class="btn" href="#/">Voltar</a></p></div>'; return;
    }
    var h = '<h1>Área do dono</h1><div class="card"><p style="margin:0 0 .5rem">Conta de dono reconhecida. Como o e-mail do login não é verificado, digite também o código do dono para abrir.</p><form id="dg" novalidate><label for="dg-cod">Código do dono</label><input type="password" id="dg-cod" autocomplete="off" autocapitalize="characters" placeholder="XXXX-XXXX-XXXX-XXXX"><div id="dg-err" class="small" role="alert" style="color:var(--bad);min-height:1.2em;margin:.4rem 0"></div><div class="row"><button type="submit" class="btn pri">Abrir</button><a class="btn" href="#/">Voltar</a></div></form></div>';
    $app.innerHTML = h;
    document.getElementById('dg').onsubmit = function (e) {
      e.preventDefault();
      var er = document.getElementById('dg-err');
      if (!codigoDonoOk(document.getElementById('dg-cod').value)) { er.textContent = 'Código incorreto.'; return; }
      S.donoOk = true; save(); toast('Área do dono liberada'); route();
    };
  }
  /* Pessoas e funções: o dono adiciona contas e define quem é aluno ou colaborador (neste aparelho) */
  function blocoPessoas() {
    var us = usuarios();
    var h = '<h2>Pessoas e funções</h2><div class="card"><p class="small mut" style="margin:0 0 .5rem"><b>Aluno</b> estuda normalmente. <b>Colaborador</b> também abre esta área (sem o código). <b>Dono</b> são só os e-mails autorizados. As contas e funções valem <b>neste aparelho</b>.</p>' +
      us.map(function (u) {
        var p = papelDe(u);
        return '<div class="row" style="padding:.4rem 0;border-bottom:1px solid var(--line)"><div style="flex:1;min-width:0"><b>' + esc(u.nome) + '</b><div class="small mut">' + esc(mostraLogin(u.login)) + '</div></div>' +
          (p === 'dono' ? '<span class="pill warn">Dono</span>' : '<select data-papel="' + u.id + '" style="width:auto"><option value="aluno"' + (p === 'aluno' ? ' selected' : '') + '>Aluno</option><option value="colaborador"' + (p === 'colaborador' ? ' selected' : '') + '>Colaborador</option></select><button class="btn sm" data-rm="' + u.id + '" aria-label="Remover conta">🗑</button>') + '</div>';
      }).join('') +
      '<details style="margin-top:.7rem"><summary style="cursor:pointer;font-weight:700;color:var(--pri)">+ Adicionar pessoa</summary><form id="ad" novalidate><label for="ad-nome">Nome</label><input type="text" id="ad-nome" maxlength="60"><label for="ad-user">Celular, e-mail ou usuário (será o login)</label><input type="text" id="ad-user" maxlength="80" autocapitalize="none"><label for="ad-pw">Senha inicial (mínimo 6)</label><input type="text" id="ad-pw" autocomplete="off"><label for="ad-papel">Função</label><select id="ad-papel"><option value="aluno">Aluno</option><option value="colaborador">Colaborador</option></select><div id="ad-err" class="small" role="alert" style="color:var(--bad);min-height:1.2em;margin:.4rem 0"></div><button type="submit" class="btn pri">Criar conta</button></form></details></div>';
    return h;
  }
  function ligaPessoas() {
    Array.prototype.forEach.call($app.querySelectorAll('[data-papel]'), function (sel) { sel.onchange = function () { var l = usuarios(); l.forEach(function (u) { if (u.id === sel.getAttribute('data-papel')) u.papel = sel.value; }); salvaUsuarios(l); toast('Função atualizada'); }; });
    Array.prototype.forEach.call($app.querySelectorAll('[data-rm]'), function (b) { b.onclick = function () { var id = b.getAttribute('data-rm'), u = usuarios().filter(function (x) { return x.id === id; })[0]; if (!u) return; ask('Remover a conta de ' + u.nome + ' e todo o progresso dela neste aparelho? Não dá para desfazer.', function () { salvaUsuarios(usuarios().filter(function (x) { return x.id !== id; })); lsDel('estudo.v1.' + id); lsDel('estudo.sim.' + id); toast('Conta removida'); vDono(); }); }; });
    var f = document.getElementById('ad'); if (!f) return;
    f.onsubmit = function (e) {
      e.preventDefault();
      var er = document.getElementById('ad-err'), nome = document.getElementById('ad-nome').value.replace(/\s+/g, ' ').trim(), raw = document.getElementById('ad-user').value, pw = document.getElementById('ad-pw').value, papel = document.getElementById('ad-papel').value;
      var tipo = raw.indexOf('@') > 0 ? 'email' : pareceCelular(raw) ? 'celular' : 'usuario', vi = validaIdentificador(tipo, raw);
      if (nome.length < 2) { er.textContent = 'Digite o nome.'; return; }
      if (vi.erro) { er.textContent = vi.erro; return; }
      if (pw.length < 6) { er.textContent = 'A senha inicial precisa ter pelo menos 6 caracteres.'; return; }
      var us = usuarios(); if (us.some(function (x) { return x.login === vi.login; })) { er.textContent = 'Já existe uma conta com esse login neste aparelho.'; return; }
      var sal = novoSal();
      hashSenha(pw, sal).then(function (hh) {
        var l = usuarios(); l.push({ id: 'u' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36), nome: nome, login: vi.login, sal: sal, h: hh, criado: Date.now(), papel: papel === 'colaborador' ? 'colaborador' : 'aluno' });
        salvaUsuarios(l); toast('Conta criada. Passe o login e a senha para a pessoa.'); vDono();
      });
    };
  }
  function vDono() {
    if (!ehDono()) return vDonoGate();
    var us = usuarios().map(resumoUsuario);
    var h = '<h1>Área do dono</h1><div class="card" style="border-left:4px solid var(--brand,#1d4ed8)"><div class="small mut">Pessoas cadastradas no site (todos os aparelhos)</div><div class="stat" id="totsite">…</div><div class="small mut">Contagem aproximada, feita por um contador externo gratuito: soma 1 a cada conta nova, e contas antigas somam na próxima vez que entrarem. Não mostra quem são.</div></div><div class="aviso">Os dados abaixo (online, estudo, progresso) vêm só das contas <b>deste aparelho</b>; o site não tem servidor para ver os outros.</div>';
    h += '<div class="grid c3" style="margin-top:.7rem"><div class="card"><div class="small mut">Contas neste aparelho</div><div class="stat">' + us.length + '</div></div><div class="card"><div class="small mut">Online agora</div><div class="stat">' + us.filter(function (r) { return r.online; }).length + '</div></div><div class="card"><div class="small mut">Estudaram hoje</div><div class="stat">' + us.filter(function (r) { return r.hoje > 0; }).length + '</div></div></div>';
    h += '<h2>Usuários</h2>';
    us.sort(function (x, y) { return (y.a.ping || 0) - (x.a.ping || 0); }).forEach(function (r) {
      var u = r.u;
      h += '<a class="card" style="display:block;color:inherit;text-decoration:none" href="#/dono/' + u.id + '"><div class="row"><b>' + esc(u.nome) + '</b>' + (u.id === UID ? '<span class="pill">você</span>' : '') + '<span class="sp"></span>' + pillOn(r) + '</div>' +
        '<div class="small mut">' + esc(TIPOS[tipoDoLogin(u.login)].nome.toLowerCase() + ': ' + mostraLogin(u.login)) + (r.insc.length ? ' · ' + esc(r.insc.join(', ')) : '') + '</div>' +
        '<div class="grid c3" style="margin-top:.5rem;gap:.4rem"><div><div class="small mut">Última entrada</div><b>' + fmtDT(r.a.ultima) + '</b></div><div><div class="small mut">Estudou hoje</div><b>' + fmtDur(r.hoje) + '</b></div><div><div class="small mut">Total estudando</div><b>' + fmtDur(r.tp.estudo) + '</b></div></div>' +
        '<div class="small mut" style="margin-top:.4rem">' + r.a.entradas + ' entrada(s) · ' + r.feitos + ' tópico(s) concluído(s) · ' + (r.tries ? 'acerto ' + r.acc + '%' : 'sem questões') + (r.onde ? ' · estudando: ' + esc(r.onde) : '') + '</div></a>';
    });
    if (ehDonoPleno()) h += blocoPessoas();
    h += '<p class="noprint" style="margin-top:1rem">' + (papelAtual() === 'dono' ? '<button class="btn sm" id="dn-lock">🔒 Bloquear a área do dono neste aparelho</button>' : '') + '</p>';
    $app.innerHTML = h;
    totalSite().then(function (n) { var el = document.getElementById('totsite'); if (el) el.textContent = n === null ? 'indisponível agora' : n; });
    var lk = document.getElementById('dn-lock'); if (lk) lk.onclick = function () { S.donoOk = false; save(); toast('Área do dono bloqueada'); go('#/'); };
    if (ehDonoPleno()) ligaPessoas();
    timerId = setInterval(function () { if ((location.hash || '') === '#/dono') vDono(); }, 5000);
  }
  function vDonoUser(id) {
    if (!ehDono()) return vDonoGate();
    var u = usuarios().filter(function (x) { return x.id === id; })[0]; if (!u) return go('#/dono');
    var r = resumoUsuario(u), tp = r.tp, h = '<p><a href="#/dono">← Área do dono</a></p><h1>' + esc(u.nome) + '</h1><div class="row">' + pillOn(r) + '<span class="small mut">' + esc(TIPOS[tipoDoLogin(u.login)].nome.toLowerCase() + ': ' + mostraLogin(u.login)) + ' · conta criada em ' + brDate(iso(new Date(u.criado))) + '</span></div>';
    h += '<div class="grid c3" style="margin-top:.6rem"><div class="card"><div class="small mut">Última entrada</div><div class="stat" style="font-size:1.2rem">' + fmtDT(r.a.ultima) + '</div><div class="small mut">' + r.a.entradas + ' entrada(s)</div></div><div class="card"><div class="small mut">Estudando (hoje / 7 dias)</div><div class="stat" style="font-size:1.2rem">' + fmtDur(r.hoje) + ' / ' + fmtDur(r.sem) + '</div><div class="small mut">total ' + fmtDur(tp.estudo) + '</div></div><div class="card"><div class="small mut">Tempo no site (total)</div><div class="stat" style="font-size:1.2rem">' + fmtDur(tp.site) + '</div><div class="small mut">hoje no site: ' + fmtDur(r.noSiteHoje) + ' · inclui telas fora do estudo</div></div></div>';
    if (r.onde) h += '<div class="card"><b>Onde parou:</b> ' + esc(r.onde) + (r.d.retomar ? ' · ' + ha(r.d.retomar.ts) : '') + '</div>';
    var dias = [], max = 1; for (var i = 13; i >= 0; i--) { var dd = addDays(today(), -i), sec = (tp.diasEst || tp.dias || {})[dd] || 0; dias.push({ dd: dd, sec: sec }); if (sec > max) max = sec; }
    h += '<h2>Tempo de estudo por dia (14 dias)</h2><div class="card"><div class="dbars">' + dias.map(function (x) { return '<div class="db" title="' + brDate(x.dd) + ': ' + fmtDur(x.sec) + '"><i style="height:' + Math.max(3, Math.round(100 * x.sec / max)) + '%"></i><span>' + x.dd.slice(8) + '</span></div>'; }).join('') + '</div><div class="small mut">Maior dia: ' + fmtDur(max === 1 ? 0 : max) + '</div></div>';
    h += '<h2>Por matéria</h2><div class="card">' + C.materias.map(function (m) {
      var seg = (tp.mats || {})[m.id] || 0, a = { t: 0, h: 0 }; Object.keys(r.d.answers || {}).forEach(function (qid) { var q = qById(qid); if (q && q.m === m.id) { a.t += r.d.answers[qid].tries; a.h += r.d.answers[qid].hits; } });
      var vistos = Object.keys(r.d.done || {}).filter(function (k) { return k.indexOf(m.id + '/') === 0 && r.d.done[k].v1; }).length;
      return '<div style="margin:.55rem 0"><div class="row"><b>' + esc(m.nome) + '</b><span class="sp"></span><span class="small mut">' + fmtDur(seg) + ' · ' + vistos + ' tópico(s) concluído(s) · ' + (a.t ? 'acerto ' + pct(a.h, a.t) + '%' : 'sem questões') + '</span></div>' + bar(a.t ? pct(a.h, a.t) : 0, m.cor) + '</div>';
    }).join('') + '</div>';
    var tops = Object.keys(tp.topicos || {}).sort(function (a, b) { return tp.topicos[b] - tp.topicos[a]; }).slice(0, 8);
    if (tops.length) h += '<h2>Tópicos em que mais estudou</h2><div class="card">' + tops.map(function (k) { var pp = k.split('/'), t = topico(pp[0], pp[1]); return t ? '<div class="row" style="padding:.2rem 0"><span style="flex:1">' + esc(t.titulo) + '</span><b>' + fmtDur(tp.topicos[k]) + '</b></div>' : ''; }).join('') + '</div>';
    h += '<h2>Simulados e questões</h2><div class="card"><div class="small">' + r.sims.length + ' simulado(s)' + (r.media != null ? ' · média ' + r.media + '%' : '') + ' · ' + r.tries + ' resposta(s) · acerto geral ' + (r.tries ? r.acc + '%' : '--') + ' · ' + r.abertos + ' erro(s) aberto(s)</div>' +
      (r.sims.length ? '<table style="margin-top:.4rem"><tr><th>Data</th><th>Acertos</th><th>Tempo</th></tr>' + r.sims.slice(-5).reverse().map(function (x) { return '<tr><td>' + brDate(x.dia) + '</td><td>' + x.acertos + '/' + x.total + ' (' + pct(x.acertos, x.total) + '%)</td><td>' + Math.round(x.gasto / 60) + ' min</td></tr>'; }).join('') + '</table>' : '') + '</div>';
    var ss = (tp.sessoes || []).slice(-8).reverse();
    if (ss.length) h += '<h2>Últimas visitas</h2><div class="card"><table><tr><th>Entrou</th><th>Estudou</th></tr>' + ss.map(function (x) { return '<tr><td>' + fmtDT(x.ini) + '</td><td>' + fmtDur(x.seg) + '</td></tr>'; }).join('') + '</table></div>';
    if (r.insc.length) h += '<div class="card"><b>Inscrições:</b> ' + esc(r.insc.join(' · ')) + '</div>';
    $app.innerHTML = h;
    timerId = setInterval(function () { if ((location.hash || '') === '#/dono/' + id) vDonoUser(id); }, 5000);
  }

  /* ---------- Cadastro: concurso(s) + nível pago em cada um ---------- */
  var NV_CURTO = { fundamental: 'Fundamental', medio: 'Médio', superior: 'Superior' };
  function concInfo(id) { return C.concursos.filter(function (x) { return x.id === id; })[0] || C.concursos[0]; }
  function inscs() { return (S.perfil && S.perfil.insc) || []; }
  function niveisReg() { var o = []; inscs().forEach(function (i) { if (o.indexOf(i.n) < 0) o.push(i.n); }); return o; }
  function nomeNivel(id) { var n = C.niveis.filter(function (x) { return x.id === id; })[0]; return n ? n.nome : id; }
  function rotulo(i) { return concInfo(i.c).nome + ' · ' + nomeNivel(i.n); }
  function setAlvo(c, n) { S.concurso = c; S.nivel = n; }
  function estrConf() { return S.concurso === 'semed' && S.nivel === 'medio'; } /* só esta combinação tem edital lido */
  function primeiroNome() { return S.perfil ? String(S.perfil.nome).split(' ')[0] : ''; }
  function marcaSessao() { nivelConfirmado = true; try { sessionStorage.setItem('estudo.nvok', '1'); } catch (e) { } }
  function migraPerfil() {
    if (S.perfil && !S.perfil.insc) {
      S.perfil.insc = (S.perfil.niveis || []).map(function (n) { return { c: (C.concursos.filter(function (x) { return x.niveis.indexOf(n) >= 0; })[0] || C.concursos[0]).id, n: n }; });
      save();
    }
  }
  function provaTxt(cc) { return cc.prova ? brDate(cc.prova.slice(0, 10)) + ' às ' + cc.prova.slice(11, 16).replace(':', 'h') : 'sem data oficial'; }

  var nivelConfirmado = false;
  try { nivelConfirmado = sessionStorage.getItem('estudo.nvok') === '1'; } catch (e) { }
  function confirmarNivel() {
    var n = nvInfo(), reg = inscs(), hh = (location.hash || '');
    if (!S.perfil || !n || nivelConfirmado || hh.indexOf('#/nivel') === 0 || hh.indexOf('#/cadastro') === 0) return;
    var o = document.createElement('div'); o.className = 'modal';
    var cc = concInfo(S.concurso), corpo;
    if (reg.length > 1) {
      corpo = '<div class="small mut">Olá, ' + esc(primeiroNome()) + '! Você tem ' + reg.length + ' inscrições. <b>Qual vai estudar agora?</b></div>' +
        '<div style="display:grid;gap:.5rem;margin:.7rem 0">' + reg.map(function (i, k) { return '<button class="btn ' + (i.c === S.concurso && i.n === S.nivel ? 'pri' : '') + '" data-pick="' + k + '">🎓 ' + esc(rotulo(i)) + '</button>'; }).join('') + '</div>' +
        '<p class="small mut">Você pode alternar a qualquer momento, tocando no concurso no topo da tela.</p><div class="row"><button class="btn sm" id="nv-troca">Editar cadastro</button></div>';
    } else {
      corpo = '<div class="small mut">Olá, ' + esc(primeiroNome()) + '! Você está inscrito(a) em:</div><h2 style="margin:.2rem 0">🎓 ' + esc(cc.nome) + ' · ' + esc(n.nome) + '</h2><p class="small">' + esc(cc.completo) + ' · banca ' + esc(cc.banca) + '<br>Prova: ' + esc(provaTxt(cc)) + '</p><p class="small mut">' + (estrConf() ? 'Estrutura da prova confirmada no edital.' : 'Estrutura da prova estimada (confira no edital do seu cargo).') + '</p><p><b>É esse o concurso e o nível que você pagou?</b></p><div class="row"><button class="btn pri" id="nv-ok">Sim, é esse</button><button class="btn" id="nv-troca">Editar cadastro</button></div>';
    }
    o.innerHTML = '<div class="box" role="dialog" aria-modal="true">' + corpo + '</div>';
    document.body.appendChild(o);
    function fecha(sem) { marcaSessao(); o.remove(); if (!sem) oferecerRetomar(); }
    var ok = o.querySelector('#nv-ok'); if (ok) { ok.onclick = function () { fecha(); }; ok.focus(); }
    o.querySelector('#nv-troca').onclick = function () { fecha(true); go('#/cadastro'); };
    Array.prototype.forEach.call(o.querySelectorAll('[data-pick]'), function (b) { b.onclick = function () { var i = reg[+b.getAttribute('data-pick')]; setAlvo(i.c, i.n); save(); fecha(true); route(); oferecerRetomar(); }; });
  }

  function vCadastro() {
    var edit = !!S.perfil;
    if (!edit) { document.getElementById('sidenav').innerHTML = ''; document.getElementById('bottomnav').innerHTML = ''; }
    var marc = edit ? inscs() : (S.nivel ? [{ c: S.concurso || (C.concursos.filter(function (x) { return x.niveis.indexOf(S.nivel) >= 0; })[0] || C.concursos[0]).id, n: S.nivel }] : []);
    function tem(c, n) { return marc.some(function (i) { return i.c === c && i.n === n; }); }
    function temC(c) { return marc.some(function (i) { return i.c === c; }); }
    var nome = edit ? S.perfil.nome : ((usuarioAtual() || {}).nome || '');
    var h = (edit ? '' : '<div class="card" style="border-left:6px solid var(--pri)"><b>Bem-vindo(a) à Rota do Concurso</b><p class="small" style="margin:.3rem 0">Concursos de Porto Velho/RO 2026. Primeiro o cadastro; depois o sistema monta o seu estudo para passar:</p><ul class="small" style="margin:.2rem 0;padding-left:1.1rem"><li>meta de nota e nota projetada</li><li>missão diária e foco nos seus pontos fracos</li><li>simulados, caderno de erros e revisão espaçada</li></ul></div>') +
      '<h1>' + (edit ? 'Meu cadastro' : 'Cadastre-se para entrar') + '</h1>' +
      '<p class="mut">' + (edit ? 'Atualize seu nome ou suas inscrições.' : 'Informe seu nome, o(s) concurso(s) em que você se inscreveu e o nível que pagou em cada um. Tudo no site é montado para você passar nessa prova: meta de nota, missão diária e foco nos seus pontos fracos.') + '</p>' +
      '<form id="cad" class="card" novalidate><label for="cd-nome">Seu nome</label><input type="text" id="cd-nome" maxlength="60" autocomplete="name" placeholder="Ex.: Maria Silva" value="' + esc(nome) + '">' +
      '<fieldset style="border:0;padding:0;margin:.8rem 0 0"><legend style="font-weight:600;margin-bottom:.3rem">Em qual concurso você se inscreveu?</legend><p class="small mut" style="margin:0 0 .4rem">Marque o concurso e, dentro dele, o nível da prova que você pagou (pode marcar mais de um nível e mais de um concurso).</p>' +
      C.concursos.map(function (cc) {
        return '<div class="conc" data-cc="' + cc.id + '" style="border:1px solid var(--line);border-radius:12px;padding:.6rem .7rem;margin:.5rem 0"><label class="chk" style="font-weight:400;margin:0"><input type="checkbox" name="cc" value="' + cc.id + '"' + (temC(cc.id) ? ' checked' : '') + '><span><b>' + esc(cc.nome) + '</b> · banca ' + esc(cc.banca) + '<br><span class="small mut">' + esc(cc.completo) + '</span><br><span class="small mut">Prova: ' + esc(provaTxt(cc)) + '. ' + esc(cc.status) + '</span></span></label>' +
          '<div class="nvs" style="margin:.4rem 0 0 2rem"' + (temC(cc.id) ? '' : ' hidden') + '><div class="small" style="font-weight:600">Nível que você pagou:</div>' +
          cc.niveis.map(function (n) { return '<label class="chk" style="font-weight:400;margin:0;padding:.25rem 0"><input type="checkbox" name="n-' + cc.id + '" value="' + n + '"' + (tem(cc.id, n) ? ' checked' : '') + '><span>' + esc(nomeNivel(n)) + '</span></label>'; }).join('') + '</div></div>';
      }).join('') + '</fieldset><div id="cd-err" class="small" role="alert" style="color:var(--bad);min-height:1.2em;margin:.4rem 0"></div>' +
      '<div class="row"><button type="submit" class="btn pri">' + (edit ? 'Salvar cadastro' : 'Entrar no site') + '</button>' + (edit ? '<a class="btn" href="#/">Cancelar</a>' : '') + '</div>' +
      '<p class="small mut" style="margin-top:.8rem">🔒 O cadastro fica salvo só neste aparelho; nada é enviado a servidor. O site não confere a inscrição nem o pagamento: vale o que você informar.</p></form>';
    $app.innerHTML = h;
    Array.prototype.forEach.call($app.querySelectorAll('input[name=cc]'), function (c) {
      c.onchange = function () { c.closest('.conc').querySelector('.nvs').hidden = !c.checked; };
    });
    document.getElementById('cad').onsubmit = function (e) {
      e.preventDefault();
      var nm = document.getElementById('cd-nome').value.replace(/\s+/g, ' ').trim(), err = document.getElementById('cd-err'), ins = [], falta = null;
      if (nm.length < 2) { err.textContent = 'Digite seu nome.'; document.getElementById('cd-nome').focus(); return; }
      Array.prototype.forEach.call($app.querySelectorAll('input[name=cc]:checked'), function (c) {
        var ns = Array.prototype.map.call($app.querySelectorAll('input[name="n-' + c.value + '"]:checked'), function (x) { return x.value; });
        if (!ns.length) falta = falta || concInfo(c.value).nome;
        ns.forEach(function (n) { ins.push({ c: c.value, n: n }); });
      });
      if (falta) { err.textContent = 'Marque o nível que você pagou no concurso ' + falta + '.'; return; }
      if (!ins.length) { err.textContent = 'Marque pelo menos um concurso e o nível.'; return; }
      var novo = !S.perfil, niveis = [];
      ins.forEach(function (i) { if (niveis.indexOf(i.n) < 0) niveis.push(i.n); });
      S.perfil = { nome: nm, insc: ins, niveis: niveis, criado: (S.perfil && S.perfil.criado) || Date.now() };
      if (!ins.some(function (i) { return i.c === S.concurso && i.n === S.nivel; })) setAlvo(ins[0].c, ins[0].n);
      save();
      if (ins.length > 1 && novo) nivelConfirmado = false; else marcaSessao();
      go('#/');
      if (!nivelConfirmado) confirmarNivel(); else toast('Cadastro salvo');
    };
  }

  /* Trocar a inscrição ativa */
  function vNivel() {
    var reg = inscs();
    var h = '<h1>Trocar de concurso</h1><p class="small">Estudando agora: <b>' + esc(rotulo({ c: S.concurso, n: S.nivel })) + '</b>. <a href="#/">Manter e voltar</a></p><p class="mut">' + (reg.length > 1 ? 'Você tem ' + reg.length + ' inscrições. Escolha qual estudar agora; o progresso nos tópicos em comum é mantido.' : 'Você tem uma inscrição. Para estudar outra, adicione-a ao seu cadastro.') + '</p>';
    reg.forEach(function (i, k) {
      var cc = concInfo(i.c), atual = i.c === S.concurso && i.n === S.nivel;
      h += '<button class="card" style="display:block;width:100%;text-align:left;cursor:pointer;color:var(--ink);font:inherit;' + (atual ? 'border:2px solid var(--pri)' : '') + '" data-i="' + k + '"><b>' + esc(cc.nome) + ' · ' + esc(nomeNivel(i.n)) + (atual ? ' · atual' : '') + '</b><div class="small mut">' + esc(cc.completo) + ' · banca ' + esc(cc.banca) + '<br>Prova: ' + esc(provaTxt(cc)) + '</div><div class="small" style="margin-top:.3rem"><span class="pill">' + C.materias.reduce(function (a, m) { return a + m.topicos.filter(function (t) { return t.nv.indexOf(i.n) >= 0; }).length; }, 0) + ' tópicos</span> ' + (i.c === 'semed' && i.n === 'medio' ? '<span class="pill ok">estrutura confirmada</span>' : '<span class="pill warn">estrutura estimada</span>') + '</div></button>';
    });
    h += '<p><a class="btn" href="#/cadastro">✎ Editar cadastro / adicionar inscrição</a></p>';
    $app.innerHTML = h;
    Array.prototype.forEach.call($app.querySelectorAll('[data-i]'), function (b) { b.onclick = function () { var i = reg[+b.getAttribute('data-i')]; setAlvo(i.c, i.n); marcaSessao(); save(); go('#/'); }; });
  }

  /* ---------- Memória de estudo: onde parou, o que já viu e o resumo pessoal ---------- */
  var ABAS = ['Contexto', 'Básico', 'Aprofundado'];
  function txt(html) { return String(html || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
  function pontos(html, n) { var out = [], re = /<li>([\s\S]*?)<\/li>/g, m; while ((m = re.exec(html || '')) && out.length < n) out.push(txt(m[1]).slice(0, 150)); return out; }
  function foiVisto(mid, tid) { var k = tkey(mid, tid); return !!(S.visto && S.visto[k]) || topicDone(mid, tid, 1) || topicDone(mid, tid, 2) || topicDone(mid, tid, 3); }
  function estudados(mid) { return topsOf(mat(mid)).filter(function (t) { return foiVisto(mid, t.id); }); }
  function marcaVisto(mid, tid, aba) {
    var k = tkey(mid, tid); S.visto = S.visto || {};
    var v = S.visto[k] || { abas: [false, false, false], ts: 0 }; v.abas[aba] = true; v.ts = Date.now(); S.visto[k] = v;
    S.retomar = { tipo: 'aula', m: mid, t: tid, aba: aba, hash: '#/aula/' + mid + '/' + tid + '?aba=' + aba, ts: Date.now() }; save();
  }
  function ha(ts) { var s = Math.max(0, Math.round((Date.now() - ts) / 1000)); if (s < 90) return 'agora há pouco'; if (s < 3600) return 'há ' + Math.round(s / 60) + ' min'; if (s < 86400) return 'há ' + Math.floor(s / 3600) + ' h'; return 'há ' + Math.floor(s / 86400) + ' dia(s)'; }
  function descreveRetomar(r) {
    var m = r.m && mat(r.m), t = r.m && r.t && topico(r.m, r.t), qa = S.quizAtual, sm = loadSim();
    if (r.tipo === 'aula' && m && t) return { mat: r.m, titulo: m.nome + ' · ' + t.titulo, onde: 'lendo a aula (aba ' + ABAS[r.aba || 0] + ')' };
    if (r.tipo === 'quiz' && qa) { var q0 = qById(qa.ids[Math.min(qa.i, qa.ids.length - 1)]); var m2 = q0 && mat(q0.m); return { mat: q0 && q0.m, titulo: (m2 ? m2.nome + ' · ' : '') + 'questões', onde: 'fazendo questões (' + qa.i + ' de ' + qa.ids.length + ' respondidas)' }; }
    if (r.tipo === 'simulado' && sm) return { mat: null, titulo: 'Simulado', onde: 'em um simulado (' + Object.keys(sm.resp).length + ' de ' + sm.ids.length + ' questões respondidas; o tempo ficou parado)' };
    if (r.tipo === 'materia' && m) return { mat: r.m, titulo: m.nome, onde: 'na trilha da matéria' };
    return null;
  }
  /* "Skill" pessoal: o que a pessoa estudou na matéria, no que errou e o que anotou */
  function skillPessoal(mid) {
    var m = mat(mid), vis = estudados(mid), tot = topsOf(m).length, linhas = [];
    if (!vis.length) return { linhas: ['Você ainda não abriu nenhum tópico de ' + m.nome + '.'], vis: vis };
    linhas.push('Você já viu <b>' + vis.length + ' de ' + tot + '</b> tópicos de ' + esc(m.nome) + ': ' + vis.map(function (t) { return esc(t.titulo); }).join('; ') + '.');
    vis.slice(-2).forEach(function (t) { var p = pontos(t.basico, 2); if (p.length) linhas.push('<b>' + esc(t.titulo) + ':</b> ' + p.map(esc).join(' · ')); });
    var pior = null; vis.forEach(function (t) { var a = accOf(qsOf(mid, t.id)); if (a.t >= 2 && (!pior || a.p < pior.p)) pior = { t: t, p: a.p }; });
    if (pior && pior.p < 0.8) linhas.push('Ponto de atenção: <b>' + esc(pior.t.titulo) + '</b> (acerto ' + Math.round(pior.p * 100) + '%).');
    var ultimo = vis[vis.length - 1], nota = S.notas[tkey(mid, ultimo.id)];
    if (nota) linhas.push('Sua anotação em ' + esc(ultimo.titulo) + ': "' + esc(nota.slice(0, 160)) + '"');
    var seg = (tempoDe().mats || {})[mid]; if (seg) linhas.push('Tempo estudado nesta matéria: <b>' + fmtDur(seg) + '</b>.');
    return { linhas: linhas, vis: vis };
  }
  function recomecarMateria(mid) {
    var m = mat(mid);
    ask('Recomeçar ' + m.nome + ' do início? O progresso nos tópicos (voltas concluídas e "já vi") será zerado. Suas anotações, erros e histórico continuam.', function () {
      topsOf(m).forEach(function (t) { var k = tkey(mid, t.id); delete S.done[k]; delete S.rev[k]; if (S.visto) delete S.visto[k]; });
      S.quizAtual = null; S.retomar = { tipo: 'materia', m: mid, hash: '#/materia/' + mid, ts: Date.now() }; save(); toast('Matéria reiniciada'); go('#/aula/' + mid + '/' + topsOf(m)[0].id);
    });
  }
  function oferecerRetomar() {
    if (!UID || !S.perfil || !retomarAnterior) return;
    var hh = location.hash || '';
    if (/^#\/(nivel|cadastro|conta)/.test(hh)) return;
    try { if (sessionStorage.getItem('estudo.retomado')) return; sessionStorage.setItem('estudo.retomado', '1'); } catch (e) { }
    var r = retomarAnterior, d = descreveRetomar(r); if (!d) return;
    var sk = d.mat ? skillPessoal(d.mat) : null;
    var o = document.createElement('div'); o.className = 'modal';
    o.innerHTML = '<div class="box" role="dialog" aria-modal="true" style="max-height:88vh;overflow:auto"><div class="small mut">Continuar de onde parou?</div><h2 style="margin:.2rem 0">▶ ' + esc(d.titulo) + '</h2><p class="small">Você estava ' + esc(d.onde) + ' · ' + ha(r.ts) + '.</p>' +
      (sk ? '<div class="expl small"><b>O que você estudou até aqui</b><ul style="margin:.3rem 0;padding-left:1.1rem">' + sk.linhas.map(function (l) { return '<li style="margin:.2rem 0">' + l + '</li>'; }).join('') + '</ul>' + (d.mat ? '<a href="#/resumo/' + d.mat + '" id="rt-res">Ver o resumo completo desta matéria</a>' : '') + '</div>' : '') +
      '<div style="display:grid;gap:.5rem;margin-top:.7rem"><button class="btn pri" id="rt-ok">▶ Continuar de onde parei</button>' + (d.mat ? '<button class="btn" id="rt-re">🔁 Recomeçar esta matéria</button>' : '') + '<button class="btn" id="rt-no">Ir para o painel</button></div></div>';
    document.body.appendChild(o);
    function fecha() { o.remove(); }
    o.querySelector('#rt-ok').onclick = function () { fecha(); go(r.tipo === 'quiz' ? '#/quiz?resume=1' : r.hash); };
    var re = o.querySelector('#rt-re'); if (re) re.onclick = function () { fecha(); recomecarMateria(d.mat); };
    o.querySelector('#rt-no').onclick = fecha;
    var lk = o.querySelector('#rt-res'); if (lk) lk.onclick = fecha;
    o.querySelector('#rt-ok').focus();
  }

  /* ---------- Resumo do que foi estudado ---------- */
  function concluida(mid) { var ts = topsOf(mat(mid)); return ts.length > 0 && ts.every(function (t) { return topicDone(mid, t.id, 1); }); }
  function verConclusaoMateria(mid) {
    if (!concluida(mid)) return; S.conclAvisada = S.conclAvisada || {}; if (S.conclAvisada[mid]) return; S.conclAvisada[mid] = true; save();
    var o = document.createElement('div'); o.className = 'modal';
    o.innerHTML = '<div class="box" role="dialog" aria-modal="true"><h2 style="margin:0 0 .3rem">🎉 Matéria concluída!</h2><p>Você terminou todos os tópicos de <b>' + esc(mat(mid).nome) + '</b>. Quer ver o resumo de tudo que estudou?</p><div class="row"><button class="btn pri" id="mc-ok">Ver resumo</button><button class="btn" id="mc-no">Depois</button></div></div>';
    document.body.appendChild(o);
    o.querySelector('#mc-no').onclick = function () { o.remove(); };
    o.querySelector('#mc-ok').onclick = function () { o.remove(); go('#/resumo/' + mid); };
  }
  function contextoMateria(mid) {
    var m = mat(mid), ts = topsOf(m), vis = estudados(mid), feitos = ts.filter(function (t) { return topicDone(mid, t.id, 1); });
    if (!vis.length) return 'Você ainda não começou ' + esc(m.nome) + '. O primeiro tópico é <b>' + esc(ts[0].titulo) + '</b>.';
    var primeiro = Math.min.apply(null, vis.map(function (t) { var v = (S.visto || {})[tkey(mid, t.id)]; return v ? v.ts : Date.now(); }));
    var ult = null; vis.forEach(function (t) { var v = (S.visto || {})[tkey(mid, t.id)]; if (v && (!ult || v.ts > ult.ts)) ult = { t: t, ts: v.ts }; });
    var melhor = null, pior = null; vis.forEach(function (t) { var a = accOf(qsOf(mid, t.id)); if (a.t >= 2) { if (!melhor || a.p > melhor.p) melhor = { t: t, p: a.p }; if (!pior || a.p < pior.p) pior = { t: t, p: a.p }; } });
    var falta = ts.filter(function (t) { return !foiVisto(mid, t.id); });
    var h = 'Você começou ' + esc(m.nome) + ' em <b>' + brDate(iso(new Date(primeiro))) + '</b>. Já viu <b>' + vis.length + ' de ' + ts.length + '</b> tópicos e concluiu a primeira volta em <b>' + feitos.length + '</b>.';
    if (ult) h += ' O último que abriu foi <b>' + esc(ult.t.titulo) + '</b> (' + ha(ult.ts) + ').';
    if (melhor && pior && melhor.t !== pior.t) h += ' Seu melhor tópico é <b>' + esc(melhor.t.titulo) + '</b> (' + Math.round(melhor.p * 100) + '% de acerto) e o ponto de atenção é <b>' + esc(pior.t.titulo) + '</b> (' + Math.round(pior.p * 100) + '%).';
    else if (melhor) h += ' Acerto em ' + esc(melhor.t.titulo) + ': ' + Math.round(melhor.p * 100) + '%.';
    h += falta.length ? ' Ainda falta ver: ' + falta.map(function (t) { return esc(t.titulo); }).join('; ') + '.' : ' Você já passou por todos os tópicos desta matéria.';
    return h;
  }
  function vResumo(mid) {
    if (!mid) {
      var h = '<h1>Resumo do que estudei</h1><p class="mut">Tudo o que você já viu, matéria por matéria, com o contexto para lembrar de onde parou. Fica pronto para revisar a qualquer momento e completo quando você termina a matéria.</p>';
      mats().forEach(function (m) {
        var vis = estudados(m.id).length, tot = topsOf(m).length, seg = (tempoDe().mats || {})[m.id] || 0, ok = concluida(m.id);
        h += '<a class="card" style="display:block;color:inherit;text-decoration:none;border-left:6px solid ' + m.cor + '" href="#/resumo/' + m.id + '"><div class="row"><b>' + esc(m.nome) + '</b><span class="sp"></span>' + (ok ? '<span class="pill ok">concluída</span>' : '<span class="pill">' + vis + '/' + tot + ' vistos</span>') + '</div>' + bar(pct(vis, tot), m.cor) + '<div class="small mut" style="margin-top:.3rem">' + (seg ? 'Tempo estudado: ' + fmtDur(seg) : 'Ainda sem tempo registrado') + '</div></a>';
      });
      $app.innerHTML = h; return;
    }
    var m = mat(mid); if (!m) return go('#/resumo');
    var ts = topsOf(m), vis = estudados(mid), seg = (tempoDe().mats || {})[mid] || 0, ok = concluida(mid), ac = accOf(qsOf(mid));
    var h2 = '<p class="noprint"><a href="#/resumo">← Resumo</a></p><h1>' + esc(m.nome) + '</h1><div class="row">' + (ok ? '<span class="pill ok">matéria concluída 🎉</span>' : '<span class="pill">em andamento</span>') + '<span class="small mut">' + vis.length + ' de ' + ts.length + ' tópicos vistos · ' + fmtDur(seg) + ' de estudo' + (ac.t ? ' · acerto ' + Math.round(ac.p * 100) + '%' : '') + '</span></div>';
    h2 += '<div class="card"><h3 style="margin-top:0">🧭 Contexto para lembrar</h3><p style="margin:.2rem 0">' + contextoMateria(mid) + '</p></div>';
    h2 += '<h2>O que você estudou</h2>';
    if (!vis.length) h2 += '<div class="card">Nada ainda. <a href="#/materia/' + mid + '">Abrir a trilha</a>.</div>';
    vis.forEach(function (t, idx) {
      var k = tkey(mid, t.id), v = (S.visto || {})[k], a = accOf(qsOf(mid, t.id)), tp = (tempoDe().topicos || {})[k] || 0;
      var erros = Object.keys(S.erros).filter(function (id) { var q = qById(id); return q && q.m === mid && q.t === t.id && !S.erros[id].res; });
      h2 += '<details class="card"' + (idx === vis.length - 1 ? ' open' : '') + '><summary style="cursor:pointer"><b>' + esc(t.titulo) + '</b> <span class="small mut">' + [1, 2, 3].map(function (n) { return topicDone(mid, t.id, n) ? '●' : '○'; }).join(' ') + (tp ? ' · ' + fmtDur(tp) : '') + (a.t ? ' · acerto ' + Math.round(a.p * 100) + '%' : '') + '</span></summary>' +
        '<div class="lesson"><h3>Contexto</h3>' + t.contexto + '<h3>Resumo básico</h3>' + t.basico + '<h3>Aprofundamento</h3>' + t.aprofundado + '</div>' +
        (S.notas[k] ? '<div class="expl small"><b>Sua anotação:</b> ' + esc(S.notas[k]) + '</div>' : '') +
        (erros.length ? '<h3>Erros que ainda estão abertos e a regra correta</h3>' + erros.map(function (id) { var q = qById(id); return '<div class="expl small"><b>' + esc(q.q) + '</b><br>Gabarito: ' + LET[q.g] + ') ' + esc(q.a[q.g]) + '<br>' + esc(q.e) + '</div>'; }).join('') : '') +
        '<p class="noprint"><a class="btn sm" href="#/aula/' + mid + '/' + t.id + '">Reabrir a aula</a></p></details>';
    });
    var falta = ts.filter(function (t) { return !foiVisto(mid, t.id); });
    if (falta.length) h2 += '<h2>Ainda não vistos</h2><div class="card list">' + falta.map(function (t) { return '<a class="item" href="#/aula/' + mid + '/' + t.id + '"><span style="flex:1">' + esc(t.titulo) + '</span><span class="small mut">abrir ›</span></a>'; }).join('') + '</div>';
    h2 += '<div class="row noprint"><a class="btn pri" href="#/materia/' + mid + '">Voltar à trilha</a><button class="btn" id="rs-print">🖨 Imprimir / salvar em PDF</button><button class="btn" id="rs-re">🔁 Recomeçar a matéria</button></div>';
    $app.innerHTML = h2;
    document.getElementById('rs-print').onclick = function () { window.print(); };
    document.getElementById('rs-re').onclick = function () { recomecarMateria(mid); };
  }
  function cardRetomar() {
    var r = S.retomar, d = r && descreveRetomar(r); if (!d) return '';
    return '<div class="card" style="border-left:6px solid var(--ok)"><div class="row"><b>▶ Continuar de onde parei</b><span class="sp"></span><span class="small mut">' + ha(r.ts) + '</span></div><p style="margin:.3rem 0"><b>' + esc(d.titulo) + '</b><br><span class="small mut">Você estava ' + esc(d.onde) + '.</span></p><div class="row"><a class="btn pri" href="' + (r.tipo === 'quiz' ? '#/quiz?resume=1' : r.hash) + '">Continuar</a>' + (d.mat ? '<a class="btn" href="#/resumo/' + d.mat + '">Meu resumo</a>' : '') + '</div></div>';
  }
  function cardTempo() {
    var tp = tempoDe(), hoje = tp.diasEst[today()] || 0;
    return '<div class="card"><div class="row"><b>⏱ Tempo de estudo</b><span class="sp"></span><a class="small" href="#/resumo">Meu resumo</a></div><div class="grid c3" style="margin-top:.5rem"><div><div class="small mut">Hoje</div><div class="stat" id="tt-hoje" style="font-size:1.3rem">' + fmtDur(hoje) + '</div></div><div><div class="small mut">Últimos 7 dias</div><div class="stat" id="tt-sem" style="font-size:1.3rem">' + fmtDur(semanaEst()) + '</div></div><div><div class="small mut">Total</div><div class="stat" id="tt-tot" style="font-size:1.3rem">' + fmtDur(tp.estudo) + '</div></div></div><p class="small mut" style="margin:.4rem 0 0">O cronômetro (no topo) conta <b>só nas telas de estudo</b>: aulas, questões, simulados, revisão e resumo. Nas outras telas ele fica parado. Também pausa sozinho quando você sai da página, fecha o site ou fica 3 minutos parado.</p></div>';
  }

  /* ---------- Foco na aprovação ---------- */
  var DESEMPATE = ['especificos', 'portugues', 'legislacao', 'logica', 'gerais']; // edital 24/2026, item 10.4 (SEMED)
  function dqs() { return C.dist[S.nivel].q; }
  function totQ() { var d = dqs(); return Object.keys(d).reduce(function (a, k) { return a + d[k]; }, 0); }
  function metaNota() { return S.metaNota || 70; }
  function accOf(list) { var t = 0, h = 0; list.forEach(function (q) { var a = S.answers[q.id]; if (a) { t += a.tries; h += a.hits; } }); return { t: t, h: h, p: t ? h / t : null }; }
  /* nota projetada: acerto atual em cada matéria ponderado pelo número de questões da prova */
  function prontidao() {
    var d = dqs(), tot = totQ(), proj = 0, medido = 0;
    mats().forEach(function (m) { var w = (d[m.id] || 0) / tot, a = accOf(qsOf(m.id)); if (a.t >= 5) { proj += w * a.p; medido += w; } });
    return { proj: medido ? proj / medido : null, medido: medido };
  }
  /* prioridade = peso do tópico na prova x (quanto falta para acertar), com bônus para o que nunca foi estudado */
  function prioridades() {
    var d = dqs(), tot = totQ(), out = [];
    mats().forEach(function (m) {
      var ts = topsOf(m);
      ts.forEach(function (t) {
        if (!qsOf(m.id, t.id).length) return; // sem questões não dá para medir: fica só na trilha
        var a = accOf(qsOf(m.id, t.id)), w = (d[m.id] || 0) / tot / ts.length, nova = !topicDone(m.id, t.id, 1);
        var gap = a.t >= 2 ? 1 - a.p : 0.6;
        out.push({ m: m, t: t, a: a, nova: nova, score: w * (gap + (nova ? 0.15 : 0)) });
      });
    });
    return out.sort(function (x, y) { return y.score - x.score; });
  }
  function motivo(x) { return (x.a.t >= 2 ? 'acerto ' + Math.round(x.a.p * 100) + '%' : 'sem dados ainda') + (x.nova ? ' · ainda não estudado' : ''); }
  function listaFoco(n) {
    var pool = [];
    prioridades().slice(0, 6).forEach(function (x) {
      qsOf(x.m.id, x.t.id).forEach(function (q) { var a = S.answers[q.id], peso = !a ? 3 : (a.last === false ? 4 : 1); for (var i = 0; i < peso; i++) pool.push(q); });
    });
    var seen = {}, out = [];
    shuffle(pool).forEach(function (q) { if (!seen[q.id] && out.length < n) { seen[q.id] = 1; out.push(q); } });
    return out;
  }
  function cardMeta() {
    var pr = prontidao(), tot = totQ(), meta = metaNota(), minQ = Math.ceil(tot * 0.5), alvoQ = Math.ceil(tot * meta / 100);
    var nota = pr.proj != null && pr.medido >= 0.5 ? Math.round(pr.proj * 100) : null;
    var h = '<div class="card"><div class="row"><b>🎯 Meta: passar na prova</b><span class="sp"></span><span class="pill">' + esc(concInfo(S.concurso).nome + ' · ' + NV_CURTO[S.nivel]) + '</span></div>' +
      '<p class="small" style="margin:.4rem 0">Nota mínima: <b>' + minQ + ' de ' + tot + '</b> (50%). Sua meta, com margem: <b>' + alvoQ + ' de ' + tot + '</b> (' + meta + '%).</p>';
    if (nota == null) {
      h += '<div class="aviso">Ainda não dá para projetar sua nota. Faça o <b>diagnóstico</b> (mini-simulado) para descobrir seus pontos fracos.</div><p><a class="btn pri" href="#/simulados">Fazer diagnóstico</a></p>';
    } else {
      var st = nota >= meta ? ['ok', 'Meta atingida: mantenha o ritmo'] : nota >= 50 ? ['warn', 'Acima do mínimo, mas sem margem'] : ['bad', 'Abaixo da nota mínima: foque nos pontos fracos'];
      h += '<div class="row"><span class="stat">' + nota + '%</span><span class="small mut">nota projetada (' + Math.round(nota * tot / 100) + ' de ' + tot + ')</span><span class="sp"></span><span class="pill ' + st[0] + '">' + st[1] + '</span></div>' +
        '<div class="meter" aria-hidden="true"><i style="width:' + Math.min(100, nota) + '%"></i><b style="left:50%" title="nota mínima"></b><b class="alvo" style="left:' + meta + '%" title="sua meta"></b></div><div class="small mut" style="display:flex;justify-content:space-between"><span>0%</span><span>mín. 50%</span><span>meta ' + meta + '%</span></div>';
      if (pr.medido < 1) h += '<p class="small mut">Projeção com base nas matérias que você já treinou (' + Math.round(pr.medido * 100) + '% do peso da prova). Treine as demais para refinar.</p>';
    }
    h += '<p class="small mut" style="margin:.4rem 0 0">' + (estrConf() ? '' : 'Estrutura estimada: confirme no edital do seu cargo. ') + 'A nota mínima não garante a vaga: a classificação depende também da linha de corte e dos outros candidatos.</p></div>';
    return h;
  }
  function cardMissao() {
    var due = revDue().filter(function (x) { return x.r.due <= today(); }), pr = prioridades(), top = pr[0];
    var abertos = Object.keys(S.erros).filter(function (id) { return qById(id) && visivel(qById(id).m, qById(id).t) && !S.erros[id].res; });
    var feitas = (S.dia || {})[today()] || 0, metaq = S.metaq || 30;
    var item = function (ok, txt, href) { return '<a class="chk" style="color:inherit;text-decoration:none" href="' + href + '"><span style="width:22px;text-align:center">' + (ok ? '✅' : '⬜') + '</span><span>' + txt + '</span></a>'; };
    var h = '<div class="card"><div class="row"><b>📌 Missão de hoje</b><span class="sp"></span><span class="small mut">' + esc(RITMO[new Date().getDay()][1]) + '</span></div>';
    if (due.length) h += item(false, 'Revisar <b>' + due.length + '</b> tópico(s) agendado(s)', '#/revisao');
    if (top) h += item(false, 'Estudar o ponto de maior retorno: <b>' + esc(top.t.titulo) + '</b><div class="small mut">' + esc(top.m.nome) + ' · ' + motivo(top) + '</div>', '#/aula/' + top.m.id + '/' + top.t.id);
    h += item(feitas >= 10, 'Treino focado: 10 questões nos seus pontos fracos', '#/quiz?foco=1&n=10');
    if (abertos.length) h += item(false, 'Refazer erros do caderno (<b>' + abertos.length + '</b> abertos)', '#/quiz?ids=' + abertos.slice(0, 10).join(',') + '&n=10');
    h += '<div style="margin-top:.5rem"><div class="small mut">Questões hoje: ' + feitas + ' de ' + metaq + '</div>' + bar(Math.min(100, pct(feitas, metaq))) + '</div></div>';
    h += '<div class="card"><b>Onde estudar primeiro</b><p class="small mut" style="margin:.2rem 0 .4rem">Ordenado por peso na prova e por quanto falta para você acertar.</p><div class="list">' +
      pr.slice(0, 5).map(function (x) { return '<a class="item" href="#/aula/' + x.m.id + '/' + x.t.id + '"><span class="dot" style="background:' + x.m.cor + '"></span><span style="flex:1"><b>' + esc(x.t.titulo) + '</b><br><span class="small mut">' + esc(x.m.nome) + ' · ' + motivo(x) + '</span></span></a>'; }).join('') + '</div></div>';
    return h;
  }

  /* ---------- Painel ---------- */
  var RITMO = { 1: ['portugues', 'Português'], 2: ['logica', 'Raciocínio Lógico'], 3: ['legislacao', 'Legislação'], 4: ['especificos', 'Conhecimentos Específicos'], 5: [null, 'Revisão e Conhecimentos Gerais'], 6: [null, 'Simulado'], 0: [null, 'Caderno de erros (dia leve)'] };
  function diasPara(dt) { return Math.ceil((new Date(dt) - new Date()) / 86400000); }
  function vPainel() {
    var v = voltaAtual(), wd = new Date().getDay(), r = RITMO[wd];
    var prox = null, volta = Math.max(v.n, 1);
    mats().some(function (m) { return topsOf(m).some(function (t) { if (!topicDone(m.id, t.id, volta) && (!r[0] || r[0] === m.id)) { prox = { m: m, t: t }; return true; } }); });
    if (!prox) mats().some(function (m) { return topsOf(m).some(function (t) { if (!topicDone(m.id, t.id, volta)) { prox = { m: m, t: t }; return true; } }); });
    var due = revDue().filter(function (x) { return x.r.due <= today(); });
    var semIni = addDays(today(), -((new Date().getDay() + 6) % 7));
    var feitosSem = 0; Object.keys(S.done).forEach(function (k) { Object.keys(S.done[k]).forEach(function (vv) { if (iso(new Date(S.done[k][vv])) >= semIni) feitosSem++; }); });
    var geral = acc(function () { return true; });
    var cc = concInfo(S.concurso);
    var h = '<h1>Olá, ' + esc(primeiroNome()) + '! Vamos estudar?</h1><p class="small mut" style="margin-top:-.3rem">Concurso: <b>' + esc(cc.nome) + ' (' + esc(cc.banca) + ')</b> · Nível: <b>' + esc(nvInfo().nome) + '</b> · <a href="#/' + (inscs().length > 1 ? 'nivel' : 'cadastro') + '">' + (inscs().length > 1 ? 'alternar' : 'editar cadastro') + '</a></p>';
    if (cc.prova) { var d = diasPara(cc.prova); h += '<div class="card"><div class="mut small">Prova ' + esc(cc.nome) + ' (' + esc(cc.banca) + ')</div><div class="stat">' + (d >= 0 ? d + ' dias' : 'Prova realizada') + '</div><div class="small mut">' + esc(provaTxt(cc)) + ' (confirmar no edital)</div></div>'; }
    else h += '<div class="card"><div class="mut small">Prova ' + esc(cc.nome) + ' (' + esc(cc.banca) + ')</div><div class="stat">Data a definir</div><div class="small mut">' + esc(cc.status) + ' <a target="_blank" rel="noopener" href="' + esc(cc.busca) + '">Acompanhar a banca</a>. Enquanto isso, o cronograma usa a prova da SEMED como referência.</div></div>';
    h += cardRetomar() + cardTempo() + cardMeta() + cardMissao();
    h += '<div class="card"><div class="row"><b>' + esc(v.nome) + '</b></div><p class="small mut" style="margin:.3rem 0">Rotina do dia: teoria dirigida 60 min · questões 90 min · revisão ativa 30 min (resumo de 1 página + caderno de erros).</p>' + (prox ? '<a class="btn" href="#/aula/' + prox.m.id + '/' + prox.t.id + '">▶ Seguir a trilha: ' + esc(prox.t.titulo) + '</a>' : '<p>🎉 Você concluiu todos os tópicos desta volta.</p>') + '</div>';
    h += '<div class="grid c3"><div class="card"><div class="mut small">Revisões para hoje</div><div class="stat">' + due.length + '</div><a href="#/revisao">Abrir revisão</a></div>';
    h += '<div class="card"><div class="mut small">Meta da semana (' + feitosSem + '/' + S.meta + ' etapas)</div>' + bar(Math.min(100, pct(feitosSem, S.meta))) + '<div class="small mut" style="margin-top:.4rem">Ajuste em Ajustes.</div></div>';
    h += '<div class="card"><div class="mut small">Acertos gerais</div><div class="stat">' + (geral.tries ? geral.p + '%' : '--') + '</div><div class="small mut">' + geral.hits + ' de ' + geral.tries + ' respostas</div></div></div>';
    h += '<h2>Progresso por matéria</h2>';
    mats().forEach(function (m) {
      var tot = topsOf(m).length, a = acc(function (q) { return q.m === m.id; });
      h += '<a class="card" style="display:block;color:inherit;text-decoration:none" href="#/materia/' + m.id + '"><div class="row"><b>' + esc(m.nome) + '</b><span class="sp"></span><span class="small mut">' + (a.tries ? 'acertos ' + a.p + '%' : 'sem questões feitas') + '</span></div>' + bar(pct(matProgress(m.id, 1), tot), m.cor) +
        '<div class="small mut" style="margin-top:.3rem">Volta 1: ' + matProgress(m.id, 1) + '/' + tot + ' · Volta 2: ' + matProgress(m.id, 2) + '/' + tot + ' · Volta 3: ' + matProgress(m.id, 3) + '/' + tot + '</div></a>';
    });
    h += '<div class="aviso">Conteúdos marcados como <b>provável</b> vêm do levantamento de 10/10/2026. O <b>Anexo IV</b> do edital (conteúdo programático oficial) não veio no PDF que consegui ler: confira em <a href="#/edital">Edital</a>.</div>';
    $app.innerHTML = h;
  }

  /* ---------- Trilha ---------- */
  function vTrilha() {
    var h = '<h1>Trilha de estudo</h1><p class="mut">Três voltas na matéria inteira: <b>contexto → básico → aprofundado</b>. Em cada tópico: contexto (10 min), resumo (30 min), teste (20 min).</p>';
    mats().forEach(function (m) {
      h += '<a class="card" style="display:block;color:inherit;text-decoration:none;border-left:6px solid ' + m.cor + '" href="#/materia/' + m.id + '"><div class="row"><b>' + esc(m.nome) + '</b><span class="sp"></span><span class="pill">' + m.questoes + ' questões · ' + m.peso + '</span></div><div class="small mut">' + topsOf(m).length + ' tópicos · ' + qsOf(m.id).length + ' questões no banco</div></a>';
    });
    $app.innerHTML = h;
  }
  function vMateria(id) {
    var m = mat(id); if (!m) return go('#/trilha');
    S.retomar = { tipo: 'materia', m: id, hash: '#/materia/' + id, ts: Date.now() }; save();
    var h = '<p><a href="#/trilha">← Trilha</a></p><h1>' + esc(m.nome) + '</h1><p class="mut">' + esc(m.banca) + '</p>';
    h += '<div class="row noprint" style="margin-bottom:.6rem"><a class="btn sm" href="pdf/apostila-' + S.nivel + '-' + m.id + '.pdf" target="_blank" rel="noopener">⬇ Apostila em PDF</a><a class="btn sm" href="#/resumo/' + m.id + '">📚 Meu resumo</a><a class="btn sm" href="#/quiz?m=' + m.id + '&n=10">✏️ Praticar 10 questões</a></div><div class="card list">';
    topsOf(m).forEach(function (t) {
      var d = [1, 2, 3].map(function (v) { return topicDone(m.id, t.id, v) ? '●' : '○'; }).join(' ');
      h += '<a class="item" href="#/aula/' + m.id + '/' + t.id + '"><span class="dot" style="background:' + m.cor + '"></span><span style="flex:1"><b>' + esc(t.titulo) + '</b><br><span class="small mut">' + qsOf(m.id, t.id).length + ' questões' + (t.provavel ? ' · provável' : '') + '</span></span><span title="Voltas 1, 2 e 3" class="small mut">' + d + '</span></a>';
    });
    $app.innerHTML = h + '</div>';
  }

  /* ---------- Aula ---------- */
  function ytUrl(q) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' aula'); }
  function gUrl(q) { return 'https://www.google.com/search?q=' + encodeURIComponent(q + ' resumo filetype:pdf'); }
  function gUrl2(q) { return 'https://www.google.com/search?q=' + encodeURIComponent(q); }
  function vAula(mid, tid, aba) {
    var m = mat(mid), t = topico(mid, tid); if (!t) return go('#/trilha');
    var k = tkey(mid, tid), tl = topsOf(m), idx = tl.indexOf(t), nxt = tl[idx + 1], prv = tl[idx - 1];
    var links = S.links[k] || [], ab = [0, 1, 2].indexOf(+aba) >= 0 ? +aba : 0;
    marcaVisto(mid, tid, ab);
    var h = '<p class="noprint"><a href="#/materia/' + mid + '">← ' + esc(m.nome) + '</a></p><div class="lesson"><h1>' + esc(t.titulo) + '</h1>';
    h += '<div class="row noprint">' + (t.provavel ? '<span class="pill warn">conteúdo provável · confirmar no edital</span>' : '') + '</div>';
    h += '<div class="tabs noprint" role="tablist"><button class="tab' + (ab === 0 ? ' on' : '') + '" data-l="0">1 · Contexto</button><button class="tab' + (ab === 1 ? ' on' : '') + '" data-l="1">2 · Básico</button><button class="tab' + (ab === 2 ? ' on' : '') + '" data-l="2">3 · Aprofundado</button></div>';
    h += '<div class="card"><div class="lvl' + (ab === 0 ? ' on' : '') + '" data-l="0"><h3 class="print-only">1 · Contexto</h3>' + t.contexto + '</div><div class="lvl' + (ab === 1 ? ' on' : '') + '" data-l="1"><h3 class="print-only">2 · Básico</h3>' + t.basico + '</div><div class="lvl' + (ab === 2 ? ' on' : '') + '" data-l="2"><h3 class="print-only">3 · Aprofundado</h3>' + t.aprofundado + '</div></div></div>';
    h += '<div class="card noprint"><h3 style="margin-top:0">Material de apoio</h3><p class="small mut">Busque aulas e resumos já prontos ou baixe a apostila gerada para este edital.</p><div class="row">' +
      '<a class="btn sm" target="_blank" rel="noopener" href="' + ytUrl(t.busca) + '">▶ Videoaulas no YouTube</a>' +
      '<a class="btn sm" target="_blank" rel="noopener" href="' + gUrl(t.busca) + '">📄 PDFs resumidos (Google)</a>' +
      '<a class="btn sm" target="_blank" rel="noopener" href="' + gUrl2(t.titulo + ' concurso') + '">🔎 Google</a>' +
      '<a class="btn sm" target="_blank" rel="noopener" href="pdf/apostila-' + S.nivel + '-' + mid + '.pdf">⬇ Apostila PDF (' + esc(m.nome) + ')</a>' +
      '<button class="btn sm" id="b-print">🖨 Salvar esta aula em PDF</button></div>';
    h += '<div id="mylinks" style="margin-top:.6rem">' + links.map(function (l, i) { return '<div class="row small"><a target="_blank" rel="noopener" href="' + esc(l.url) + '">' + esc(l.t) + '</a><button class="btn sm" data-del="' + i + '" aria-label="Remover">✕</button></div>'; }).join('') + '</div>' +
      '<details style="margin-top:.5rem"><summary class="small">+ Adicionar meu link (vídeo ou PDF)</summary><label for="lk-t">Título</label><input type="text" id="lk-t" placeholder="Ex.: Aula de crase do canal X"><label for="lk-u">Endereço (https://...)</label><input type="url" id="lk-u" placeholder="https://"><p><button class="btn sm pri" id="lk-add">Salvar link</button></p></details></div>';
    h += '<div class="card noprint"><h3 style="margin-top:0">Teste rápido (' + Math.min(5, qsOf(mid, tid).length) + ' questões)</h3><p class="small mut">Acertou 4 de 5 ou explica sem travar: pode avançar.</p><a class="btn pri" href="#/quiz?m=' + mid + '&t=' + tid + '&n=5">Fazer teste</a></div>';
    h += '<div class="card noprint"><h3 style="margin-top:0">Concluir etapa</h3><div class="row">' + [1, 2, 3].map(function (v) { return '<button class="btn ' + (topicDone(mid, tid, v) ? 'ok' : '') + '" data-v="' + v + '">' + (topicDone(mid, tid, v) ? '✔ ' : '') + 'Volta ' + v + '</button>'; }).join('') + '</div><p class="small mut">Ao concluir, as revisões em 1, 7 e 21 dias são agendadas.</p>' +
      '<label for="nota">Hoje entendi (3 linhas):</label><textarea id="nota" placeholder="Escreva com suas palavras...">' + esc(S.notas[k] || '') + '</textarea></div>';
    h += '<div class="row noprint">' + (prv ? '<a class="btn" href="#/aula/' + mid + '/' + prv.id + '">← Anterior</a>' : '') + '<span class="sp"></span>' + (nxt ? '<a class="btn" href="#/aula/' + mid + '/' + nxt.id + '">Próxima →</a>' : '') + '</div>';
    $app.innerHTML = h;

    Array.prototype.forEach.call($app.querySelectorAll('.tab'), function (b) {
      b.onclick = function () { var l = b.getAttribute('data-l'); Array.prototype.forEach.call($app.querySelectorAll('.tab,.lvl'), function (e) { e.classList.toggle('on', e.getAttribute('data-l') === l); }); marcaVisto(mid, tid, +l); };
    });
    document.getElementById('b-print').onclick = function () { window.print(); };
    document.getElementById('nota').onchange = function (e) { S.notas[k] = e.target.value; save(); toast('Anotação salva'); };
    Array.prototype.forEach.call($app.querySelectorAll('[data-v]'), function (b) { b.onclick = function () { markDone(mid, tid, +b.getAttribute('data-v')); toast('Etapa concluída! Revisões agendadas.'); vAula(mid, tid, S.retomar && S.retomar.aba); verConclusaoMateria(mid); }; });
    document.getElementById('lk-add').onclick = function () {
      var u = document.getElementById('lk-u').value.trim(), tt = document.getElementById('lk-t').value.trim() || u;
      if (!/^https?:\/\//i.test(u)) { toast('Use um endereço que comece com http:// ou https://'); return; }
      S.links[k] = (S.links[k] || []).concat([{ t: tt, url: u }]); save(); vAula(mid, tid);
    };
    Array.prototype.forEach.call($app.querySelectorAll('[data-del]'), function (b) { b.onclick = function () { S.links[k].splice(+b.getAttribute('data-del'), 1); save(); vAula(mid, tid); }; });
  }

  /* Comentário de cada alternativa: por que a sua estava errada, por que a certa está certa e por que as outras não servem */
  function blocoAlternativas(q, marcada) {
    var x = C.x && C.x[q.id];
    if (!x) return '';
    function card(k, cls, titulo) {
      return '<div class="alt-c ' + cls + '"><div class="alt-h">' + titulo + '</div><div class="alt-t"><b>' + LET[k] + ')</b> ' + esc(q.a[k]) + '</div><p>' + esc(x[k]) + '</p></div>';
    }
    var h = '<div class="alts-c"><h3 style="margin:.2rem 0 .4rem">Por que cada alternativa</h3>';
    if (marcada != null && marcada !== q.g) h += card(marcada, 'chosen', '✘ Sua resposta: por que está errada');
    h += card(q.g, 'right', marcada === q.g ? '✔ Você acertou: por que está certa' : '✔ Gabarito: por que está certa');
    for (var k = 0; k < q.a.length; k++) if (k !== q.g && k !== marcada) h += card(k, 'other', '✘ Por que não é a resposta');
    return h + '</div>';
  }

  /* ---------- Quiz com correção imediata ---------- */
  function vPraticar() {
    var h = '<h1>Questões</h1><div class="card"><b>🎯 Treino focado na aprovação</b><p class="small mut" style="margin:.2rem 0 .5rem">Mistura questões dos tópicos que mais pesam na prova e onde você mais erra.</p><a class="btn pri" href="#/quiz?foco=1&n=10">Treino focado (10)</a> <a class="btn" href="#/quiz?foco=1&n=20">20 questões</a></div><div class="card"><label for="pm">Matéria</label><select id="pm"><option value="">Todas</option>' + mats().map(function (m) { return '<option value="' + m.id + '">' + esc(m.nome) + '</option>'; }).join('') + '</select>' +
      '<label for="pt">Tópico</label><select id="pt"><option value="">Todos</option></select>' +
      '<label for="pn">Quantidade</label><select id="pn"><option>5</option><option selected>10</option><option>20</option><option value="999">Todas</option></select>' +
      '<label for="pf">Filtro</label><select id="pf"><option value="">Todas</option><option value="novas">Só as que ainda não fiz</option><option value="erradas">Só as que errei</option></select>' +
      '<p><button class="btn pri" id="pgo">Começar</button></p></div>';
    $app.innerHTML = h;
    var pm = document.getElementById('pm'), pt = document.getElementById('pt');
    pm.onchange = function () { var m = mat(pm.value); pt.innerHTML = '<option value="">Todos</option>' + (m ? topsOf(m).map(function (t) { return '<option value="' + t.id + '">' + esc(t.titulo) + '</option>'; }).join('') : ''); };
    document.getElementById('pgo').onclick = function () { go('#/quiz?m=' + pm.value + '&t=' + pt.value + '&n=' + document.getElementById('pn').value + '&f=' + document.getElementById('pf').value); };
  }
  function vQuiz(q) {
    var list = qsOf(q.m, q.t);
    if (q.f === 'novas') list = list.filter(function (x) { return !S.answers[x.id]; });
    if (q.f === 'erradas') list = list.filter(function (x) { return S.erros[x.id] && !S.erros[x.id].res; });
    if (q.foco) list = listaFoco(+q.n || 10);
    if (q.ids) list = q.ids.split(',').map(qById).filter(Boolean);
    if (q.resume && S.quizAtual) { var qa = S.quizAtual; var lr = qa.ids.map(qById).filter(Boolean); if (lr.length) return runQuiz(lr, q, { i: Math.min(qa.i, lr.length - 1), acertos: qa.acertos, errados: qa.errados || [] }); }
    list = shuffle(list).slice(0, +q.n || 10);
    if (!list.length) { $app.innerHTML = '<div class="card"><p>Nenhuma questão encontrada com esse filtro.</p><a class="btn" href="#/praticar">Voltar</a></div>'; return; }
    runQuiz(list, q);
  }
  function runQuiz(list, q, est) {
    var i = est ? est.i : 0, acertos = est ? est.acertos : 0, errados = est ? est.errados.slice() : [];
    function lembra() { S.quizAtual = { ids: list.map(function (x) { return x.id; }), i: i, acertos: acertos, errados: errados }; S.retomar = { tipo: 'quiz', hash: '#/quiz?resume=1', ts: Date.now() }; save(); }
    function show() {
      if (i >= list.length) return fim();
      var qu = list[i], m = mat(qu.m), t = topico(qu.m, qu.t); T.m = qu.m; T.t = qu.t; lembra();
      var h = '<div class="row"><span class="small mut">Questão ' + (i + 1) + ' de ' + list.length + ' · ' + esc(m.nome) + ' · ' + esc(t.titulo) + '</span></div>' + bar(pct(i, list.length)) +
        '<div class="card"><p class="q-enun">' + esc(qu.q) + '</p><div id="opts">' + qu.a.map(function (a, k) { return '<button class="opt" data-k="' + k + '"><span class="l">' + LET[k] + '</span><span>' + esc(a) + '</span></button>'; }).join('') + '</div><div id="fb"></div></div>';
      $app.innerHTML = h;
      Array.prototype.forEach.call($app.querySelectorAll('.opt'), function (b) { b.onclick = function () { resp(+b.getAttribute('data-k')); }; });
    }
    function resp(k) {
      var qu = list[i], ok = k === qu.g; record(qu, ok, k); save();
      if (ok) acertos++; else errados.push(qu.id);
      i++; lembra(); i--;
      Array.prototype.forEach.call($app.querySelectorAll('.opt'), function (b) {
        var n = +b.getAttribute('data-k'); b.disabled = true; if (n === qu.g) b.classList.add('right'); else if (n === k) b.classList.add('wrong');
      });
      var fb = '<div class="expl"><b>' + (ok ? '✔ Correto!' : '✘ Gabarito: ' + LET[qu.g]) + '</b><br>' + esc(qu.e) + '</div>';
      fb += blocoAlternativas(qu, k);
      if (!ok) fb += '<div class="small mut">Por que errou? <span class="row" style="display:inline-flex">' + [['nao_sabia', 'Não sabia'], ['confundi', 'Confundi'], ['desatencao', 'Desatenção']].map(function (x) { return '<button class="btn sm" data-mot="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</span></div>';
      fb += '<p><button class="btn pri" id="nx">' + (i + 1 < list.length ? 'Próxima →' : 'Ver resultado') + '</button></p>';
      document.getElementById('fb').innerHTML = fb;
      Array.prototype.forEach.call($app.querySelectorAll('[data-mot]'), function (b) { b.onclick = function () { S.erros[qu.id].motivo = b.getAttribute('data-mot'); save(); Array.prototype.forEach.call($app.querySelectorAll('[data-mot]'), function (x) { x.classList.toggle('pri', x === b); }); }; });
      document.getElementById('nx').onclick = function () { i++; show(); };
    }
    function fim() {
      var p = pct(acertos, list.length); S.quizAtual = null; S.retomar = list[0] ? { tipo: 'materia', m: list[0].m, hash: '#/materia/' + list[0].m, ts: Date.now() } : null; save();
      $app.innerHTML = '<div class="card"><h1>Resultado</h1><div class="stat">' + acertos + ' / ' + list.length + ' (' + p + '%)</div>' + bar(p) +
        '<p>' + (p >= 80 ? 'Muito bem! Pode avançar.' : p >= 50 ? 'Bom caminho. Revise as explicações dos erros.' : 'Releia o resumo do tópico e tente de novo.') + '</p>' +
        '<div class="row">' + (errados.length ? '<a class="btn pri" href="#/quiz?ids=' + errados.join(',') + '&n=99">Refazer erradas</a>' : '') + '<a class="btn" href="#/erros">Caderno de erros</a><a class="btn" href="#/praticar">Mais questões</a></div></div>';
    }
    show();
  }

  /* ---------- Simulados ---------- */
  function vSimulados() {
    var cur = loadSim();
    var h = '<h1>Simulados</h1>';
    if (cur) h += '<div class="card"><b>Você tem um simulado em andamento.</b><p><a class="btn pri" href="#/simulado">Continuar</a> <button class="btn" id="sim-drop">Descartar</button></p></div>';
    var D = C.dist[S.nivel], dq = D.q, tot = Object.keys(dq).reduce(function (a, k) { return a + dq[k]; }, 0), mins = Math.round(tot * 3.6);
    var dtxt = mats().map(function (m) { return m.nome.replace('Conhecimentos ', '').replace(' (RO e Porto Velho)', '') + ' ' + dq[m.id]; }).join(', ');
    h += '<div class="card"><h3 style="margin-top:0">Simulado ' + esc(nvInfo().nome) + '</h3><p>' + tot + ' questões · ' + Math.floor(mins / 60) + ' h ' + pad(mins % 60) + ' min · distribuição: ' + esc(dtxt) + '.' + (S.concurso === 'semed' && S.nivel === 'medio' ? ' Ideal fazer às <b>9h15</b> de sábado, no horário real.' : '') + '</p>' +
      (estrConf() ? '' : '<p class="aviso">Estrutura <b>estimada</b>: não li o edital deste concurso/nível. Confira quantidade e distribuição reais no edital do seu cargo.</p>') +
      '<p class="small mut">Se o banco tiver menos questões que o necessário em uma matéria, o simulado usa as disponíveis. O banco tem ' + qsOf().length + ' questões neste nível; cada simulado sorteia dentre elas, então elas se repetem.</p><button class="btn pri" id="sim-full">Iniciar simulado completo</button></div>';
    h += '<div class="card"><h3 style="margin-top:0">Mini-simulado</h3><p>cerca de ' + Math.round(tot * 0.4) + ' questões · ' + Math.round(mins * 0.4) + ' minutos · proporcional.</p><button class="btn" id="sim-mini">Iniciar mini-simulado</button></div>';
    if (S.sims.length) {
      h += '<h2>Histórico</h2><p class="small mut" style="margin-top:-.3rem">Toque em um simulado para ver o que você acertou e errou.</p>' + S.sims.map(function (x, k) { return { x: x, k: k }; }).reverse().map(function (o) {
        var x = o.x, p = pct(x.acertos, x.total);
        return '<a class="hist" href="#/simrev/' + o.k + '"><span class="hist-d"><b>' + brDate(x.dia) + '</b><span class="small mut">' + (x.c ? esc(concInfo(x.c).nome + ' · ' + NV_CURTO[x.n]) + ' · ' : '') + x.total + ' questões · ' + Math.round(x.gasto / 60) + ' min</span></span><span class="hist-n"><b>' + x.acertos + '/' + x.total + '</b><span class="pill ' + (p >= 50 ? 'ok' : 'bad') + '">' + p + '%</span></span><span class="hist-go" aria-hidden="true">›</span></a>';
      }).join('');
    }
    $app.innerHTML = h;
    function start(factor, dur) {
      var ids = [];
      Object.keys(dq).forEach(function (m) {
        var n = Math.round(dq[m] * factor);
        ids = ids.concat(shuffle(qsOf(m)).slice(0, n).map(function (x) { return x.id; }));
      });
      saveSim({ ids: ids, resp: {}, marc: {}, i: 0, ini: Date.now(), dec: 0, dur: dur, fim: null });
      go('#/simulado');
    }
    document.getElementById('sim-full').onclick = function () { start(1, mins * 60); };
    document.getElementById('sim-mini').onclick = function () { start(0.4, Math.round(mins * 0.4) * 60); };
    var d = document.getElementById('sim-drop'); if (d) d.onclick = function () { ask('Descartar o simulado em andamento?', function () { saveSim(null); vSimulados(); }); };
  }
  function fmt(sec) { sec = Math.max(0, sec); var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return pad(h) + ':' + pad(m) + ':' + pad(s); }
  function vSimRun() {
    var s = loadSim(); if (!s) return go('#/simulados');
    if (s.dec == null) s.dec = Math.floor((Date.now() - s.ini) / 1000);
    T.sim = s; /* o tempo do simulado só corre com a página ativa */
    S.retomar = { tipo: 'simulado', hash: '#/simulado', ts: Date.now() }; save();
    function left() { return s.dur - Math.floor(s.dec); }
    function draw() {
      var qu = qById(s.ids[s.i]), m = mat(qu.m);
      var h = '<div class="row"><span class="timer" id="tm">' + fmt(left()) + '</span><span class="sp"></span><button class="btn sm pri" id="fin">Finalizar</button></div>';
      h += '<div class="qgrid">' + s.ids.map(function (id, k) { return '<button data-g="' + k + '" class="' + (s.resp[id] != null ? 'a ' : '') + (s.marc[id] ? 'm ' : '') + (k === s.i ? 'cur' : '') + '">' + (k + 1) + '</button>'; }).join('') + '</div>';
      h += '<div class="card"><div class="small mut">Questão ' + (s.i + 1) + ' de ' + s.ids.length + ' · ' + esc(m.nome) + '</div><p class="q-enun">' + esc(qu.q) + '</p>' +
        qu.a.map(function (a, k) { return '<button class="opt ' + (s.resp[qu.id] === k ? 'sel' : '') + '" data-k="' + k + '"><span class="l">' + LET[k] + '</span><span>' + esc(a) + '</span></button>'; }).join('') +
        '<div class="row"><button class="btn sm" id="clr">Limpar resposta</button><button class="btn sm" id="mk">' + (s.marc[qu.id] ? '★ Desmarcar' : '☆ Marcar para revisar') + '</button></div></div>' +
        '<div class="row"><button class="btn" id="pv" ' + (s.i === 0 ? 'disabled' : '') + '>← Anterior</button><span class="sp"></span><button class="btn" id="nx" ' + (s.i === s.ids.length - 1 ? 'disabled' : '') + '>Próxima →</button></div>' +
        '<p class="small mut">Dica de prova: elimine alternativas; deixe Raciocínio Lógico longo para o fim; reserve 15 min para conferir o cartão-resposta. Não há desconto de erro previsto no corpo do edital (conferir Anexo III).</p>';
      $app.innerHTML = h;
      Array.prototype.forEach.call($app.querySelectorAll('.opt'), function (b) { b.onclick = function () { s.resp[qu.id] = +b.getAttribute('data-k'); saveSim(s); draw(); }; });
      Array.prototype.forEach.call($app.querySelectorAll('[data-g]'), function (b) { b.onclick = function () { s.i = +b.getAttribute('data-g'); saveSim(s); draw(); }; });
      document.getElementById('clr').onclick = function () { delete s.resp[qu.id]; saveSim(s); draw(); };
      document.getElementById('mk').onclick = function () { s.marc[qu.id] = !s.marc[qu.id]; saveSim(s); draw(); };
      document.getElementById('pv').onclick = function () { s.i--; saveSim(s); draw(); };
      document.getElementById('nx').onclick = function () { s.i++; saveSim(s); draw(); };
      document.getElementById('fin').onclick = function () {
        var vazias = s.ids.filter(function (id) { return s.resp[id] == null; }).length;
        ask(vazias ? 'Há ' + vazias + ' questões em branco. Finalizar mesmo assim?' : 'Finalizar o simulado?', function () { finish(s); });
      };
    }
    draw();
    timerId = setInterval(function () { var t = document.getElementById('tm'); if (!t) return; var l = left(); t.textContent = fmt(l); if (l <= 0) { clearInterval(timerId); toast('Tempo esgotado!'); finish(s); } }, 1000);
  }
  function finish(s) {
    var acertos = 0;
    s.ids.forEach(function (id) {
      var q = qById(id), r = s.resp[id], ok = r === q.g;
      if (r != null) record(q, ok, r); /* em branco: conta como não acertada, sem entrar no caderno */
      if (ok) acertos++;
    });
    T.sim = null; S.retomar = null;
    var gasto = Math.min(s.dur, Math.round(s.dec != null ? s.dec : (Date.now() - s.ini) / 1000));
    var e = { dia: today(), total: s.ids.length, acertos: acertos, gasto: gasto, dur: s.dur, ids: s.ids.slice(), resp: s.resp, c: S.concurso, n: S.nivel };
    S.sims.push(e); save();
    saveSim(null);
    mostrarResultado(e, true);
  }
  /* Rever um simulado já feito (histórico) */
  function vSimRev(i) {
    var e = S.sims[+i];
    if (!e) return go('#/simulados');
    if (!e.ids) return resumoAntigo(e);
    mostrarResultado(e, false);
  }
  /* Simulados feitos antes de o site guardar as respostas: só há o resumo e os erros registrados no dia */
  function resumoAntigo(e) {
    var p = pct(e.acertos, e.total);
    var errosDia = Object.keys(S.erros).filter(function (id) { var q = qById(id); return q && visivel(q.m, q.t) && iso(new Date(S.erros[id].ts || 0)) === e.dia; });
    var h = '<p><a href="#/simulados">← Simulados</a></p><h1>Simulado de ' + brDate(e.dia) + '</h1><div class="card"><div class="stat">' + e.acertos + ' / ' + e.total + ' (' + p + '%)</div>' + bar(p) +
      '<p>' + (p >= 50 ? '<span class="pill ok">Acima dos 50% de nota mínima</span>' : '<span class="pill bad">Abaixo dos 50% de nota mínima</span>') + ' <span class="small mut">Tempo usado: ' + Math.round(e.gasto / 60) + ' min.</span></p></div>';
    h += '<div class="aviso">Este simulado foi feito antes de o site guardar as respostas, então não dá para mostrar questão por questão. Os próximos simulados ficam salvos por completo.</div>';
    if (e.porM) h += '<h2>Por matéria</h2><div class="card">' + Object.keys(e.porM).filter(function (m) { return mat(m); }).map(function (m) { var x = e.porM[m]; return '<div style="margin:.5rem 0"><div class="row"><b>' + esc(mat(m).nome) + '</b><span class="sp"></span>' + x.a + '/' + x.t + '</div>' + bar(pct(x.a, x.t), mat(m).cor) + '</div>'; }).join('') + '</div>';
    h += '<h2>Questões que você errou nesse dia</h2><p class="small mut" style="margin-top:-.3rem">Vêm do caderno de erros (simulados e treinos feitos em ' + brDate(e.dia) + ').</p>';
    if (!errosDia.length) h += '<div class="card">Nenhum erro registrado nesse dia.</div>';
    errosDia.forEach(function (id) {
      var q = qById(id), er = S.erros[id];
      h += '<div class="card"><div class="small mut">' + esc(mat(q.m).nome) + ' · ' + esc(topico(q.m, q.t).titulo) + '</div><p>' + esc(q.q) + '</p><p class="small">' + (er.minha != null ? 'Sua resposta: ' + LET[er.minha] + ') ' + esc(q.a[er.minha]) + '<br>' : '') + 'Gabarito: <b>' + LET[q.g] + ') ' + esc(q.a[q.g]) + '</b></p><div class="expl small">' + esc(q.e) + '</div>' +
        (C.x && C.x[q.id] ? '<details class="det-alts"><summary>Por que cada alternativa</summary>' + blocoAlternativas(q, er.minha) + '</details>' : '') + '</div>';
    });
    h += '<p><a class="btn pri" href="#/erros">Abrir caderno de erros</a> <a class="btn" href="#/simulados">Novo simulado</a></p>';
    $app.innerHTML = h; window.scrollTo(0, 0);
  }
  function mostrarResultado(e, novo) {
    var porM = {}, porT = {}, acertos = 0;
    e.ids.forEach(function (id) {
      var q = qById(id); if (!q) return;
      var ok = e.resp[id] === q.g; if (ok) acertos++;
      porM[q.m] = porM[q.m] || { a: 0, t: 0 }; porM[q.m].t++; if (ok) porM[q.m].a++;
      var kk = q.m + '/' + q.t; porT[kk] = porT[kk] || { a: 0, t: 0 }; porT[kk].t++; if (ok) porT[kk].a++;
    });
    var total = e.ids.length, gasto = e.gasto, p = pct(acertos, total);
    var h = (novo ? '' : '<p><a href="#/simulados">← Simulados</a></p>') + '<h1>' + (novo ? 'Resultado do simulado' : 'Simulado de ' + brDate(e.dia)) + '</h1>' + (!novo && e.c ? '<p class="small mut">' + esc(concInfo(e.c).nome + ' · ' + nomeNivel(e.n)) + '</p>' : '') + '<div class="card"><div class="stat">' + acertos + ' / ' + total + ' (' + p + '%)</div>' + bar(p) +
      '<p>' + (p >= 50 ? '<span class="pill ok">Acima dos 50% exigidos de nota mínima</span>' : '<span class="pill bad">Abaixo dos 50% de nota mínima</span>') + ' <span class="small mut">Tempo usado: ' + Math.round(gasto / 60) + ' min. A nota mínima de aprovação é 50% do total de pontos (edital 24/2026, item 10.1); a classificação depende também da linha de corte.</span></p></div>';
    var alvoQ = Math.ceil(total * metaNota() / 100), minQ = Math.ceil(total * 0.5);
    h += '<div class="card"><b>🎯 Rumo à aprovação</b><p style="margin:.3rem 0">' + (acertos >= alvoQ ? 'Você atingiu a sua meta (' + alvoQ + ' acertos).' : 'Faltaram <b>' + (alvoQ - acertos) + '</b> acerto(s) para a sua meta (' + alvoQ + ')' + (acertos < minQ ? ' e <b>' + (minQ - acertos) + '</b> para a nota mínima (' + minQ + ')' : '') + '.') + '</p><div class="row"><a class="btn pri" href="#/quiz?foco=1&n=10">Treinar pontos fracos agora</a>' + (e.dur ? '<button class="btn" id="sr-again">Refazer este simulado</button>' : '') + '</div></div>';
    h += '<h2>Por matéria</h2><div class="card">' + Object.keys(porM).map(function (m) { var x = porM[m]; return '<div style="margin:.5rem 0"><div class="row"><b>' + esc(mat(m).nome) + '</b><span class="sp"></span>' + x.a + '/' + x.t + '</div>' + bar(pct(x.a, x.t), mat(m).cor) + '</div>'; }).join('') + '</div>';
    var fracos = Object.keys(porT).filter(function (k) { return porT[k].a < porT[k].t; }).sort(function (a, b) { return pct(porT[a].a, porT[a].t) - pct(porT[b].a, porT[b].t); });
    h += '<h2>Tópicos para reforçar</h2><div class="card list">' + (fracos.length ? fracos.map(function (k) { var pp = k.split('/'); return '<a class="item" href="#/aula/' + pp[0] + '/' + pp[1] + '"><span style="flex:1">' + esc(topico(pp[0], pp[1]).titulo) + '</span><span class="small mut">' + porT[k].a + '/' + porT[k].t + '</span></a>'; }).join('') : '<p>Parabéns, nenhum erro!</p>') + '</div>';
    h += '<h2>Correção comentada</h2><p class="small mut">Toque em "Por que cada alternativa" para ver a explicação de todas as opções.</p>' + e.ids.map(function (id, n) {
      var q = qById(id); if (!q) return '';
      var r = e.resp[id], ok = r === q.g;
      return '<div class="card"><div class="row"><b>' + (n + 1) + '.</b> <span class="pill ' + (ok ? 'ok' : 'bad') + '">' + (r == null ? 'em branco' : ok ? 'acertou' : 'errou') + '</span><span class="sp"></span><span class="small mut">' + esc(mat(q.m).nome) + '</span></div><p>' + esc(q.q) + '</p><p class="small">Sua resposta: ' + (r == null ? '--' : LET[r] + ') ' + esc(q.a[r])) + '<br>Gabarito: <b>' + LET[q.g] + ') ' + esc(q.a[q.g]) + '</b></p><div class="expl small">' + esc(q.e) + '</div>' +
        (C.x && C.x[q.id] ? '<details class="det-alts"' + (ok ? '' : ' open') + '><summary>Por que cada alternativa</summary>' + blocoAlternativas(q, r) + '</details>' : '') + '</div>';
    }).join('');
    h += '<p><a class="btn pri" href="#/erros">Ver caderno de erros</a> <a class="btn" href="#/simulados">Novo simulado</a></p>';
    $app.innerHTML = h; window.scrollTo(0, 0);
    var ag = document.getElementById('sr-again');
    if (ag) ag.onclick = function () { saveSim({ ids: e.ids.slice(), resp: {}, marc: {}, i: 0, ini: Date.now(), dec: 0, dur: e.dur, fim: null }); go('#/simulado'); };
  }

  /* ---------- Caderno de erros ---------- */
  var MOT = { nao_sabia: 'Não sabia', confundi: 'Confundi', desatencao: 'Desatenção' };
  function vErros() {
    var ids = Object.keys(S.erros).filter(function (id) { return qById(id); });
    var abertos = ids.filter(function (id) { return !S.erros[id].res; });
    var h = '<h1>Caderno de erros</h1><p class="mut">Errou, anote o motivo e a regra. Refazer até acertar tira da lista.</p>';
    var cnt = {}; abertos.forEach(function (id) { var m = S.erros[id].motivo || 'sem'; cnt[m] = (cnt[m] || 0) + 1; });
    h += '<div class="card row"><b>' + abertos.length + ' abertos</b>' + Object.keys(cnt).map(function (m) { return '<span class="pill">' + (MOT[m] || 'Sem motivo') + ': ' + cnt[m] + '</span>'; }).join('') + '<span class="sp"></span>' + (abertos.length ? '<a class="btn sm pri" href="#/quiz?ids=' + abertos.slice(0, 20).join(',') + '&n=20">Refazer abertos</a>' : '') + '</div>';
    if (!ids.length) h += '<div class="card">Nenhum erro registrado ainda. Faça questões ou simulados!</div>';
    ids.sort(function (a, b) { return S.erros[b].ts - S.erros[a].ts; }).forEach(function (id) {
      var q = qById(id), e = S.erros[id];
      h += '<div class="card" style="' + (e.res ? 'opacity:.65' : '') + '"><div class="row small mut">' + esc(mat(q.m).nome) + ' · ' + esc(topico(q.m, q.t).titulo) + '<span class="sp"></span>' + (e.res ? '<span class="pill ok">resolvido</span>' : '<span class="pill bad">aberto</span>') + '</div><p>' + esc(q.q) + '</p><p class="small">Gabarito: <b>' + LET[q.g] + ') ' + esc(q.a[q.g]) + '</b></p><div class="expl small"><b>Regra:</b> ' + esc(q.e) + '</div>' + (C.x && C.x[q.id] ? '<details class="det-alts"><summary>Por que cada alternativa</summary>' + blocoAlternativas(q, e.minha) + '</details>' : '') +
        '<label class="small" for="mt-' + id + '">Motivo do erro</label><select data-mot="' + id + '"><option value="">Escolher...</option>' + Object.keys(MOT).map(function (m) { return '<option value="' + m + '"' + (e.motivo === m ? ' selected' : '') + '>' + MOT[m] + '</option>'; }).join('') + '</select>' +
        '<p><a class="btn sm" href="#/quiz?ids=' + id + '&n=1">Refazer</a> <a class="btn sm" href="#/aula/' + q.m + '/' + q.t + '">Ver aula</a></p></div>';
    });
    $app.innerHTML = h;
    Array.prototype.forEach.call($app.querySelectorAll('select[data-mot]'), function (s) { s.onchange = function () { S.erros[s.getAttribute('data-mot')].motivo = s.value; save(); }; });
  }

  /* ---------- Revisão espaçada ---------- */
  function vRevisao() {
    var all = revDue(), t = today();
    var h = '<h1>Revisão espaçada</h1><p class="mut">Cada tópico concluído volta após 1, 7 e 21 dias. Revisar é reler o resumo e refazer 5 questões.</p>';
    function bloco(titulo, arr) {
      if (!arr.length) return '';
      return '<h2>' + titulo + '</h2><div class="card">' + arr.map(function (x) {
        var p = x.k.split('/'), tp = topico(p[0], p[1]);
        return '<div class="chk"><div style="flex:1"><a href="#/aula/' + p[0] + '/' + p[1] + '"><b>' + esc(tp.titulo) + '</b></a><div class="small mut">' + esc(mat(p[0]).nome) + ' · revisão de ' + x.r.dias + ' dia(s) · ' + brDate(x.r.due) + '</div></div><a class="btn sm" href="#/quiz?m=' + p[0] + '&t=' + p[1] + '&n=5">5 questões</a><button class="btn sm ok" data-rk="' + x.k + '" data-ri="' + x.i + '">Feito</button></div>';
      }).join('') + '</div>';
    }
    var atras = all.filter(function (x) { return x.r.due < t; }), hoje = all.filter(function (x) { return x.r.due === t; }), prox = all.filter(function (x) { return x.r.due > t; }).slice(0, 10);
    h += bloco('Atrasadas', atras) + bloco('Hoje', hoje) + bloco('Próximas', prox);
    if (!all.length) h += '<div class="card">Nada agendado. Conclua uma etapa em uma aula para criar revisões.</div>';
    $app.innerHTML = h;
    Array.prototype.forEach.call($app.querySelectorAll('[data-rk]'), function (b) { b.onclick = function () { S.rev[b.getAttribute('data-rk')][+b.getAttribute('data-ri')].feito = true; save(); vRevisao(); }; });
  }

  /* ---------- Cronograma ---------- */
  var CRON = [
    { id: 'pre', nome: 'Pré: organizar', ini: '2026-10-10', fim: '2026-10-11', itens: ['Organizar o ambiente e horários de estudo', 'Ler o edital nº 24/2026 (item 9 provas, item 10 aprovação)', 'Verificar se tem direito a isenção da taxa (pedido previsto de 13 a 15/10, conferir)'] },
    { id: 's1', nome: 'Semana 1 · Volta 1', ini: '2026-10-12', fim: '2026-10-18', itens: ['Português: interpretação, classes, concordância (base)', 'Raciocínio Lógico: proposições e porcentagem (base)', 'Fazer a inscrição (abre 13/10; prazo até 11/11)'] },
    { id: 's2', nome: 'Semana 2 · Volta 1', ini: '2026-10-19', fim: '2026-10-25', itens: ['Completar Português (regência, crase, pontuação, ortografia, redação oficial)', 'Completar Lógica (equivalências, conjuntos, sequências)'] },
    { id: 's3', nome: 'Semana 3 · Volta 1', ini: '2026-10-26', fim: '2026-11-01', itens: ['Legislação: art. 37, servidores, LDB, Lei Orgânica/Estatuto, LAI', 'Conhecimentos Gerais: história e geografia de RO'] },
    { id: 's4', nome: 'Semana 4 · Volta 2', ini: '2026-11-02', fim: '2026-11-08', itens: ['Específicos parte 1 (secretaria, documentos, arquivo)', 'Primeiro simulado (sábado)'] },
    { id: 's5', nome: 'Semana 5 · Volta 2', ini: '2026-11-09', fim: '2026-11-15', itens: ['Específicos parte 2 (atendimento, patrimônio, informática)', 'Último dia de inscrição 11/11 e pagamento até 12/11 (conferir)'] },
    { id: 's6', nome: 'Semana 6 · Volta 2', ini: '2026-11-16', fim: '2026-11-22', itens: ['Cobrir lacunas apontadas pelo caderno de erros', 'Segundo simulado (sábado)'] },
    { id: 's7', nome: 'Semana 7 · Volta 3', ini: '2026-11-23', fim: '2026-11-29', itens: ['Simulados no horário real (9h15)', 'Revisão com resumos de 1 página'] },
    { id: 's8', nome: 'Semana 8 · Reta final SEMED', ini: '2026-11-30', fim: '2026-12-06', itens: ['Só questões, caderno de erros e resumos curtos', 'Conferir local, documento e caneta azul/preta (de tubo transparente)', 'PROVA SEMED: domingo 06/12, 9h15'] },
    { id: 's9', nome: 'Semana 9 · Reta final SEMUSA', ini: '2026-12-07', fim: '2026-12-13', itens: ['Ajustar para o cargo da SEMUSA (conferir Anexo IV do edital nº 25/2026)', 'PROVA SEMUSA: 13/12 (nível médio à tarde, 14h45) - conferir'] }
  ];
  function vCron() {
    var t = today();
    var h = '<h1>Cronograma</h1><p class="mut">Rotina semanal: seg Português · ter Lógica · qua Legislação · qui Específicos · sex revisão + Gerais · sáb simulado · dom caderno de erros. Datas: <b>conferir no edital oficial</b>.</p>' + (S.concurso !== 'semed' ? '<div class="aviso">Este cronograma usa a prova da <b>SEMED (06/12/2026)</b> como referência. Para ' + esc(concInfo(S.concurso).nome) + ', ajuste as semanas quando sair a data oficial.</div>' : '');
    CRON.forEach(function (w) {
      var atual = t >= w.ini && t <= w.fim;
      h += '<div class="card" style="' + (atual ? 'border-color:var(--pri);border-width:2px' : '') + '"><div class="row"><b>' + esc(w.nome) + '</b>' + (atual ? '<span class="pill">esta semana</span>' : '') + '<span class="sp"></span><span class="small mut">' + brDate(w.ini).slice(0, 5) + ' a ' + brDate(w.fim).slice(0, 5) + '</span></div>' +
        w.itens.map(function (it, k) { var key = w.id + '.' + k; return '<label class="chk" style="font-weight:400;margin:0"><input type="checkbox" data-c="' + key + '" ' + (S.cron[key] ? 'checked' : '') + '><span>' + esc(it) + '</span></label>'; }).join('') + '</div>';
    });
    $app.innerHTML = h;
    Array.prototype.forEach.call($app.querySelectorAll('[data-c]'), function (c) { c.onchange = function () { S.cron[c.getAttribute('data-c')] = c.checked; save(); }; });
  }

  /* ---------- Edital ---------- */
  function vEdital() {
    $app.innerHTML = '<h1>Edital e regras da prova</h1>' +
      (!estrConf() ? '<div class="aviso">Esta tela resume o cargo de <b>nível médio</b> da SEMED (edital 24/2026). Para a sua inscrição (' + esc(rotulo({ c: S.concurso, n: S.nivel })) + ', banca ' + esc(concInfo(S.concurso).banca) + '), consulte o Anexo I (cargos) e o Anexo IV (conteúdos) do edital: <b>A CONFIRMAR NO EDITAL</b>.</div>' : '') +
      '<div class="aviso">Informações do corpo do <b>Edital SEMED nº 24/2026</b> (lido em 10/10/2026) e de reportagens de 3º. O <b>Anexo IV (conteúdos) não consta nesse PDF</b>: baixe-o no site da banca e compare com a trilha. <b>Nada aqui substitui o edital oficial.</b></div>' +
      '<div class="card"><h3 style="margin-top:0">Links oficiais</h3><div class="res"><a target="_blank" rel="noopener" href="https://www.ibgpconcursos.com.br">Site da banca IBGP (inscrição, anexos, avisos)</a><a target="_blank" rel="noopener" href="https://dhg1h5j42swfq.cloudfront.net/2026/09/29180921/00-edital-concurso-porto-velho_semed_final.pdf">PDF do edital SEMED nº 24/2026 (corpo, sem anexos)</a></div></div>' +
      '<div class="card"><h3 style="margin-top:0">SEMED · Agente de Secretaria Escolar (nível médio)</h3><table>' +
      '<tr><th>Banca</th><td>IBGP</td></tr><tr><th>Prova objetiva</th><td>Domingo 06/12/2026, 9h15 (3 h), 50 questões, 5 alternativas, 1 correta</td></tr>' +
      '<tr><th>Distribuição</th><td>Português 10 · Raciocínio Lógico 10 · Legislação 10 · Específicos 15 · Gerais 5</td></tr>' +
      '<tr><th>Aprovação</th><td>No mínimo 50% do total de pontos (item 10.1)</td></tr>' +
      '<tr><th>Inscrições</th><td>13/10 a 11/11/2026 (pagamento até 12/11), R$ 90 nível médio - conferir</td></tr>' +
      '<tr><th>Remuneração</th><td>R$ 1.820,78 · 40 h semanais - conferir no Anexo I</td></tr>' +
      '<tr><th>Desempate</th><td>1º idoso (60+); 2º Específicos; 3º Português; 4º Legislação; 5º Raciocínio Lógico; 6º Gerais; 7º jurado; 8º idade maior (item 10.4)</td></tr></table></div>' +
      '<div class="card"><h3 style="margin-top:0">Regras do dia da prova (itens 9.3 e 9.2)</h3><ul><li>Caneta esferográfica <b>azul ou preta</b>, de corpo transparente.</li><li><b>Assinar</b> a Folha de Respostas (igual ao documento). Sem assinatura = eliminação.</li><li>Marque <b>uma</b> alternativa por questão; rasuras/emendas ou duas marcações anulam a questão.</li><li>Não amasse nem dobre a folha; não há substituição por erro do candidato.</li><li>Só pode sair definitivamente entregando a Folha de Respostas.</li><li>Não encontrei no corpo do edital desconto por erro: <b>confirmar no Anexo III</b>.</li></ul></div>' +
      '<div class="card"><h3 style="margin-top:0">Recursos (item 11)</h3><p>Fundamentado, sem identificação, até 3.000 caracteres, citando referência completa (capítulo e página). Questão anulada: ponto para todos.</p></div>' +
      '<div class="card"><h3 style="margin-top:0">Outros concursos</h3><ul><li><b>SEMUSA (IBGP)</b>: edital nº 25/2026, prova prevista para 13/12/2026 - conferir.</li><li><b>IPAM (IBADE)</b> e <b>SESAU-RO (IDECAN)</b>: sem edital confirmado até 10/10/2026. Acompanhe os sites das bancas.</li></ul></div>';
  }

  /* ---------- Mais / Config ---------- */
  function vMais() {
    $app.innerHTML = '<h1>Mais</h1><div class="card list">' + [['#/erros', '📓 Caderno de erros'], ['#/revisao', '🔁 Revisão espaçada'], ['#/cronograma', '📅 Cronograma'], ['#/resumo', '📚 Resumo do que estudei'], ['#/edital', '📄 Edital e regras da prova'], ['#/conta', '👤 Minha conta e sair']].concat(mostraAreaDono() ? [['#/dono', '🛡️ Área do dono']] : []).concat([ ['#/config', '⚙️ Ajustes e backup']]).map(function (x) { return '<a class="item" href="' + x[0] + '">' + x[1] + '</a>'; }).join('') + '</div>';
  }
  function vConfig() {
    $app.innerHTML = '<h1>Ajustes</h1><div class="card"><h3 style="margin-top:0">Meu cadastro</h3><p class="small mut" style="margin:0 0 .4rem">Conta: ' + esc(mostraLogin((usuarioAtual() || {}).login || '')) + ' · <a href="#/conta">Minha conta / sair</a></p><p class="small">' + esc(S.perfil.nome) + ' · ' + inscs().map(rotulo).map(esc).join(', ') + '</p><label for="nv">Estou estudando para</label><select id="nv">' + inscs().map(function (i, k) { return '<option value="' + k + '"' + (i.c === S.concurso && i.n === S.nivel ? ' selected' : '') + '>' + esc(rotulo(i)) + '</option>'; }).join('') + '</select><p class="small mut">Muda os tópicos, questões, simulado e apostilas. Seu progresso é mantido.</p><a class="btn sm" href="#/cadastro">✎ Editar cadastro / adicionar nível</a></div><div class="card"><h3 style="margin-top:0">Minha meta</h3><label for="mn">Meta de acertos na prova (%) - a nota mínima é 50%</label><input type="number" id="mn" min="50" max="100" value="' + metaNota() + '"><label for="mq">Questões por dia</label><input type="number" id="mq" min="5" max="200" value="' + (S.metaq || 30) + '"></div><div class="card"><label for="meta">Meta semanal (etapas concluídas por semana)</label><input type="number" id="meta" min="1" max="40" value="' + S.meta + '"></div>' +
      '<div class="card"><h3 style="margin-top:0">Backup do progresso</h3><p class="small mut">O progresso desta conta fica salvo neste aparelho. Para levar a outro (celular ↔ PC), exporte e importe o arquivo.</p><div class="row"><button class="btn" id="exp">⬇ Exportar</button><label class="btn" for="imp" style="margin:0">⬆ Importar</label><input type="file" id="imp" accept=".json,application/json" hidden></div></div>' +
      '<div class="card"><h3 style="margin-top:0">Apostilas em PDF</h3><div class="res">' + mats().map(function (m) { return '<a target="_blank" rel="noopener" href="pdf/apostila-' + S.nivel + '-' + m.id + '.pdf">' + esc(m.nome) + '</a>'; }).join('') + '<a target="_blank" rel="noopener" href="pdf/apostila-' + S.nivel + '-completa.pdf"><b>Apostila completa (' + esc(nvInfo().nome) + ')</b></a></div></div>' +
      '<div class="card"><h3 style="margin-top:0">Zerar tudo</h3><button class="btn" id="rst" style="color:var(--bad)">Apagar o progresso desta conta</button></div>';
    document.getElementById('nv').onchange = function (e) { var i = inscs()[+e.target.value]; setAlvo(i.c, i.n); save(); toast('Estudando: ' + rotulo(i)); vConfig(); };
    document.getElementById('mn').onchange = function (e) { S.metaNota = Math.min(100, Math.max(50, +e.target.value || 70)); save(); toast('Meta salva'); };
    document.getElementById('mq').onchange = function (e) { S.metaq = Math.min(200, Math.max(5, +e.target.value || 30)); save(); toast('Meta salva'); };
    document.getElementById('meta').onchange = function (e) { S.meta = Math.max(1, +e.target.value || 5); save(); toast('Meta salva'); };
    document.getElementById('exp').onclick = function () {
      var b = new Blob([JSON.stringify(S)], { type: 'application/json' }), a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = 'progresso-estudo-' + today() + '.json'; a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    };
    document.getElementById('imp').onchange = function (e) {
      var f = e.target.files[0]; if (!f) return; var r = new FileReader();
      r.onload = function () { try { var o = JSON.parse(r.result); if (typeof o !== 'object' || !o) throw 0; S = Object.assign(defaults(), o); save(); toast('Progresso importado'); route(); } catch (x) { toast('Arquivo inválido'); } };
      r.readAsText(f);
    };
    document.getElementById('rst').onclick = function () { ask('Apagar TODO o progresso desta conta? Isso não pode ser desfeito.', function () { S = defaults(); save(); saveSim(null); toast('Progresso apagado'); route(); }); };
  }

  /* ---------- Início ---------- */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    /* Se uma versão nova assumir o controle, recarrega uma vez para mostrar a versão mais recente */
    var tinhaSW = !!navigator.serviceWorker.controller, recarregou = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () { if (tinhaSW && !recarregou) { recarregou = true; location.reload(); } });
    navigator.serviceWorker.register('sw.js').then(function (r) { return r.update(); }).catch(function () { });
  }
  (function () { var sid = sessaoId(); if (sid && usuarios().some(function (u) { return u.id === sid; })) { UID = sid; contaCadastro(sid); carregar(); guardaRetomar(); applyTheme(); iniciaVisita(); } desenhaPill(); })();
  route();
  confirmarNivel();
  if (!document.querySelector('.modal')) oferecerRetomar();
})();
