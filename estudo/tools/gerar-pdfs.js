/* Gera as apostilas em PDF (pasta pdf/) a partir de print.html.
   Uso: node tools/gerar-pdfs.js   (precisa do pacote "playwright" e de um Chromium instalado)
   Rode a partir da pasta estudo/. */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const raiz = path.resolve(__dirname, '..');
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css' };
const srv = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
(async () => {
  await new Promise(r => srv.listen(0, r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const exe = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const ids = ['portugues', 'logica', 'legislacao', 'especificos', 'gerais', 'completa'];
  fs.mkdirSync(path.join(raiz, 'pdf'), { recursive: true });
  for (const nv of ['fundamental', 'medio', 'superior']) for (const id of ids) {
    const page = await browser.newPage();
    await page.goto(`${base}/print.html?nv=${nv}&m=${id === 'completa' ? 'all' : id}`);
    const pronto = await page.waitForSelector('body[data-ready="1"]', { timeout: 5000 }).catch(() => null);
    if (!pronto) { await page.close(); continue; } // matéria sem tópicos neste nível
    const out = path.join(raiz, 'pdf', `apostila-${nv}-${id}.pdf`);
    await page.pdf({ path: out, format: 'A4', margin: { top: '16mm', bottom: '16mm', left: '16mm', right: '16mm' }, printBackground: true, displayHeaderFooter: true,
      headerTemplate: '<span></span>', footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#666">Rota do Concurso · Porto Velho 2026 · página <span class="pageNumber"></span> de <span class="totalPages"></span></div>' });
    console.log('ok', out, fs.statSync(out).size);
    await page.close();
  }
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
