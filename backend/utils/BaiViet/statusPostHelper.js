const StatusPostModel = require("../../models/BaiViet/StatusPostModel");
const userHelper = require("../../utils/userHelper");
const { hasUserLikeTheStatusPost } = require("../postHelper");

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
  userId = parseInt(userId);
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

// (async function () {
//   const data = await hasUserLikeTheStatusPost(4,'6550ecdbe158c8fc09206db2');
//   console.log({data});
// })();

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

async function hasUserReportPost(user_report_id, post_id) {
  const data = await StatusPostModel.getUserReportInforOfPost(
    user_report_id,
    post_id
  );
  if (data.payload == null) return false;
  return true;
}

async function reportPost(
  post_id,
  user_report_id,
  reportReason = "",
  isUnique = true
) {
  if (!isUnique) {
    const reportProcess = await StatusPostModel.reportPost(
      post_id,
      user_report_id,
      reportReason
    );
    return reportProcess;
  }

  const hasReport = await hasUserReportPost(user_report_id, post_id);
  if (hasReport) {
    const reportInfor = await StatusPostModel.getUserReportInforOfPost(
      user_report_id,
      post_id
    ).then((data) => data.payload);
    return {
      status: 200,
      payload: {
        acknowledged: true,
        insertedId: reportInfor._id.toString(),
      },
      message: "",
      errno: null,
      errcode: null,
    };
  }
  return await StatusPostModel.reportPost(
    post_id,
    user_report_id,
    reportReason
  );
}

async function hasUserCommentedPost(user_id, post_id) {
  const data = await StatusPostModel.getCommentInforOfUserInPost(
    user_id,
    post_id
  );
  if (data.payload.length <= 0) return false;
  return true;
}

// (async function () {
//   const data = await hasUserCommentedPost(3, "6550ecdbe158c8fc09206db2");
//   console.log(data);
// })();

async function hasUserReplyCmtInPost(user_id, post_id) {
  const data = await StatusPostModel.getReplyInforOfUserInPost(
    user_id,
    post_id
  );
  // console.log(data);
  if (data.payload.length <= 0) return false;
  return true;
}

async function hasUserLikeTheCmtStatusPost(user_id, cmt_id) {
  return await StatusPostModel.getLikeCmtPostInfor(user_id, cmt_id).then(
    (data) => {
      return data.payload.length > 0 ? true : false;
    }
  );
}

async function insertHaveLikeOfUserInListOfComment(
  user_id,
  listComment,
  field_name_contain_have_like_infor = "hasLiked"
) {
  // console.log(listComment);
  const data = await Promise.all(
    listComment.map(async (comment_infor) => {
      const hasLikedComment = await hasUserLikeTheCmtStatusPost(
        user_id,
        comment_infor._id.toString()
      );
      comment_infor[field_name_contain_have_like_infor] = hasLikedComment;
      return comment_infor;
    })
  );
  // console.log(listComment);

  return data;
}

// (async function () {
//   const data = await hasUserLikeTheCmtStatusPost(8, "655441ccedfafc2f29403170");
//   console.log(data);
// })();

module.exports = {
  InsertOwnerInforOfListPosts,
  InsertUserCmtInforOfListCmts,
  InsertUserReplyInforOfListReplies,
  hasUserLikedPost_1,
  hasUserLikedListPosts_1,
  extractListIdFromListPost,
  insertUserLikePostInforOfListPosts,
  hasUserReportPost,
  reportPost,
  hasUserCommentedPost,
  hasUserReplyCmtInPost,
  hasUserLikeTheCmtStatusPost,
  insertHaveLikeOfUserInListOfComment,
};
