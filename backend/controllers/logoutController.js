const { Response } = require("./../utils");
const { deleteUserToken } = require("./../models/userModel");
const userOnlineModel = require("../models/UserOnline/userOnlineModel");
const laBanBeModel = require("./../models/laBanBeModel");
const socketHelper = require("./../utils/socketHelper");

const handleLogout = async (req, res) => {
  await deleteUserToken(req.auth_decoded.ma_nguoi_dung);
  res.status(200).send(new Response(200, [], "đăng xuất thành công"));
};

const markUserOffline = async (user_id, socketToSend) => {
  // update online infor when user offline
  await userOnlineModel.setOnlineStatusForUser(user_id, false);
  const onlineStatus = await userOnlineModel
    .getOnlineStatusOfUser(user_id)
    .then((data) => data.payload);
  // skip notify if user is still online in other devices
  if (onlineStatus.isOnline && onlineStatus.numOfDevices >= 1) return;
  // get friend list of user who are online at current
  const friendListIds = await laBanBeModel
    .getAllFriendIdsOfUser(user_id)
    .then((data) => data.payload.map((friend) => friend.friend_id));
  const friendOnlineIdList = await userOnlineModel
    .getOnlineUsersByListIds(friendListIds)
    .then((data) => data.payload.map((userOnline) => userOnline.userId));
  // send notification to friend online
  const socketNameOfFriends = friendOnlineIdList.map((id) =>
    socketHelper.getPrivateRoomNameOfUser(id)
  );
  const socketOfFriends = socketNameOfFriends.reduce(
    (acc, room_name) => acc.to(room_name),
    socketToSend
  );
  socketOfFriends.emit("USER_IS_OFFLINE", { user_id: user_id });
};

module.exports = {
  handleLogout,
  markUserOffline,
};
