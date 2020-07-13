const axios = require('axios')
const githubBaseUrl = `https://api.github.com`

module.exports = server =>{
    server.use( async (ctx,next)=>{
        const { path } = ctx;

        if(path.startsWith('/github')){
            const { githubAuth } = ctx.session
            const githubPath = `${githubBaseUrl}${ctx.url.replace('/github','/')}`
            
            const token = githubAuth && githubAuth.access_token

            const headers = {}
            if(token){
                headers['Authorization'] = `${githubAuth.token_type} ${token}`
            }

            try{
                const result = await axios({
                    method:'GET',
                    url: githubPath,
                    headers
                })

                if(result.status === 200){
                    ctx.body = res.data
                    ctx,set('content-type','application/json')
                }else{
                    ctx.body = {
                        success: false,
                    }
                    ctx,set('content-type','application/json')
                }

            }catch(e){
                console.error(err)
                ctx.body = {
                    success: false,
                }
                ctx,set('content-type','application/json')


            }


        }else{
            await next()
        }

    })
}