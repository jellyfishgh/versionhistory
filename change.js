const fs = require('fs');
const path = require('path');

var file = path.join(__dirname, process.argv[2]);
var extname = path.extname(file);
var basename = path.basename(file, extname);
var newFile = path.join(__dirname, `${basename}1${extname}`);

function start() {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;
        var nvs = [];
        const vs = JSON.parse(data);
        const kv = {
            "news": "新增",
            "optimizations": "优化",
            "bugs": "修复"
        }
        vs.map((v) => {
            var nv = { "contents": [] };
            for (let key in v) {
                if (!kv[key]) {
                    nv[key] = v[key];
                }
                else {
                    nv.contents.push({
                        "name": kv[key],
                        "items": v[key]
                    });
                }
            }
            nvs.push(nv);
        });
        fs.writeFile(newFile, JSON.stringify(nvs, censor, '    '), (err) => {
            if (err) throw err;
            console.log("created");
        });
    });
}

function censor(key, value) {
    if (value.length === 1 && value[0] === "") return [];
    else return value;
}

start();