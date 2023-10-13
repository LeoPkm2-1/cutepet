const { norm_userHandler } = require('./norm_user');
function createSocketHandler(io) {
	io.use((socket, next) => {
		console.log(`io middleware`);
		console.log(socket.handshake);
		next();
	});

	// main namespace
	io.on('connection', (socket) => {
		console.log(`a user connected id: ${socket.id}`);

		socket.use(([event, ...args], next) => {
			console.log('socket middleware');
			next();
		});

		socket.on('disconnect', () => {
			console.log(`user out id: ${socket.id}`);
		});

		socket.on('chat message', (msg, callBack) => {
			console.log('message: ' + msg);
			callBack('ok');
			// io.emit('response message', ` reps: ${msg}`);
		});
	});

	// user namespace
	norm_user = io.of('/norm_user');
	norm_userHandler(norm_user, io);
}

module.exports = { createSocketHandler };
