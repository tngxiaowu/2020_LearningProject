const next = require('next')
const server = new (require('koa'))
const Router = require('koa-router')
const dev = process.env.NODE_ENV !== 'production'
const session = require('koa-session')
const Redis = require('ioredis')

const RedisSessionStore = require('../server/session')
const redis = new Redis()

const app = next({ dev })
const handler = app.getRequestHandler() // nextjs作为中间件

const api = require('./server/api')

app.prepare().then( ()=>{
    const router = new Router()

    server.keys = ['Jockey Develop Github App']
    const SESSION_CONFIG = {
        key: 'jid',
        store:  new RedisSessionStore(redis),// 用来连接数据库
    }

    server.use(session(SESSION_CONFIG,server))

    api(server)

    // session()所做的事
    // server.use( ctx =>{
    //     // 判断ctx.cookies是否存在
    //     if(ctx.cookies.get('jid')){
            
    //         ctx.session = {}
    //     }
    //     await next()
    //     // 根据ctx.session去设置cookie
    //     ctx.cookies.set()

    // })

    server.use(async(ctx,next) =>{
    //    if(!ctx.session.user){
    //        ctx.session.user = {
    //         name:'jockey',
    //         age: 18
    //        }
    //    }else{
          
    //    }
    console.log(`session is ${ctx.session}`)

        await next()
    })

    router.get('/set/user', async ctx =>{
        ctx.session = {
            name:'laowang',
            age: 18
        }
        ctx.body = 'set session success'
    } )

    router.get('/test/:id',async (ctx) => {
        ctx.cookies.set('id','userId:xxxxx',{
            httpOnly: true
        })
        const { id } = ctx.params;

        await handler(ctx.req,ctx.res,{
            pathName:'/test',
            query:{
                id
            }
        })
        // 如果不设置为false,那么Koa会在执行完中间件后根据ctx.body的内容默认写页面内容 
        ctx.respond = false
    })
    server.use(router.routes())

  

    


}).listen(3000)