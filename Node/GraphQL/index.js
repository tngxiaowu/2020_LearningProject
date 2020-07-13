const query = require('./request.js');
const Koa = require('koa');

// 前端将数据请求发给后端就好
query('hello').then( res =>{
    console.log( res )
} )

// 基于Koa封装的一个简单的koa=graphql服务
const app = new Koa(); 
app.use( async ctx =>{
    const res = await query(`{hello}`); 
    ctx.body = res;
})

