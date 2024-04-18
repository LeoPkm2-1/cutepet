const { socketAuthenMid } = require("../../middlewares/auth");
const socketHelper = require("./../../utils/socketHelper");
const { io } = require("../../serverSetup");
const normUserNamespace = io.of("/norm_user");
const { markUserOnline } = require("./../../controllers/loginController");
const { markUserOffline } = require("./../../controllers/logoutController");

function normNameSpaceSocketHander() {
  // authentication
  normUserNamespace.use(socketAuthenMid);

  // listen on connection
  normUserNamespace.on("connection", (socket) => {
    // join private room
    const private_room_name = socketHelper.getPrivateRoomNameOfUser(
      socket.auth_decoded.ma_nguoi_dung
    );
    socket.join(private_room_name);

    // handle when user connect
    markUserOnline(socket.auth_decoded.ma_nguoi_dung, normUserNamespace);

    // listen on disconnect
    socket.on("disconnect", () => {
      // handle when user out socket
      markUserOffline(socket.auth_decoded.ma_nguoi_dung, normUserNamespace);
      console.log(`norm_user out id: ${socket.id}`);
    });

    // ============================== test event ==============================
    socket.on("test chat message", (msg, callBack) => {
      console.log("message: " + msg);
      callBack("SERVER OK");
      normUserNamespace
        .in(private_room_name)
        .emit("TEST_ROOM_1", "biết tui hông? ahihi 123");

      // io.emit('TEST_ROOM_1', 'biết tui hông');
      // io.emit('test response message', ` reps: ${msg}`);
    });
  });

  // ============================== test room event ==============================
  normUserNamespace.adapter.on("create-room", (room) => {
    console.log("create-room:", room);
  });

  normUserNamespace.adapter.on("delete-room", (room) => {
    console.log("delete-room:", room);
  });

  normUserNamespace.adapter.on("join-room", (room, id) => {
    console.log(`socket: ${id} has joined room: ${room}`);

    // console.log('adapter.rooms:');
    // console.log(normUserNamespace.adapter.rooms);
    // console.log('adapter.sids:');
    // console.log(normUserNamespace.adapter.sids);
  });

  normUserNamespace.adapter.on("leave-room", (room, id) => {
    console.log(`socket: ${id} has leave-room room: ${room}`);
  });
}

module.exports = { normNameSpaceSocketHander, normUserNamespace };
