// const fs = require('fs');

// const readStream = fs.createReadStream('./small.txt');

// readStream.on( 'data',chunk =>{
//     console.log(chunk.toString());
// }) 

// console.log( readStream);

const fs = require('fs');
const readStream = fs.createReadStream('./small.txt');

console.log(readStream._readableState.flowing,'b'); //判断是否处于流动模式, null

readStream.pipe(process.stdout);

console.log(readStream._readableState.flowing,'a'); // true