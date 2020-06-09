const data = {
    '01' : '课程介绍',
    '02' : '内容综述'
   }
   
   const net = require('net');
   // 创建服务器
   const server =  net.createServer( socket =>{
       // 读取数据
       socket.on('data', buffer =>{
        const seqBuffer = buffer.slice(0,2); // 截取buffer前两位
        const lessonId = buffer.readInt32BE(2);  // 读取ID
        // 写ID
        setTimeout(()=>{
            const buffer = Buffer.concat([
                seqBuffer,
                Buffer.from(data[lessonId])
            ])   
            socket.write(buffer)
           },1000 )
       })
   })
   
   server.listen(4000)