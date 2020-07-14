const  Mongoose =require('mongoose')

// 连接数据库
const db = Mongoose.connect('mongodb://127.0.0.1:27017')

// 定义模型
const Cat = Mongoose.model('Cat',{ name: String })

// 实例化一条数据
const KittyCat = new Cat( { name:'Kitty' } )

// 保存数据
KittyCat.save(err => {
    if(err) console.error('oppus',err)

    console.log('save success')
})



db.connection.on('err', (err)=>{
    console.log('数据库连接失败',err)
})

db.connection.on('open',()=>{
    console.log('数据库连接成功')
})