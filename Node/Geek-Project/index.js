const Koa = require('koa')
const fs = require('fs')
const mount = require('koa-mount')
const static = require('koa-static')
const path = require('path')

const resolve =  dir  => {
    return path.resolve(__dirname,dir)
}

const app = new koa()

// 静态资源加载(css)
app,use(
    static(resolve('/source/'))
)

// 路由中间件
// 可以把koa作为实例输出
app.use( 
    mount('/', async(ctx) => {
        ctx.body = fs.readFileSync(resolve('/source/index.html'),'utf-8')
    } )
)

app.listen(3000)