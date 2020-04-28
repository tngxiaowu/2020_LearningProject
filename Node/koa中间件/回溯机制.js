var Koa = require('koa');
const app = new Koa();

// 中间件1
app.use( function *(next){
    if(this.url === '/wait'){
        return;
    }
    yield next;
})

app.use(function *(next){
    console.log('中间件1 before');
    yield next;
    console.log('中间件1 after');
})

app.use( function *(next){
    console.log('业务逻辑处理');
    this.body = 'hello world!'
})

app.listen(3000);

// 回形针实现
function  compose(middleware){
    return function(context,next){
        let index = -1;
        return dispatch(0);

        function dispatch(i){
            if(i < index) return Promise.reject( new Error(`next() called multiple times`));
            index = i;
            const fn = middleware[i] || next
            if(!fn) return Promise.resolve()
            
            try{
                return Promise.resolve(fn(context,function next(){
                    return dispatch(i+1);
                }))
            }catch(err){
                return Promise.reject(err);
            }
        }
    }
}

app.use( (ctx,next)=>{
    console.log(1);
    return next().then( ()=>{
        console.log(2);
    })


});


