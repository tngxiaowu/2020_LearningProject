const  Mongoose =require('mongoose')
const db = Mongoose.connect('mongodb://127.0.0.1:27017')

db.connection.on('err', (err)=>{
    console.log('数据库连接失败',err)
})

db.connection.on('open',()=>{
    console.log('数据库连接成功')
})