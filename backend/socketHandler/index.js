const { normNameSpaceSocketHander } = require('./norm_user');
const { io } = require('../serverSetup');

function createSocketHandlerOfAllNameSpace() {
	// console.log(io);
	// middleware of main namespace
	io.use((socket, next) => {
		console.log(`io middleware main namespace`);
		console.log(socket.handshake);
		next();
	});

	// handlers of main namespace
	io.on('connection', (socket) => {
		console.log(`a user connected id: ${socket.id}`);

		socket.use(([event, ...args], next) => {
			console.log('socket middleware');
			next();
		});

		socket.on('disconnect', () => {
			console.log('\n\n\n\nthoát ra nè byebye');
			console.log(`user out id: ${socket.id}`);
		});

		socket.on('test chat message', (msg, callBack) => {
			console.log('message: ' + msg);
			io.emit('test response message', ` reps: ${msg}`);
		});
	});

	// user socket namespace for normal user
	// const normUserNamespace = io.of('/norm_user');
	// socker hander for normal user namespace
	normNameSpaceSocketHander();
}

module.exports = { createSocketHandlerOfAllNameSpace };
