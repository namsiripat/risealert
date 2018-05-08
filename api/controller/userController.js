'use strict'
const mongoose      = require('mongoose')
const User          = mongoose.model('Users')
const Alert         = mongoose.model('Alerts')

exports.getIndex = (req, res) => {
    res.sendFile(__dirname + '/index.html')
}

exports.getPatient = (req, res) => {
    let query = { sort: { name: 1 } }
    User.find({}, null, query, function(err, user){
        if(err) throw err
        res.json(user)
    })
}

exports.createPatient = (req, res) => {
    User.findOneAndUpdate(
        { roomID: req.body.roomID },
        { $set: req.body },
        (err, doc) => {
            if (doc === null) {
                let newUser = new User(req.body)
                newUser.save(function(err, user){
                    if(err) throw err
                    res.status(200).json(user)
                })
            } else {
                res.json(doc)
            }
        }
    )
}

exports.getSocketConnection = (req, res) => {
    let object = {
        id: req.params.id,
        status: 'error'
    }
    global.io.emit('accelData', object)
    setTimeout(function () {
        global.io.emit('accelData', {
            id: req.params.id,
            status: 'normal'
        })
    }, 11000)
    Alert.findOneAndUpdate({
        roomID: req.params.id
    }, {
        $inc: {
            count: 1
        }
    }, (err, data) => {
        if (data === null) {
            let alert = new Alert({
                roomID: req.params.id,
                count: 1
            })
            alert.save(function(err, user){
                if(err) throw err
                console.log(user)
                // res.status(200).json(user)
            })
        }
    })
    res.sendStatus(200)
}

exports.getAlert = (req, res) => {
    let query = { sort: { roomID: 1 } }
    Alert.find({}, null, query, function(err, alert){
        if(err) throw err
        res.json(alert)
    })
}