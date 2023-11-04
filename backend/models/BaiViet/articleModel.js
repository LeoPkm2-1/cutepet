const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ObjectId } = require("mongodb");

const addArticle = async (articleObj) => {
  async function executor(collection) {
    return await collection.insertOne(articleObj);
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// thêm vào bảng upvote
const addUpVote = async (article_id, user_id) => {
  async function executor(collection) {
    return await collection.insertOne({
      articleId: article_id,
      userUpVote: user_id,
      upVoteAt: new Date(),
    });
  }
  return await nonSQLQuery(executor, "UpVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// thêm vào bảng downvote
const addDownVote = async (article_id, user_id) => {
  async function executor(collection) {
    return await collection.insertOne({
      articleId: article_id,
      userDownVote: user_id,
      downVoteAt: new Date(),
    });
  }
  return await nonSQLQuery(executor, "DownVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// xóa trong bảng upvote
const removeUpVote = async (article_id, user_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      articleId: article_id,
      userUpVote: user_id,
    });
  }
  return await nonSQLQuery(executor, "UpVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// xóa trong bảng downvote
const removeDownVote = async (article_id, user_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      articleId: article_id,
      userDownVote: user_id,
    });
  }
  return await nonSQLQuery(executor, "DownVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const data = await removeDownVote('1',2);
//   console.log('data');
//   console.log(data);
// })();

// lấy thông tin upvote của người dùng cho bài viết
const getUpVoteOfArticleByUser = async (user_id, article_id) => {
  async function executor(collection) {
    return await collection.findOne({
      articleId: article_id,
      userUpVote: user_id,
    });
  }
  return await nonSQLQuery(executor, "UpVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// lấy thông tin downvote của người dùng cho bài viết
const getDownVoteOfArticleByUser = async (user_id, article_id) => {
  async function executor(collection) {
    return await collection.findOne({
      articleId: article_id,
      userDownVote: user_id,
    });
  }
  return await nonSQLQuery(executor, "DownVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const data = await getDownVoteOfArticleByUser(10, "6545f11d264a36e0b590d15a");
//   console.log("data");
//   console.log(data);
// })()

// cập nhật sồ lượng upvote của bài chia sẻ kiến thức
const updateNumOfUpVote = async (article_id, numOfUpVote) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(article_id) },
      { $set: { numOfUpVote: numOfUpVote } }
    );
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateNumOfDownVote = async (article_id, numOfDownVote) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(article_id) },
      { $set: { numOfDownVote: numOfDownVote } }
    );
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const data = await updateNumOfDownVote("6545f11d264a36e0b590d15a", 1);
//   console.log("donw");
//   console.log(data);
// })();

// // get both article and status post ok
// const getPostById = async (postId) => {
//   async function executor(collection) {
//     return await collection.find({ _id: new ObjectId(postId) }).toArray();
//   }
//   return await nonSQLQuery(executor, "BaiViet")
//     .then((data) => new Response(200, data, ""))
//     .catch((err) => new Response(400, err, "", 300, 300));
// };

module.exports = {
  addArticle,
  addUpVote,
  getUpVoteOfArticleByUser,
  updateNumOfUpVote,
  removeUpVote,
  addDownVote,
  getDownVoteOfArticleByUser,
  updateNumOfDownVote,
  removeDownVote,
  // getPostById,
};
