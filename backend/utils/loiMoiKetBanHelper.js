const loiMoiKetBanModel = require("../models/loiMoiKetBanModel");

const getIdsOfReceiverInPendingAddFriendRequestOf = async (sender_id) => {
  const requestAddFriendList =
    await loiMoiKetBanModel.getAllPendingRequestHaveSendOfUser(sender_id);

  return requestAddFriendList.map((request) => parseInt(request.ma_nguoi_nhan));
};

const getIdsOfSenderInPendingAddFriendRequestTo = async (receiver_id) => {
  const requestAddFriendList =
    await loiMoiKetBanModel.getAllPendingRequestToUser(receiver_id);
  return requestAddFriendList.map((request) => parseInt(request.ma_nguoi_gui));
};

// (async function () {
//   const data = await getIdsOfSenderInPendingAddFriendRequestTo(3);
//   console.log(data);
// })();

module.exports = {
  getIdsOfReceiverInPendingAddFriendRequestOf,
  getIdsOfSenderInPendingAddFriendRequestTo,
};
