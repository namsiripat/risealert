const express		= require('express')
const app			= express()
const server		= require('http').Server(app)
const io			= require('socket.io')(server)
const bodyParser	= require('body-parser')
const path			= require('path')
const mongoose		= require('mongoose')

// eslint-disable-next-line
const userModel     = require('./api/models/userModel')
// eslint-disable-next-line
const alertModel     = require('./api/models/alertModel')

global.io = io
io.on('connection', function (socket) {
    socket.on('accelData', function (data) {
        console.log(data)
    })
})

// connect to database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/patient', (err) => {
    if (err) throw err
    console.log('Successfully connected.')
})

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

const routes = require('./api/routes/userRoute')
routes(app)

server.listen(3000, process.argv[2], function () {
    let host = server.address().address
    let port = server.address().port
    console.log('Server listening on %s:%s...', host, port)
})