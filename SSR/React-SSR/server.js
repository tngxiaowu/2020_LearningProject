const next = require('next')
const server = new require('koa')
const Router = require('koa-router')
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = app.getRequestHandler() // nextjs作为中间件

app.prepare().then( ()=>{
    const router = new Router()
    router.get('/test/:id',async (ctx) => {
        const { id } = ctx.params;
        await handler(ctx.req,ctx.res,{
            pathName:'/test',
            query:{
                id
            }
        })
        ctx.respond = false
    })
    server.use(router.routes())
}).listen(3000)