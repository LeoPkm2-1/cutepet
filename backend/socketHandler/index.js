

function createSocketHandler(io) {
  io.on('connection', (socket) => {
    console.log(`a user connected id: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`user disconnected id: ${socket.id}`);
    });

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('response message',` reps: ${msg}`);
    } );
  });
}



module.exports = {createSocketHandler};