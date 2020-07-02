const Koa = require('koa')
const fs = require('fs')
const mount = require('koa-mount')
const static = require('koa-static')
const path = require('path')
const detailTemplate = require('./')
const rpcClient = require('./client')

const resolve =  dir  => {
    return path.resolve(__dirname,dir)
}

const app = new koa()

// 静态资源加载(css)
app,use(static(resolve('/source/')))

app.use(
    async (ctx,next) => {
        const result = await new Promise( (resolve,reject) =>{
            rpcClient.write( { columnId: ctx.query.columnId }, (err,data) =>{
                err ? reject(err) : resolve(data)
            })
        })
        ctx.status = 200;
        // 数据和模板相对应
        ctx.body = detailTemplate(result)
    }
)

app.listen(3000)