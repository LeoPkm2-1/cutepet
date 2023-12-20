const laBanBeModel = require("../models/laBanBeModel");

async function haveFriendShipBetween(idUser_1, idUser_2) {
  const data = await laBanBeModel.friendShipInforBetween(idUser_1, idUser_2);
  return data.payload.length > 0;
}

// (async function () {
//   const isFriend = await haveFriendShipBetween(3,1);
//   console.log({isFriend});
// })()

async function getFriendsIdInListOfUserId(yourId, list_Userids) {
  const data = await Promise.all(
    list_Userids.map(async (userId) => {
      const isFriend = await haveFriendShipBetween(yourId, userId);
      return { id: userId, isFriend: isFriend };
    })
  );
  return data
    .filter((user) => {
      return user.isFriend;
    })
    .map((user) => user.id);
}

async function getNumOfFriendOfUser(user_id) {
  user_id = parseInt(user_id);
  const data = await laBanBeModel
    .getAllFriendIdsOfUser(user_id)
    .then((data) => data.payload);
  // console.log(data);
  return data.length;
}

const getListFriendIdsOfUser = async (user_id) => {
  const friendList = await laBanBeModel
    .getAllFriendShipOfUser(user_id)
    .then((data) => data.payload);
  // console.log(friendList);
  if (friendList.length <= 0) return [];
  const friend_ids = friendList.map((friend) =>
    parseInt(friend.ma_nguoi_dung_2)
  );
  return friend_ids;
};

module.exports = {
  haveFriendShipBetween,
  getFriendsIdInListOfUserId,
  getNumOfFriendOfUser,
  getListFriendIdsOfUser,
};
