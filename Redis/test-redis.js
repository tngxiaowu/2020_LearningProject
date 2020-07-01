(async () =>{
    const  Redis = require('ioredis')
    // 核心数据库：连接数据库
    const redis = new Redis({
        port: 6378
    })
  const keys = await redis.keys('*')
  console.log(keys,'key')
})()