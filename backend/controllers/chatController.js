const { Response } = require("../utils");
const chatModel = require("../models/chat/chatModel");
const { notifySendingMessage } = require("../notificationHandler/chat");

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
      if (data.status === 200) return { status: 200, payload: "success"};
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

module.exports = { sendMessage, getMessagesBeforeTime, markMessagesAsRead };
