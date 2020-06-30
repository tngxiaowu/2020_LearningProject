const app = require('./app')
const koa = new ( require('koa'))
const mount = require('koa-mount')

// 针对配置项 遍历配置项
Object.keys(app).forEach( routePath => {
    // 挂载到ctx.body上
    koa.use(mount(routePath, async (ctx) => {
        ctx.status = 200;
        ctx.body = await app[routePath](ctx.query);
    } ) )

} )

koa.listen(3000);