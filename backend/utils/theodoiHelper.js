const followModel = require("../models/theodoi/followModel");
const statusPostModel = require("../models/BaiViet/StatusPostModel");
const articleModel = require("../models/BaiViet/articleModel");
const { Response } = require("./index");
const statusAndArticleModel = require("../models/BaiViet/StatusAndArticleModel");

const hasFollowExisted = async (followed_Obj_Id, follower_Id, type) => {
  const data = await followModel
    .getOneFollowInforOfUserAndObjByType(followed_Obj_Id, follower_Id, type)
    .then((data) => data.payload);
  // console.log({data});
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

async function listOfUserUnFollowStatusPost(
  statusPost_Id,
  list_user_ids,
  stillFollowWhenUserIsOwner = true
) {
  list_user_ids = list_user_ids.map((id) => parseInt(id));
  return await Promise.all(
    list_user_ids.map(async (user_id) => {
      return await unFollowStatusPost(
        statusPost_Id,
        user_id,
        stillFollowWhenUserIsOwner
      );
    })
  );
}

async function listOfUserFollowStatusPost(
  statusPost_Id,
  list_user_ids,
  isUnique = true
) {
  list_user_ids = list_user_ids.map((id) => parseInt(id));
  return await Promise.all(
    list_user_ids.map(async (user_id) => {
      return await followStatusPost(statusPost_Id, user_id, isUnique);
    })
  );
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

// (async function () {
//   const data = await hasUserFollowArticle('654f9e8f479ad1da822047b4',2)
//   console.log(data);
// })()

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

const hasUserFollowedShop = async (shop_id, user_id) => {
  user_id = parseInt(user_id);
  return await hasFollowExisted(shop_id, user_id, "FOLLOW_SHOP");
};

// (async () => {
//   const data_22222222 = await hasUserFollowedShop("1111111111111",2);
//   console.log({data_22222222});
// })()

async function followShop(shop_id, user_follow_id, isUnique = true) {
  if (!isUnique) {
    return await followModel.userFollowShop(shop_id, user_follow_id);
  }
  const hasFollowed = await hasUserFollowedShop(shop_id, user_follow_id);
  if (!hasFollowed) {
    return await followModel.userFollowShop(shop_id, user_follow_id);
  } else {
    return false;
  }
}

async function unFollowShop(shop_id, user_follow_id) {
  return await followModel.userUnFollowShop(shop_id,user_follow_id)
}

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
  listOfUserUnFollowStatusPost,
  listOfUserFollowStatusPost,
  followShop,
  hasUserFollowedShop,
  unFollowShop
};
