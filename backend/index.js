const express = require('express');
const { join } = require('node:path');

const { createSocketHandlerOfAllNameSpace } = require('./socketHandler/index');
const { app, server, io } = require('./serverSetup');

var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./routes/index');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
// static file.
app.use(express.static('public'));
app.use(express.static('test_socket/js'));
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
	// res.header(
	// 	"Access-Control-Allow-Headers",
	// 	"Origin, X-Requested-With, Content-Type, Accept"
	// );
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
	);
	next();
});

app.use('/', router);
app.get('/', (req, res) => {
	res.send('xin chao');
});
app.get('/test_socket', (req, res) => {
	res.status(200).sendFile(join(__dirname, 'test_socket', 'test_socket.html'));
});

// create socket io handler for all namespace
createSocketHandlerOfAllNameSpace();

// set port
const PORT = 3000;
server.listen(PORT, function () {
	console.log(`Node app is running on port ${PORT}`);
});
