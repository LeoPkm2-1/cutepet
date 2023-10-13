const { socketAuthenMid } = require('../../middlewares/auth');
const socketHelper = require('./../../utils/socketHelper');
function norm_userHandler(namespace_instance, io_instance) {
	// authentication
	namespace_instance.use(socketAuthenMid);

	// listen on connection
	namespace_instance.on('connection', (socket) => {
		console.log(`norm user connected id: ${socket.id}`);
		console.log(socket.auth_decoded);

		socket.join(
			socketHelper.getPrivateRoomNameOfUser(socket.auth_decoded.ma_nguoi_dung)
		);

		// listen on disconnect
		socket.on('disconnect', () => {
			console.log(`norm_user out id: ${socket.id}`);
		});

		socket.on('chat message', (msg, callBack) => {
			console.log('message: ' + msg);
			callBack('SERVER OK');
			namespace_instance.emit('TEST_ROOM_1', 'biết tui hông');

			// io_instance.emit('TEST_ROOM_1', 'biết tui hông');
			// io.emit('response message', ` reps: ${msg}`);
		});
	});

	// ============================== test room event ==============================
	namespace_instance.adapter.on('create-room', (room) => {
		console.log('create-room:', room);
	});

	namespace_instance.adapter.on('delete-room', (room) => {
		console.log('delete-room:', room);
	});

	namespace_instance.adapter.on('join-room', (room, id) => {
		console.log(`socket: ${id} has joined room: ${room}`);

		console.log('adapter.rooms:');
		console.log(namespace_instance.adapter.rooms);
		console.log('adapter.sids:');
		console.log(namespace_instance.adapter.sids);
	});

	namespace_instance.adapter.on('leave-room', (room, id) => {
		console.log(`socket: ${id} has leave-room room: ${room}`);
	});
}

module.exports = { norm_userHandler };
