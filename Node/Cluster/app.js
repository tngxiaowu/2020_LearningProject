const http = require('http')


http.createServer( (req,res) => {
    setTimeout( ()=>{

    },2000)
    res.end('hello Node.JS')
})