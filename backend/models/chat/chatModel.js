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


module.exports = { insertMessageToDB, getMessageByMessageID };
