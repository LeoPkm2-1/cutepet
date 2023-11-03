const userHelper = require("../utils/userHelper");
const friendEventStructure = require("./../socketHandler/norm_user/friendEventStructure");
const friendNotificationModel = require("./../models/thongbao/friend");
const userOnlineModel = require("../models/UserOnline/userOnlineModel");
const socketHelper = require("./../utils/socketHelper");
const { normUserNamespace } = require("../socketHandler/norm_user");

const notifyRequestAddFriend = async (
  userRequest_id,
  recipient_id,
  requestAt = new Date()
) => {
  const requestUser = await userHelper.getUserPublicInforByUserId(
    userRequest_id
  );
  const recipient = await userHelper.getUserPublicInforByUserId(recipient_id);

  //  1. store notification to data base
  const EventInfor = new friendEventStructure.RequestAddFriendEvent(
    requestUser,
    recipient,
    requestAt
  );
  await friendNotificationModel.addRequestAddFriendNotification(
    recipient_id,
    EventInfor
  );

  const isRecipientOnline = await userOnlineModel.isUserOnline(recipient_id);
  //   2. send notification through socket to recipient
  if (isRecipientOnline) {
    const socketNameOfRecipient =
      socketHelper.getPrivateRoomNameOfUser(recipient_id);

    normUserNamespace
      .to(socketNameOfRecipient)
      .emit(
        friendEventStructure.RequestAddFriendEvent.getEventName(),
        EventInfor
      );
  }
};

const notifyAcceptAddFriend = async (
  userAccept_id,
  request_user_id,
  acceptAt = new Date()
) => {
  const acceptUser = await userHelper.getUserPublicInforByUserId(userAccept_id);
  const requestUser = await userHelper.getUserPublicInforByUserId(
    request_user_id
  );

  // 1. store notification to data base
  const EventInfor = new friendEventStructure.AcceptAddFriendEvent(
    acceptUser,
    requestUser,
    acceptAt
  );

  await friendNotificationModel.addAcceptAddFriendNotification(
    request_user_id,
    EventInfor
  );

  const isRequestUserOnline = await userOnlineModel.isUserOnline(
    request_user_id
  );

  if (isRequestUserOnline) {
    const socketNameOfRequestUser =
      socketHelper.getPrivateRoomNameOfUser(request_user_id);

    normUserNamespace
      .to(socketNameOfRequestUser)
      .emit(
        friendEventStructure.AcceptAddFriendEvent.getEventName(),
        EventInfor
      );
  }
};

module.exports = { notifyRequestAddFriend, notifyAcceptAddFriend };
