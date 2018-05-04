const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
var userSchema = new Schema({
    roomID: Number,
    age: Number,
    name: String,
    surname: String,
    disease: String,
    doctor: String,
    sex: String,
    createdDate:{
        type: Date,
        default :Date.now
    }
})

const  User = mongoose.model('Users', userSchema)
module.exports = User