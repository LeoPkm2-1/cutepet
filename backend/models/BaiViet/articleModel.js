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

// get both article and status post ok
const getPostById = async (postId) => {
  async function executor(collection) {
    return await collection.find({ _id: new ObjectId(postId) }).toArray();
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

module.exports = {
  addArticle,
  getPostById,
};
