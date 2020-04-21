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


{
    const context = require('./context');
    const response = require('./response');
    const request = require('./request');

    class Application extends Emitters {
        constructor(){
            this.context = Object.create(context);
            this.request = Object.create(request);
            this.response = Object.create(response);
        }

        callback() {
            const fn = compose(this.middleware);
        
            if (!this.listenerCount('error')) this.on('error', this.onerror);
        
            const handleRequest = (req, res) => {
              const ctx = this.createContext(req, res);
              return this.handleRequest(ctx, fn);
            };
        
            return handleRequest;
         }

         createContext(req, res) {
            const context = Object.create(this.context);
            const request = context.request = Object.create(this.request); // koa内置的request对象
            const response = context.response = Object.create(this.response); // koa内置的response对象
            context.app = request.app = response.app = this;
            context.req = request.req = response.req = req; // 原始Http回调函数中的req对象
            context.res = request.res = response.res = res; // 原始Http回调函数中的res对象
            request.ctx = response.ctx = context;
            request.response = response;
            response.request = request;
            context.originalUrl = request.originalUrl = req.url;
            context.state = {}; // 约定了一个中间件的公共存储空间
            return context;
          }
    }


    


    

}


