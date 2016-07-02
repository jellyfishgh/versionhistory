const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const mime = require('mime');

const hostname = '127.0.0.1', port = 3000;

const server = http.createServer((req, res) => {
    const urlObject = url.parse(req.url);
    const pathname = urlObject.path === '/' ? '/history.html' : urlObject.pathname;
    const file = path.join(__dirname, path.normalize(pathname.replace(/\.\./g, '')));
    fs.access(file, fs.R_OK, (err) => {
        if (err) errHandler(res, 404, '你访问的页面不存在。');
        else fs.stat(file, (err, stats) => {
            if (!stats.isFile()) errHandler(res, 403, '非法请求。');
            else {
                res.writeHead(200, {
                    'Content-Type': `${mime.lookup(file)};charset=utf-8`
                });
                fs.createReadStream(file).pipe(res);
            }
        });
    });
});

function errHandler(res, code, msg) {
    res.writeHead(code, {
        'Content-Length': Buffer.byteLength(msg),
        'Content-Type': 'text/plain;charset=utf-8'
    });
    res.end(msg);
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

