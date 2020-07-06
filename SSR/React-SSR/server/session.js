function getRedisSession(sid){
    return `ssid:${sid}`
}


class RedisSessionStore {
    constructor(client){
        this.client = client
    }

    // 获取Redis中存储的session数据
    async get(id){
        const sid = getRedisSession(id) 
        let data = await this.client.get(sid)
        if(!data){
            return null
        }
        try{
            const result = JSON.parse(data)
            return result
        }catch(e){
            console.error(e)
        }

    }

    async set(id,ttl,value){
        const sid = getRedisSession(id)

        if(typeof ttl === 'number'){
            ttl = Math.ceil(ttl/1000)
        }

        try{
            const sessStr = JSON.stringify(value)

            if(ttl){
                await this.client.setex(sid,ttl,value)
            }else{
                await this.client.set(sid,value)
            }

        }catch(e){
            console.error(e)
        }
    }

    async destory(id){
        const sid = getRedisSession(id)
        await this.client.del(sid)

    }
}

module.exports = RedisSessionStore