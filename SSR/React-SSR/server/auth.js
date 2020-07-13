module.exports = server =>{

    // 

    server.use(async (ctx,next)=>{
        const { path ='',method =''  } = ctx
        if(path === '/logout' && method === 'POST'){
            ctx.session = null
            ctx.body = 'logout success'
        }else{
            await next()
        }
    })

}   