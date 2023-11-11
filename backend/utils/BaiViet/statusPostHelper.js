const StatusPostModel = require("../../models/BaiViet/StatusPostModel");
const userHelper = require("../../utils/userHelper");

async function userInfor2ListOfObjectMapByUserId(
  listObjs,
  idFieldName,
  nameFieldOfuserInfor
) {
  let userId_map_idField = {};
  const len = listObjs.length;
  for (let i = 0; i < len; i++) {
    if (listObjs[i][idFieldName] in userId_map_idField) {
      userId_map_idField[listObjs[i][idFieldName]].push(i);
    } else {
      userId_map_idField[listObjs[i][idFieldName]] = [i];
    }
  }
  // console.log({ userId_map_idField });
  let user_id_list = Object.keys(userId_map_idField);
  // console.log({ user_id_list });
  const userId_map_userInfor = await userHelper
    .getUserPublicInforByListIds(user_id_list)
    .then((data) => {
      let userId_map_userInfor = {};
      data.forEach((userInfor) => {
        userId_map_userInfor[userInfor.ma_nguoi_dung] = userInfor;
      });
      return userId_map_userInfor;
    });
  listObjs.forEach((obj, index) => {
    const user_id = obj[idFieldName];
    listObjs[index] = {
      ...obj,
      [nameFieldOfuserInfor]: userId_map_userInfor[user_id],
    };
  });
  return listObjs;
}

async function InsertOwnerInforOfListPosts(posts) {
  return await userInfor2ListOfObjectMapByUserId(
    posts,
    "owner_id",
    "owner_infor"
  );
}

async function InsertUserCmtInforOfListCmts(listCmts) {
  return await userInfor2ListOfObjectMapByUserId(
    listCmts,
    "commentBy",
    "userCmtInfor"
  );
}

async function InsertUserReplyInforOfListReplies(listReplies) {
  return await userInfor2ListOfObjectMapByUserId(
    listReplies,
    "replyBy",
    "userReplyInfor"
  );
}

async function hasUserLikedPost_1(userId, postid) {
  return await StatusPostModel.getLikeThePostInfor(userId, postid)
    .then((data) => {
      if (data.payload.length > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => console.log(err));
}

async function hasUserLikedListPosts_1(userId, listPostId) {
  const matching_table = {};
  const postsHaveLiked = await StatusPostModel.getLikeThePostInforOfListPosts(
    userId,
    listPostId
  ).then((data) => data.payload);
  // console.log(postsHaveLiked);
  listPostId.forEach((postid) => {
    matching_table[postid] = false;
  });
  if (postsHaveLiked.length > 0) {
    postsHaveLiked.forEach((post) => {
      matching_table[post.postId] = true;
    });
  }
  return matching_table;
}

async function insertUserLikePostInforOfListPosts(userId, listPosts) {
  const listid = extractListIdFromListPost(listPosts);
  const matching_table = await hasUserLikedListPosts_1(userId, listid);
  listPosts.forEach((post, index) => {
    listPosts[index] = {
      ...post,
      hasLiked: matching_table[post._id.toString()],
    };
  });
  return listPosts;
}

function extractListIdFromListPost(listPosts) {
  const listId = [];
  listPosts.forEach((post) => {
    listId.push(post._id.toString());
  });
  return listId;
}

module.exports = {
  InsertOwnerInforOfListPosts,
  InsertUserCmtInforOfListCmts,
  InsertUserReplyInforOfListReplies,
  hasUserLikedPost_1,
  hasUserLikedListPosts_1,
  extractListIdFromListPost,
  insertUserLikePostInforOfListPosts,
};
