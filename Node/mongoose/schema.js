const Mongoose = require('mongoose')

let userSchema = new Mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
})

const UserModel = Mongoose.model('User',userSchema)

module.exports = UserModel