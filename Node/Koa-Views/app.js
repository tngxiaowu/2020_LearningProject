const views = require('koa-views');
const Koa = require('koa');
const app = new Koa();

app.use( views(__dirname+'./views',{
    extension: 'pug'
}))

// 使用ctx.render
app.use( async(ctx,next) =>{
    ctx.render('index',{title:'Hello Koa V2'})
})
