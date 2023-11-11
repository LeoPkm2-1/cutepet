// ======================== this contain genaral model of status and article ========================

const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ObjectId } = require("mongodb");

const getPostById = async (status_or_article_id) => {
  async function executor(collection) {
    return await collection
      .find({ _id: new ObjectId(status_or_article_id) })
      .toArray();
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

module.exports = {
  getPostById,
};
