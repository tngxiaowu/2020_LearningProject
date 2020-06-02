const fs = require('fs');
const protoBuf = require('protocol-buffers');


const schema = protoBuf(fs.readFileSync(__dirname + './schema.txt','utf-8'));

const buffer = schema.Column.encode({
    id:1,
    name:'Node.js',
    price: 80.4
}) // 编码

schema.Column.decode(buffer); // 解码