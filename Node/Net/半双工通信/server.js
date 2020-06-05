const data = {
 136797:'01 | 课程介绍',
 136798:'02 | 内容综述'


}




const net = require('net');
// 创建服务器
net.createServer( socket =>{
    // 读取数据
    socket.on('data', buffer =>{
        // 读取ID
       const lessonId = buffer.readInt32BE();
        // 写ID

        setTimeout(  ()=>{
            buffer.write(Buffer.from(data[lessonId]))
        },1000 )
       
    })
})

net.listen(4000)