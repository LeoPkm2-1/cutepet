const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ObjectId } = require("mongodb");
const chatComposStructure = require("./chatComposStructure");

const insertMessageToDB = async (
  sender_id,
  receiver_id,
  message_type,
  message_content,
  create_at = new Date(),
  is_seen = false
) => {
  const messageObject = new chatComposStructure.Message(
    sender_id,
    receiver_id,
    message_type,
    message_content,
    create_at,
    is_seen
  );
  async function executor(collection) {
    return await collection.insertOne(messageObject);
  }
  return await nonSQLQuery(executor, "ChatMessage")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getMessageByMessageID = async (message_id) => {
  async function executor(collection) {
    return await collection.findOne({ _id: new ObjectId(message_id) });
  }
  return await nonSQLQuery(executor, "ChatMessage")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getMessagesInConversationBeforeTime = async (
  chatter_1_id,
  chatter_2_id,
  before,
  range
) => {
  let executor = null;
  const nameOfConversation =
    chatComposStructure.Message.getNameOfConversationBetween(
      chatter_1_id,
      chatter_2_id
    );
  if (typeof range == "undefined") {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { conversationBetween: nameOfConversation },
            {
              createAt: {
                $lt: before,
              },
            },
          ],
        })
        .sort({ createAt: -1 })
        .toArray();
    };
  } else {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { conversationBetween: nameOfConversation },
            {
              createAt: {
                $lt: before,
              },
            },
          ],
        })
        .limit(range)
        .sort({ createAt: -1 })
        .toArray();
    };
  }
  return await nonSQLQuery(executor, "ChatMessage")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateMessagesReadStatus = async (message_ids, is_seen) => {
  try {
    const listOfObjectID = message_ids.map(
      (messageIdString) => new ObjectId(String(messageIdString))
    );
    async function executor(collection) {
      return await collection.updateMany(
        {
          _id: { $in: listOfObjectID },
        },
        { $set: { isSeen: is_seen } }
      );
    }
    return await nonSQLQuery(executor, "ChatMessage")
      .then((data) => new Response(200, data, ""))
      .catch((err) => new Response(400, err, "", 300, 300));
  } catch (err) {
    return new Response(400, err.message, "", 300, 300);
  }
};

const getMessagesByListOfId = async (message_ids) => {
  try {
    const listOfObjectID = message_ids.map(
      (messageIdString) => new ObjectId(String(messageIdString))
    );
    async function executor(collection) {
      return await collection
        .find({
          _id: { $in: listOfObjectID },
        })
        .toArray();
    }
    return await nonSQLQuery(executor, "ChatMessage")
      .then((data) => new Response(200, data, ""))
      .catch((err) => new Response(400, err, "", 300, 300));
  } catch (error) {
    return new Response(200, [], "");
  }
};

const getListUserIdHasSentMessageToMe = async (my_id) => {
  async function executor(collection) {
    return await collection.distinct("senderID", { receiverID: my_id });
  }
  return await nonSQLQuery(executor, "ChatMessage")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getListUserIdHasReceivedMessageFromMe = async (my_id) => {
  async function executor(collection) {
    return await collection.distinct("receiverID", { senderID: my_id });
  }
  return await nonSQLQuery(executor, "ChatMessage")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};
const getLatestMessageBetweenTwoUser = async (user1_id, user2_id) => {
  const nameOfConversation =
    chatComposStructure.Message.getNameOfConversationBetween(
      user1_id,
      user2_id
    );
  async function executor(collection) {
    return await collection
      .find({ conversationBetween: nameOfConversation })
      .sort({ createAt: -1 })
      .limit(1)
      .toArray();
  }
  return await nonSQLQuery(executor, "ChatMessage")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const message = await getLatestMessageBetweenTwoUser(1, 2);
//   console.log(message);
// })()

module.exports = {
  insertMessageToDB,
  getMessageByMessageID,
  getMessagesInConversationBeforeTime,
  updateMessagesReadStatus,
  getMessagesByListOfId,
  getListUserIdHasSentMessageToMe,
  getListUserIdHasReceivedMessageFromMe,
  getLatestMessageBetweenTwoUser,
};
