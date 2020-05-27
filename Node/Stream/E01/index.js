const fs = require('fs');

const readStream = fs.createReadStream('./small.txt');

readStream.on( 'data',chunk =>{
    console.log(chunk.toString());
}) 

console.log( readStream);