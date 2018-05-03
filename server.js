var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')
var os = require('os')

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')))

var interfaces = os.networkInterfaces()
var addresses = []
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2]
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address)
    }
  }
}

var accelData
var Room1

server.listen(3000, process.argv[2], function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening on %s:%s...', host, port)
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/accel/:id', function (req, res) {
  console.log(req.params.id)
  console.log(req.body)
  var object = {
    id: req.params.id,
    status: 'error'
  }
  io.emit('accelData', object)
  setTimeout(function () {
    io.emit('accelData', {
    id: req.params.id,
    status: 'normal'
  })}, 11000)
})

io.on('connection', function (socket) {
  socket.on('accelData', function (data) {
    console.log(data)
  })
})
