const cp = require('child_process'); // 子进程任务

// 可以将一些任务分配给子进程
const child_process =  cp.fork(__dirname + './child.js');

child_process.send('haha');

child_process.on( 'message', str =>{
    console.log( 'child',str);
} )