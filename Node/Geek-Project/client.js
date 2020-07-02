const EasySock = require('easy_sock') // node中用于双工通信的模块

const protobuf = require('protocol-buffers') // 二进制协议
const fs = require('fs')
const { dirname } = require('path')

const schemas = protobuf(fs.readFileSync(`${__dirname}/detail-service/proto/detail.proto`))

const easySock = new EasySock({
    ip:'127.0.0.1',
    port: 4000,
    timeout: 500, // 超时
    keepAlive: true, // 双工通信开启
})

// 请求包的编码
easySock.encode = function(data,seq){
    const body = schemas.ColumnRequest.encode(data)
    
    const head = Buffer.alloc(8)
    head.writeInt32BE(seq)
    head.writeInt32BE(body)

    return Buffer.concat([head,body])

}

// 请求包的解码
easySock.decode = function(buffer){
    const seq = buffer.readInt32BE()
    const body = schemas.ColumnResponse.decode(buffer.slice(8))

    return {
        result: body,
        seq
    }
}

easySock.isReceiveComplete = function(){

}

module.exports = easySock