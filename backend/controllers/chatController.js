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

module.exports = { sendMessage };
