const laBanBeModel = require("../models/laBanBeModel");

async function haveFriendShipBetween(idUser_1, idUser_2) {
  const data = await laBanBeModel.friendShipInforBetween(idUser_1, idUser_2);
  return data.payload.length > 0;
}

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



module.exports = {
  haveFriendShipBetween,
  getFriendsIdInListOfUserId,
};
