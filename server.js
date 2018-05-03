const express		= require('express')
const app			= express()
const bodyParser	= require('body-parser')
const server		= require('http').Server(app)
const io			= require('socket.io')(server)
const path			= require('path')
const os			= require('os')
const mongoose		= require('mongoose')

const userModel = require('./models/user');
const User			= mongoose.model('Users')

// connect to database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/patient', (err) => {
    if (err) throw err
    console.log('Successfully connected.')
})

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

let interfaces = os.networkInterfaces()
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

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html')
})

app.get('/patient', function (req, res) {
    var query = { sort: { name: 1 } }
    User.find({}, null, query, function(err, user){
        if(err) throw err
        //console.log(user)
        res.json(user)
    })
})

app.post('/register', function (req, res) {
	var newUser = new User(req.body)
	newUser.save(function(err, user){
		if(err) throw err
		res.json(user)
	})
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
		})
	}, 11000)
})

io.on('connection', function (socket) {
	socket.on('accelData', function (data) {
		console.log(data)
	})
})

server.listen(3000, process.argv[2], function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Server listening on %s:%s...', host, port)
})