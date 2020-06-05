const lessonId = ['',''];

const net = require('net');
// 实例化一个socket
const socket = new net.socket({});

// 创建一个Buffer
let buffer = Buffer.alloc(4);
let index = Math.floor(Math.random() * lessonId.length );
buffer.writeInt32BE(lessonId[index]); 

socket.connect({
    host:'127.0.0.1',
    prot:4000,
})

socket.write(buffer);

// 客户端拿到服务端的数据后重新打印
socket.on('data', buffer => {
    console.log(  lessonId[index],buffer.toString())
    // 读取到数据后 再不停地发送
    buffer = Buffer.alloc(4);
    index = Math.floor(Math.random() * lessonId.length );
    uffer.writeInt32BE(lessonId[index]); 
    socket.write(buffer);
})