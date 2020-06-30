const cluster = require('cluster')
const os = require('os') // 获取cpu核数


if(cluster.isMaster){
    // 主进程代码
    // 启动三个子进程
    // 节省内存 但也提升了不少的性能
    for(let i = 0; i < os.cpus().length / 2; i++){
        // 空间换时间
        const worker = cluster.fork()
        let missingPing = 0

        // 心跳包发送
       let interal =  setInterval( ()=>{
            worker.send('ping')
            missingPing++;

            if(missingPing >= 3){
                // 杀死子进程
                process.kill(worker.process.pid)
                // worker.exit(1)
            }
        },3000 )

        worker.on('message',(msg) => {
            if(msg === 'pong'){
                missingPing--
                clearInterval(interal)
            }
        })
        cluster.fork()
        // 一旦进程杀死了 那么重新复制一个进程
        // 潜在危险: 如果进程死掉又重新开启 如此循环 那么就会导致
        // 占用内存过高 服务器死机也有可能
        cluster.on('exit', ()=>{
            setTimeout( ()=>{
                cluster.fork()
            },5000)
        })
    }
}else{
    // 子进程的情况下
    require('./app')
    // 捕捉子进程错误
    // 原则: 只进行错误上报 而不是让程序强行续命

    process.on('message', str => {
        if(str === 'ping'){
            process.send('pong')
        }
    })

    // 进程守护做的第一件事: 上报错误
    process.on('uncaughtException', (err,orign) => {
        // 可以上报错误
        // 或者 在 日志中 进行打印 

        process.exit(1)
    })
  
    // 内存监控
    setInterval( ()=>{
        if(process.memoryUsage().rss > 734003200  ){
            process.exit(1)
        }
    },5000)

}