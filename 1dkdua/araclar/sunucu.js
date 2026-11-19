// 1dkdua klasörünü yerel HTTP ile sunar (fontlar file:// altında CORS'a takılmasın diye)
const http = require('http'), fs = require('fs'), path = require('path');
const TUR = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.png': 'image/png' };
function sunucuBaslat(kok) {
  return new Promise(res => {
    const s = http.createServer((req, rsp) => {
      const p = path.join(kok, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!p.startsWith(kok) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { rsp.writeHead(404); return rsp.end(); }
      rsp.writeHead(200, { 'Content-Type': TUR[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(rsp);
    }).listen(0, '127.0.0.1', () => res({ port: s.address().port, kapat: () => s.close() }));
  });
}
module.exports = { sunucuBaslat };
