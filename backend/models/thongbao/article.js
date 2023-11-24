const { sqlQuery, nonSQLQuery } = require("../index");
const { ObjectId } = require("mongodb");
const { Response } = require("../../utils/index");
const notificationStructure = require("./notificationStruture");

const addUpvoteArticleNotification = async (
  receiver_id,
  payload,
  createAt = new Date(),
  title = "",
  message = ""
) => {
  const notification = new notificationStructure.UpvoteArticleNotification(
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

const addDownvoteArticleNotification = async (
  receiver_id,
  payload,
  createAt = new Date(),
  title = "",
  message = ""
) => {
  const notification = new notificationStructure.DownvoteArticleNotification(
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

const addCommentArticleNotification = async (
  receiver_id,
  payload,
  createAt = new Date(),
  title = "",
  message = ""
) => {
  const notification = new notificationStructure.CommentArticleNotification(
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
  addUpvoteArticleNotification,
  addDownvoteArticleNotification,
  addCommentArticleNotification,
};
