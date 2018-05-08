const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
var alertSchema = new Schema({
    roomID: Number,
    count: Number,
    createdDate:{
        type: Date,
        default :Date.now
    }
})

const Alerts = mongoose.model('Alerts', alertSchema)
module.exports = Alerts