const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ObjectId } = require("mongodb");
const statusAndArticleModel = require("./StatusAndArticleModel");
const StatusPostComposStructure = require("./StatusPostComposStructure");

const addPost = async (statusPost) => {
  async function executor(collection) {
    return await collection.insertOne(statusPost);
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updatePost = async (postId, newPost) => {
  async function executor(collection) {
    return await collection.updateOne(
      {
        _id: new ObjectId(postId),
      },
      {
        $set: newPost,
      }
    );
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// get only status post
const getPostById = async (postId) => {
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(postId),
      postType: StatusPostComposStructure.StatusPost.type,
    });
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) =>
      typeof data == "undefined"
        ? new Response(200, null, "")
        : new Response(200, data, "")
    )
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const data = await getPostById('1')
//   console.log('hehe');
//   console.log(data);
// })()

const addLikePost = async (post_id, user_id) => {
  async function executor(collection) {
    return await collection.insertOne({
      postId: post_id,
      userLike: user_id,
      likeAt: new Date(),
    });
  }
  return await nonSQLQuery(executor, "LikeBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const addLikeCmtPost = async (likeComment) => {
  async function executor(collection) {
    return await collection.insertOne(likeComment);
  }
  return await nonSQLQuery(executor, "LikeBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async () => {
// 	const data = await addLikeCmtPost('6501d6b7a7499cde4c143603', 2);
// 	console.log(data);
// })();

const removeLikePost = async (post_id, user_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      postId: post_id,
      userLike: user_id,
    });
  }
  return await nonSQLQuery(executor, "LikeBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const removeLikeCmtPost = async (cmt_id, user_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      cmtId: cmt_id,
      userLike: user_id,
    });
  }
  return await nonSQLQuery(executor, "LikeBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getLikeThePostInfor = async (user_id, post_id) => {
  async function executor(collection) {
    return await collection
      .find({ userLike: user_id, postId: post_id })
      .toArray();
  }
  return await nonSQLQuery(executor, "LikeBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getLikeThePostInforOfListPosts = async (user_id, listPosts) => {
  async function executor(collection) {
    return await collection
      .find({ userLike: user_id, postId: { $in: listPosts } })
      .toArray();
  }
  return await nonSQLQuery(executor, "LikeBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const addComment = async (comment_data) => {
  async function executor(collection) {
    return await collection.insertOne(comment_data);
  }
  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const addReplyComment = async (reply_data) => {
  async function executor(collection) {
    return await collection.insertOne(reply_data);
  }
  return await nonSQLQuery(executor, "RelyBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateNumOfLikePost = async (post_id, numOfLike) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(post_id) },
      { $set: { numOfLike: numOfLike } }
    );
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateNumOfLikeCmtPost = async (cmt_id, numOfLike) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(cmt_id) },
      { $set: { numOfLike: numOfLike } }
    );
  }
  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateNumOfCommentPost = async (post_id, numOfComment) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(post_id) },
      { $set: { numOfComment: numOfComment } }
    );
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getCommentPostById = async (cmt_id) => {
  async function executor(collection) {
    return await collection.find({ _id: new ObjectId(cmt_id) }).toArray();
  }
  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getLikeCmtPostInfor = async (user_id, cmt_id) => {
  async function executor(collection) {
    return await collection
      .find({ userLike: user_id, cmtId: cmt_id })
      .toArray();
  }
  return await nonSQLQuery(executor, "LikeBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateNumOfReplyInCmtPost = async (cmt_id, numOfReply) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(cmt_id) },
      { $set: { numOfReply: numOfReply } }
    );
  }
  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getReplyCommentById = async (replyId) => {
  async function executor(collection) {
    return await collection.find({ _id: new ObjectId(replyId) }).toArray();
  }
  return await nonSQLQuery(executor, "RelyBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllReplyCommentByCmtId = async (cmt_id) => {
  async function executor(collection) {
    return await collection
      .find({ cmtId: cmt_id })
      .sort({ replyAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "RelyBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllCmtByPostId = async (postId) => {
  async function executor(collection) {
    return await collection
      .find({ postId: postId })
      .sort({ commentAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllPost = async () => {
  async function executor(collection) {
    return await collection.find().sort({ createAt: -1 }).toArray();
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllPostOfUserBeforeTime = async (userId, before, num = undefined) => {
  userId = parseInt(userId);
  let executor = null;
  //   num == undefined => get all
  if (typeof num == "undefined") {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [{ owner_id: userId }, { createAt: { $lt: before } }],
        })
        .sort({ createAt: -1 })
        .toArray();
    };
  } else {
    num = parseInt(num);
    executor = async (collection) => {
      return await collection
        .find({
          $and: [{ owner_id: userId }, { createAt: { $lt: before } }],
        })
        .sort({ createAt: -1 })
        .limit(num)
        .toArray();
    };
  }

  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getPostOfUserForReaderBeforeTime = async (
  postOnwer_id,
  reader_id,
  isFriend,
  before,
  num = undefined
) => {
  postOnwer_id = parseInt(postOnwer_id);
  let executor = null;
  if (typeof num == "undefined" && !isFriend)
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { owner_id: postOnwer_id },
            { createAt: { $lt: before } },
            {
              $or: [
                { visibility: "PUBLIC" },
                {
                  $and: [
                    { visibility: "PRIVATE" },
                    {
                      taggedUsers: {
                        $elemMatch: {
                          ma_nguoi_dung: reader_id,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        })
        .sort({ createAt: -1 })
        .toArray();
    };
  else if (typeof num == "undefined" && isFriend)
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { owner_id: postOnwer_id },
            { createAt: { $lt: before } },
            {
              $or: [
                { visibility: "PUBLIC" },
                { visibility: "JUST_FRIENDS" },
                {
                  $and: [
                    { visibility: "PRIVATE" },
                    {
                      taggedUsers: {
                        $elemMatch: {
                          ma_nguoi_dung: reader_id,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        })
        .sort({ createAt: -1 })
        .toArray();
    };
  else if (typeof num != "undefined" && !isFriend)
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { owner_id: postOnwer_id },
            { createAt: { $lt: before } },
            {
              $or: [
                { visibility: "PUBLIC" },
                {
                  $and: [
                    { visibility: "PRIVATE" },
                    {
                      taggedUsers: {
                        $elemMatch: {
                          ma_nguoi_dung: reader_id,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        })
        .sort({ createAt: -1 })
        .limit(num)
        .toArray();
    };
  else if (typeof num != "undefined" && isFriend)
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { owner_id: postOnwer_id },
            { createAt: { $lt: before } },
            {
              $or: [
                { visibility: "PUBLIC" },
                { visibility: "JUST_FRIENDS" },
                {
                  $and: [
                    { visibility: "PRIVATE" },
                    {
                      taggedUsers: {
                        $elemMatch: {
                          ma_nguoi_dung: reader_id,
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        })
        .sort({ createAt: -1 })
        .limit(num)
        .toArray();
    };

  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const data = await getAllPostOfUserBeforeTime(2, new Date(), 1);
//   console.log(data);
// })();

const updateReplyComment = async (replyId, content) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(`${replyId}`) },
      { $set: { reply: `${content}`, modifiedAt: new Date() } }
    );
  }
  return await nonSQLQuery(executor, "RelyBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateCommentPost = async (cmtId, content) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(`${cmtId}`) },
      { $set: { comment: `${content}`, modifiedAt: new Date() } }
    );
  }

  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteReplyComment = async (replyId) => {
  async function executor(collection) {
    return await collection.deleteOne({ _id: new ObjectId(`${replyId}`) });
  }
  return await nonSQLQuery(executor, "RelyBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteAllLikeOfComment = async (cmtId) => {
  async function executor(collection) {
    return await collection.deleteMany({ cmtId: `${cmtId}` });
  }
  return await nonSQLQuery(executor, "LikeBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteAllReplyOfComment = async (cmtId) => {
  async function executor(collection) {
    return await collection.deleteMany({ cmtId: `${cmtId}` });
  }
  return await nonSQLQuery(executor, "RelyBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};
const deleteCommentByCmtId = async (cmtId) => {
  async function executor(collection) {
    return await collection.deleteOne({ _id: new ObjectId(`${cmtId}`) });
  }
  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteAllReplyCmtOfPost = async (postId) => {
  async function executor(collection) {
    return collection.deleteMany({ postId: `${postId}` });
  }
  return await nonSQLQuery(executor, "RelyBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteAllLikeCmtsOfPost = async (postId) => {
  async function executor(collection) {
    return collection.deleteMany({ postId: `${postId}` });
  }
  return await nonSQLQuery(executor, "LikeBinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteAllCmtsOfPost = async (postId) => {
  async function executor(collection) {
    return collection.deleteMany({ postId: `${postId}` });
  }
  return await nonSQLQuery(executor, "BinhLuanBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteAllLikesOfPost = async (postId) => {
  async function executor(collection) {
    return collection.deleteMany({ postId: `${postId}` });
  }
  return await nonSQLQuery(executor, "LikeBaiVietTrangThai")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deletePostById = async (postId) => {
  async function executor(collection) {
    return collection.deleteOne({ _id: new ObjectId(postId) });
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
      return new Response(400, err, "", 300, 300);
    });
};

const getOnwerIdOfPost = async (postId) => {
  const postInfor = await statusAndArticleModel
    .getPostById(postId)
    .then((data) => data.payload[0]);
  return typeof postInfor === "undefined" ? null : parseInt(postInfor.owner_id);
};

const getOnwerIdOfComment = async (comment_id) => {
  const commentInfor = await getCommentPostById(comment_id).then(
    (data) => data.payload[0]
  );
  return typeof commentInfor === "undefined"
    ? null
    : parseInt(commentInfor.commentBy);
};

const reportPost = async (post_id, user_report_id) => {
  user_report_id = parseInt(user_report_id);
  const reportObject = new StatusPostComposStructure.ReportPost(
    post_id,
    user_report_id
  );
  // console.log(reportObject);
  async function executor(collection) {
    return await collection.insertOne(reportObject);
  }
  return await nonSQLQuery(executor, "Report")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getUserReportInforOfPost = async (user_report_id, post_id) => {
  user_report_id = parseInt(user_report_id);
  async function executor(collection) {
    return await collection.findOne({
      postId: post_id,
      reportBy: user_report_id,
    });
  }
  return await nonSQLQuery(executor, "Report")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async function () {
//   const data = await getUserReportInforOfPost(2,'12');
//   console.log(data);
// })();

module.exports = {
  addPost, // 1
  getPostById, // 2
  addComment, // 3
  addLikePost, // 4
  getLikeThePostInfor, // 5
  removeLikePost, // 6
  removeLikeCmtPost, // 8
  updateNumOfLikePost, // 9
  updateNumOfLikeCmtPost, // 10
  updateNumOfCommentPost, // 11
  updateNumOfReplyInCmtPost, //12
  getCommentPostById, // 13
  getLikeCmtPostInfor, //14
  addLikeCmtPost, // 7
  addReplyComment, // 12
  getReplyCommentById, //
  getAllReplyCommentByCmtId, //
  getAllCmtByPostId, //
  getAllPost, // ?
  getLikeThePostInforOfListPosts,
  updateReplyComment,
  updateCommentPost,
  deleteReplyComment,
  deleteAllLikeOfComment,
  deleteAllReplyOfComment,
  deleteCommentByCmtId,
  deleteAllReplyCmtOfPost,
  deleteAllLikeCmtsOfPost,
  deleteAllCmtsOfPost,
  deleteAllLikesOfPost,
  deletePostById,
  getOnwerIdOfPost,
  getOnwerIdOfComment,
  getAllPostOfUserBeforeTime,
  getPostOfUserForReaderBeforeTime,
  updatePost,
  reportPost,
  getUserReportInforOfPost,
};
