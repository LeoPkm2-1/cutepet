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
  // console.log(insertProcess);
  res.send("ok chat send" + " " + message_id);
  const messageObj = await chatModel
    .getMessageByMessageID(message_id)
    .then((data) => data.payload)
    .then((data) => {
      data._id = data._id.toString();
      return data;
    });
  // console.log(messageObj);
  await notifySendingMessage(messageObj);
};

module.exports = { sendMessage };
