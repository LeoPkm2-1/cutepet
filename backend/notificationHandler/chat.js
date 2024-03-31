const { normUserNamespace } = require("../socketHandler/norm_user");
const socketHelper = require("./../utils/socketHelper");
const userOnlineModel = require("../models/UserOnline/userOnlineModel");
const { Message } = require("../models/chat/chatComposStructure");

const notifySendingMessage = async (messageObject) => {
  const {
    senderID,
    receiverID,
    messageType,
    messageContent,
    createAt,
    isSeen,
  } = messageObject;

  const isReceiverOnline = await userOnlineModel.isUserOnline(receiverID);
  console.log({ isReceiverOnline });
  if (isReceiverOnline) {
    const socketNameOfRecipient =
      socketHelper.getPrivateRoomNameOfUser(receiverID);
    //   console.log({socketNameOfRecipient});
    normUserNamespace
      .to(socketNameOfRecipient)
      .emit(Message.NEW_MESSAGE_COMMING_EVENT, messageObject);
    
  }
};

module.exports = { notifySendingMessage };
