const notificationStructure = require("./notificationStruture");
const { sqlQuery, nonSQLQuery } = require("../index");
const { ObjectId } = require("mongodb");
const { Response } = require("../../utils/index");

const addRequestAddFriendNotification = async (
  receiver_id,
  payload,
  createAt = new Date(),
  title = "",
  message = ""
) => {
  const notification = new notificationStructure.RequestAddFriendNotification(
    receiver_id,
    payload,
    createAt,
    title,
    message
  );

  async function executor(collection) {
    return await collection.insertOne(notification);
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

module.exports = {
  addRequestAddFriendNotification,
};
