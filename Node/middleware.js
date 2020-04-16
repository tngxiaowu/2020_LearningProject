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


