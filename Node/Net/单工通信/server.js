const net = require('net');
// 创建服务器
net.createServer( socket =>{
    // 读取数据
    socket.on('data', buffer =>{
        console.log(buffer,'buf');
        console.log(buffer.toString());
    })
})

net.listen(4000)