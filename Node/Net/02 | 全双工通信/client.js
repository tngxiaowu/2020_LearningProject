const lessonId = ['01','02'];

const net = require('net');
// 实例化一个socket
const socket = new net.socket({});

let id = Math.floor(Math.random() * lessonId.length );


let buffer; // 创建一个Buffer

socket.connect({
    host:'127.0.0.1',
    prot:4000,
})

setInterval(()=>{
    socket.write(encode[id]);
})

// 客户端拿到服务端的数据后重新打印
socket.on('data', buffer => {
    const seqBuffer = buffer.slice(0,2);
    const titleBuffer = buffer.slice(2); 
    id = Math.floor(Math.random() * lessonId.length );
    // 读取到数据后 再不停地发送
    socket.write(encode(id));
})

let seq = 0;

function encode(id){
    buffer = Buffer.alloc(6);
    buffer.writeInt16BE(seq);
    buffer.writeInt32BE(lessonId[id],2); 
    seq++;
    return buffer;

}