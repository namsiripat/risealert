'use strict'
const express		= require('express')
const app			= express()
const server		= require('http').Server(app)
const io			= require('socket.io')(server)
const mongoose      = require('mongoose')
const User = mongoose.model('Users')

exports.getStartPage = (req, res) => {
    res.sendFile(__dirname + '/index.html')
}

exports.getAllPatient = (req, res) => {
    let query = { sort: { name: 1 } }
    User.find({}, null, query, function(err, user){
        if(err) throw err
        res.json(user)
    })
}

exports.createNewPatient = (req, res) => {
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
    io.emit('accelData', object)
    setTimeout(function () {
        io.emit('accelData', {
            id: req.params.id,
            status: 'normal'
        })
    }, 11000)
    res.sendStatus(200)
}

io.on('connection', function (socket) {
    socket.on('accelData', function (data) {
        console.log(data)
    })
})