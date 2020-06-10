const query = require('./request.js');
const Koa = require('koa');

// query('hello').then( res =>{
//     console.log( res )
// } )

// 基于Koa封装的一个简单的koa=graphql服务
const app = new Koa(); 
app.use( async ctx =>{
    const res = await query(`{hello}`); 
    ctx.body = res;
})

