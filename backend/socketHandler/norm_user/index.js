const {socketAuthenMid} = require('../../middlewares/auth')
function norm_userHandler(namespace_instance, io_instance) {
  
  // authentication
  namespace_instance.use(socketAuthenMid);

	// listen on connection
	namespace_instance.on('connection', (socket) => {
		console.log(`norm user connected id: ${socket.id}`);

		// listen on disconnect
		socket.on('disconnect', () => {
			console.log(`norm_user out id: ${socket.id}`);
		});

		socket.on('chat message', (msg, callBack) => {
			console.log('message: ' + msg);
			callBack('SERVER OK');
			// io.emit('response message', ` reps: ${msg}`);
		});

    



	});
}

module.exports = { norm_userHandler };
