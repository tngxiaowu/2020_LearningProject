const net = require('net');

// 实例化一个socket
const socket = new net.socket({});


socket.connect({
    host:'127.0.0.1',
    prot:4000,
})

socket.write('Good Moring! Geek Bange');