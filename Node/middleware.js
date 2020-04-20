// koa v1
{

}

const  app = require('koa')();

app.use( function * middlewareLog(next){
    let start = new Date();
    yield next();
    let time = start - new Date();

})

app.use( function * responseMiddlerWare(){
    this.body = 'hello world';

})

app.listen( 3000);

// koa v2
// 普通函数中间件写法
app.use( (ctx,next )=>{
    const past = new Date();
    return next().then(  () =>{
        const gap = new Date - past;
        console.log('Middle Ware is Coming');
    })
})

// generator函数中间件写法
app.use( co.wrap( function *(ctx,next){
    const past = new Date();
    yield next();
    const ms = new Date() = past;
    console.log('YouHu');
}))

// async/await函数中间件写法 -> async相当于更高级的自带执行器的generator
app.use(async (ctx,next) => {
    const past = new Date();
    await next();
    const ms = new Date() - past;
    console.log('You Hou');
})


// 执行上下文对象

app.use( async (ctx,next) =>{
    ctx.body = 'hello world';
})

// app里面被注入了app.createServer的回调函数 核心实现就是app.callback()
app.createServer(app.callback()).listen(3000);

