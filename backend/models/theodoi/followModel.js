const { sqlQuery, nonSQLQuery } = require("../index");
const { ObjectId } = require("mongodb");
const { Response } = require("../../utils/index");
const followStructure = require("./followStructure");

// general
const getOneFollowInforOfUserAndObjByType = async (
  followed_Obj_Id,
  follower_Id,
  type
) => {
  async function executor(collection) {
    return await collection.findOne({
      type,
      followed_Obj_Id,
      follower_Id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllFollowInforOfObjByType = async (followed_Obj_Id, type) => {
  async function executor(collection) {
    return await collection
      .find({
        type,
        followed_Obj_Id,
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// status post
const userFollowStatusPost = async (statusPost_Id, user_id) => {
  const statusPostFollow = new followStructure.FollowStatusPost(
    statusPost_Id,
    user_id
  );
  async function executor(collection) {
    return await collection.insertOne(statusPostFollow);
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const userUnFollowStatusPost = async (statusPost_Id, user_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      type: followStructure.FollowStatusPost.get_type(),
      followed_Obj_Id: statusPost_Id,
      follower_Id: user_id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getFollowInforOfStatusPost = async (statusPost_Id) => {
  return await getAllFollowInforOfObjByType(
    statusPost_Id,
    followStructure.FollowStatusPost.get_type()
  ).then((data) => data.payload);
};

const deleteAllFollowOfStatusPost = async (statusPost_Id) => {
  async function executor(collection) {
    return await collection.deleteMany({
      type: followStructure.FollowStatusPost.get_type(),
      followed_Obj_Id: statusPost_Id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const data = await deleteAllFollowOfStatusPost('123456789012123456789138')
//   console.log(data);
// })()

// user follow
const userFollowAnother = async (followed_user_id, follower_id) => {
  const followRelationShip = new followStructure.FollowUser(
    followed_user_id,
    follower_id
  );
  async function executor(collection) {
    return await collection.insertOne(followRelationShip);
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const userUnFollowAnother = async (followed_user_id, follower_id) => {
  async function executor(collection) {
    return await collection.deleteMany({
      type: followStructure.FollowUser.get_type(),
      user_followed_Id: followed_user_id,
      follower_Id: follower_id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getOneFollowInforBetweenTwoUser = async (
  followed_user_id,
  follower_id
) => {
  async function executor(collection) {
    return await collection.findOne({
      type: followStructure.FollowUser.get_type(),
      user_followed_Id: followed_user_id,
      follower_Id: follower_id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// article
const userFollowArticle = async (article_id, user_id) => {
  const articleFollow = new followStructure.FollowArticle(article_id, user_id);
  async function executor(collection) {
    return await collection.insertOne(articleFollow);
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const userUnFollowArticle = async (article_id, user_id) => {
  user_id = parseInt(user_id);
  async function executor(collection) {
    return await collection.deleteOne({
      type: followStructure.FollowArticle.get_type(),
      followed_Obj_Id: article_id,
      follower_Id: user_id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const deleteAllFollowOfArticle = async (article_id) => {
  async function executor(collection) {
    return await collection.deleteMany({
      type: followStructure.FollowArticle.get_type(),
      followed_Obj_Id: article_id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const userFollowShop = async (shop_id, user_follow_id) => {
  const followObj = new followStructure.FollowShop(shop_id, user_follow_id);
  // console.log(followObj);
  async function executor(collection) {
    return await collection.insertOne(followObj);
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const userUnFollowShop = async (shop_id, user_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      type: followStructure.FollowShop.get_type(),
      followed_Obj_Id: shop_id,
      follower_Id: user_id,
    });
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getListOfShopUserFollow = async (user_id) => {
  async function executor(collection) {
    return await collection
      .find({
        type: followStructure.FollowShop.get_type(),
        follower_Id: user_id,
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getListOfUserFollowShop = async (shop_id) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection
      .find({
        type: followStructure.FollowShop.get_type(),
        followed_Obj_Id: shop_id,
      })
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getFollowerInforOfShopInTimeRange = async (
  shop_id,
  start_time = undefined,
  end_time = undefined
) => {
  let filterObj = {
    createAt: {},
    type: followStructure.FollowShop.get_type(),
    followed_Obj_Id: shop_id,
  };
  if (typeof start_time != "undefined") {
    filterObj.createAt.$gte = new Date(start_time);
  }
  if (typeof end_time != "undefined") {
    filterObj.createAt.$lt = new Date(end_time);
  }

  async function executor(collection) {
    return await collection
      .find({
        ...filterObj,
      })
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "BangTheoDoi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async () => {
//   const data = await getListOfUserFollowShop(537)
//   console.log(data);
// })()
module.exports = {
  userFollowStatusPost,
  userUnFollowStatusPost,
  getOneFollowInforOfUserAndObjByType,
  getFollowInforOfStatusPost,
  userFollowAnother,
  userUnFollowAnother,
  getOneFollowInforBetweenTwoUser,
  userFollowArticle,
  userUnFollowArticle,
  deleteAllFollowOfArticle,
  deleteAllFollowOfStatusPost,
  userFollowShop,
  userUnFollowShop,
  getListOfShopUserFollow,
  getListOfUserFollowShop,
  getFollowerInforOfShopInTimeRange,
};
