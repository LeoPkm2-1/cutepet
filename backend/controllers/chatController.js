const { Response } = require("../utils");
const chatModel = require("../models/chat/chatModel");
const { notifySendingMessage } = require("../notificationHandler/chat");
const userHelper = require("../utils/userHelper");

const sendMessage = async (req, res) => {
  const { receiver_id, sender_id, message_type, message_content } = req.body;

  const insertProcess = await chatModel.insertMessageToDB(
    sender_id,
    receiver_id,
    message_type,
    message_content,
    new Date(),
    false
  );
  const message_id = insertProcess.payload.insertedId.toString();

  const messageObj = await chatModel
    .getMessageByMessageID(message_id)
    .then((data) => data.payload)
    .then((data) => {
      data._id = data._id.toString();
      return data;
    });

  await notifySendingMessage(messageObj);
  res.status(200).json(
    new Response(
      200,
      {
        isSent: true,
        msg: "Message sent successfully",
        message_id: message_id,
        message_Obj: messageObj,
      },
      "success"
    )
  );
};

const getMessagesBeforeTime = async (req, res) => {
  const { before, num, chatter_id } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const messages = await chatModel
    .getMessagesInConversationBeforeTime(user_id, chatter_id, before, num)
    .then((data) => data.payload)
    .catch((err) => []);
  console.log(messages);
  res.status(200).json(new Response(200, messages, ""));
};

const markMessagesAsRead = async (req, res) => {
  const message_ids = req.body.message_ids;
  const data = await chatModel
    .updateMessagesReadStatus(message_ids, true)
    .then((data) => {
      if (data.status === 200) return { status: 200, payload: "success" };
      else if (data.status === 400)
        return { status: 400, payload: data.payload };
    });

  res
    .status(200)
    .json(
      new Response(
        data.status,
        data.payload,
        data.status == 200 ? "success" : "error"
      )
    );
};

const getMyConversationsList = async (req, res) => {
  const my_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const list_User_1 = await chatModel
    .getListUserIdHasSentMessageToMe(my_id)
    .then((data) => data.payload);
  const list_User_2 = await chatModel
    .getListUserIdHasReceivedMessageFromMe(my_id)
    .then((data) => data.payload);
  const listUserId = [...new Set(list_User_1.concat(list_User_2))].map((id) =>
    parseInt(id)
  );
  const data = await Promise.all(
    listUserId.map((id) =>
      chatModel
        .getLatestMessageBetweenTwoUser(my_id, id)
        .then((data) => data.payload[0])
    )
  );
  const data_withUser_infor = await Promise.all(
    data.map(async (conversation) => {
      const senderInfor = await userHelper.getUserPublicInforByUserId(
        conversation.senderID
      );
      const receiverInfor = await userHelper.getUserPublicInforByUserId(
        conversation.receiverID
      );
      return {
        ...conversation,
        senderInfor,
        receiverInfor,
      };
    })
  );
  res.status(200).json(new Response(200, data_withUser_infor, ""));
};

module.exports = {
  sendMessage,
  getMessagesBeforeTime,
  markMessagesAsRead,
  getMyConversationsList,
};
