const followModel = require("../models/theodoi/followModel");
const statusPostModel = require("../models/BaiViet/StatusPostModel");
const articleModel = require("../models/BaiViet/articleModel");
const { Response } = require("./index");
const statusAndArticleModel = require("../models/BaiViet/StatusAndArticleModel");

const hasFollowExisted = async (followed_Obj_Id, follower_Id, type) => {
  const data = await followModel
    .getOneFollowInforOfUserAndObjByType(followed_Obj_Id, follower_Id, type)
    .then((data) => data.payload);
  // console.log(data);
  if (data == null) return false;
  return true;
};

// status post

const hasUserFollowedStatusPost = async (statusPost_Id, user_id) => {
  user_id = parseInt(user_id);
  return await hasFollowExisted(statusPost_Id, user_id, "FOLOW_STATUS_POST");
};

async function followStatusPost(statusPost_Id, user_id, isUnique = true) {
  if (!isUnique) {
    return await followModel.userFollowStatusPost(statusPost_Id, user_id);
  }
  const hasFollowed = await hasUserFollowedStatusPost(statusPost_Id, user_id);
  if (!hasFollowed) {
    return await followModel.userFollowStatusPost(statusPost_Id, user_id);
  }
}

async function unFollowStatusPost(
  statusPost_Id,
  user_id,
  stillFollowWhenUserIsOwner = true
) {
  if (!stillFollowWhenUserIsOwner) {
    return await followModel.userUnFollowStatusPost(statusPost_Id, user_id);
  }
  const post_infor = await statusAndArticleModel
    .getPostById(statusPost_Id)
    .then((data) => data.payload[0]);
  if (typeof post_infor == "undefined")
    return new Response(200, { acknowledged: true, deletedCount: 0 }, "");
  else if (post_infor.owner_id == user_id) {
    return new Response(200, { acknowledged: true, deletedCount: 0 }, "");
  } else
    return await followModel.userUnFollowStatusPost(statusPost_Id, user_id);
}

// user follow

async function hasUserFollowedAnother(follower_Id, user_followed_id) {
  const data = await followModel
    .getOneFollowInforBetweenTwoUser(user_followed_id, follower_Id)
    .then((data) => data.payload);
  if (data == null) return false;
  return true;
}

async function followUser(follower_id, user_followed_id, isUnique = true) {
  if (!isUnique) {
    return await followModel.userFollowAnother(user_followed_id, follower_id);
  }
  const hasFollowed = await hasUserFollowedAnother(
    follower_id,
    user_followed_id
  );
  if (!hasFollowed) {
    return await followModel.userFollowAnother(user_followed_id, follower_id);
  }
}

async function unFollowUser(follower_id, user_followed_id) {
  return await followModel.userUnFollowAnother(user_followed_id, follower_id);
}

// article
async function hasUserFollowArticle(article_id, user_id) {
  user_id = parseInt(user_id);
  return await hasFollowExisted(article_id, user_id, "FOLLOW_ARTICLE");
}

async function followArticle(article_id, user_id, isUnique = true) {
  if (!isUnique) {
    return await followModel.userFollowArticle(article_id, user_id);
  }
  const hasFollowed = await hasUserFollowArticle(article_id, user_id);
  if (!hasFollowed) {
    return await followModel.userFollowArticle(article_id, user_id);
  }
}

async function unFollowArticle(
  article_id,
  user_id,
  stillFollowWhenUserIsOwner = true
) {
  if (!stillFollowWhenUserIsOwner) {
    // console.log("000000000");
    return await followModel.userUnFollowArticle(article_id, user_id);
  }
  const article_infor = await articleModel
    .getArticleById(article_id)
    .then((data) => data.payload);
  // console.log({ article_infor });
  if (article_infor == null) {
    // console.log("2222");
    return new Response(200, { acknowledged: true, deletedCount: 0 }, "");
  } else if (article_infor.owner_id == user_id) {
    // console.log("1111");
    return new Response(200, { acknowledged: true, deletedCount: 0 }, "");
  } else {
    // console.log("3333");
    return await followModel.userUnFollowArticle(article_id, user_id);
  }
}

// (async function () {
//   "6548f00bb7221c7de43e80f6";
//   const data = await unFollowArticle("6548f00bb7221c7de43e80f6", 8,false);
//   console.log(data);
// })();

module.exports = {
  followStatusPost,
  hasUserFollowedStatusPost,
  unFollowStatusPost,
  hasUserFollowedAnother,
  followUser,
  unFollowUser,
  followArticle,
  unFollowArticle,
  hasUserFollowArticle,
};
