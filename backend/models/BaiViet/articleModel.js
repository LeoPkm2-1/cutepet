const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ObjectId } = require("mongodb");
const articleComposStructure = require("./articleComposStructure");
const StatusAndArticleModel = require("./StatusAndArticleModel");

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
  user_id = parseInt(user_id);
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
  user_id = parseInt(user_id);
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
  user_id = parseInt(user_id);
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
  user_id = parseInt(user_id);
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

// lấy thông tin upvote của người dùng cho bài viết
const getUpVoteArticleInforOfUser = async (user_id, article_id) => {
  user_id = parseInt(user_id);
  async function executor(collection) {
    return await collection.findOne({
      articleId: article_id,
      userUpVote: user_id,
    });
  }
  return await nonSQLQuery(executor, "UpVoteBaiChiaSeKienThuc")
    .then((data) => {
      return typeof data == "undefined"
        ? new Response(200, null, "")
        : new Response(200, data, "");
    })
    .catch((err) => new Response(400, err, "", 300, 300));
};

// lấy thông tin downvote của người dùng cho bài viết
const getDownVoteArticleInforOfUser = async (user_id, article_id) => {
  user_id = parseInt(user_id);
  async function executor(collection) {
    return await collection.findOne({
      articleId: article_id,
      userDownVote: user_id,
    });
  }
  return await nonSQLQuery(executor, "DownVoteBaiChiaSeKienThuc")
    .then((data) => {
      return typeof data == "undefined"
        ? new Response(200, null, "")
        : new Response(200, data, "");
    })
    .catch((err) => new Response(400, err, "", 300, 300));
};

// cập nhật sồ lượng upvote của bài chia sẻ kiến thức
const updateNumOfUpVoteArticle = async (article_id, numOfUpVote) => {
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

// cập nhật sồ lượng downvote của bài chia sẻ kiến thức
const updateNumOfDownVoteArticle = async (article_id, numOfDownVote) => {
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

// thêm comment vào bài chia sẻ kiến thức
const addComment = async (commentObj) => {
  async function executor(collection) {
    return await collection.insertOne(commentObj);
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// thêm phản hồi vào bình luận của bài chia sẻ kiến thức
const addReply = async (replyObj) => {
  async function executor(collection) {
    return await collection.insertOne(replyObj);
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// cập nhật số lượng bình luận cho bài viết chia sẻ kiến thức
const updateNumOfCommentArticle = async (article_id, numOfComment) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(article_id) },
      { $set: { numOfComment: numOfComment } }
    );
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// cập nhật số lượng phản hồi cho bình luận
const updateNumOfReplyComment = async (cmt_id, numOfReply) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(cmt_id) },
      { $set: { numOfReply: numOfReply } }
    );
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// lấy thông tin 1 document trong bảng bình luận bài viết chia sẻ trạng thái
const getRowInBinhLuanTable = async (row_id, type = undefined) => {
  let executor = null;
  if (typeof type == "undefined") {
    executor = async (collection) => {
      return await collection.findOne({ _id: new ObjectId(row_id) });
    };
  } else {
    executor = async (collection) => {
      return await collection.findOne({
        _id: new ObjectId(row_id),
        type: type,
      });
    };
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) =>
      typeof data == "undefined"
        ? new Response(200, null, "")
        : new Response(200, data, "")
    )
    .catch((err) => new Response(400, err, "", 300, 300));
};

// lấy thông tin bình luận theo id
const getCommentByCmtId = async (cmt_id) => {
  return await getRowInBinhLuanTable(
    cmt_id,
    articleComposStructure.CommentArticle.type
  );
};

// lấy thông tin phản hồi theo id
const getReplyByReplyId = async (reply_id) => {
  return await getRowInBinhLuanTable(
    reply_id,
    articleComposStructure.ReplyCommentArticle.type
  );
};

// cập nhật nội dung phản hồi
const updateContentOfReply = async (reply_id, newContent) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(reply_id) },
      { $set: { reply: `${newContent}`, modifiedAt: new Date() } }
    );
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// cập nhật nội dung bình luận
const updateContentOfComment = async (cmt_id, newContent) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(cmt_id) },
      { $set: { comment: `${newContent}`, modifiedAt: new Date() } }
    );
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// xóa phản hồi theo id phản hồi
const deleteReply = async (reply_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      _id: new ObjectId(`${reply_id}`),
      type: articleComposStructure.ReplyCommentArticle.type,
    });
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => {
      // console.log({ data });
      return typeof data == "undefined"
        ? new Response(200, { acknowledged: false, deletedCount: 0 }, "")
        : new Response(200, data, "");
    })
    .catch((err) => {
      console.log(err);
      return new Response(400, err, "", 300, 300);
    });
};

// xóa tất cả các phải hồi của một bình luận
const deleteAllReplyOfComment = async (cmt_id) => {
  async function executor(collection) {
    return await collection.deleteMany({
      cmtId: cmt_id,
      type: articleComposStructure.ReplyCommentArticle.type,
    });
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// xóa bình luận theo id bình luận
const deleteComment = async (cmt_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      _id: new ObjectId(cmt_id),
      type: articleComposStructure.CommentArticle.type,
    });
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => {
      return typeof data == "undefined"
        ? new Response(200, { acknowledged: false, deletedCount: 0 }, "")
        : new Response(200, data, "");
    })
    .catch((err) => {
      console.log(err);
      return new Response(400, err, "", 300, 300);
    });
};

const deleteAllUpVoteOfArticle = async (article_id) => {
  async function executor(collection) {
    return await collection.deleteMany({ articleId: article_id });
  }
  return await nonSQLQuery(executor, "UpVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const deleteAllDownVoteOfArticle = async (article_id) => {
  async function executor(collection) {
    return await collection.deleteMany({ articleId: article_id });
  }
  return await nonSQLQuery(executor, "DownVoteBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const deleteAllReplyAndCommentOfArticle = async (article_id) => {
  async function executor(collection) {
    return await collection.deleteMany({ articleId: article_id });
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const deleteArticle = async (article_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      _id: new ObjectId(article_id),
      postType: articleComposStructure.Article.type,
    });
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => {
      return typeof data == "undefined"
        ? new Response(200, { acknowledged: false, deletedCount: 0 }, "")
        : new Response(200, data, "");
    })
    .catch((err) => {
      console.log(err);
      return new Response(400, err, "", 300, 300);
    });
};

// get only article post
const getArticleById = async (article_id) => {
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(article_id),
      postType: articleComposStructure.Article.type,
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

const getAllCommentsOfArticle = async (article_id) => {
  async function executor(collection) {
    return await collection
      .find({ articleId: article_id })
      .sort({ commentAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "BinhLuanBaiChiaSeKienThuc")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllArticles = async () => {
  async function executor(collection) {
    return await collection
      .find({
        postType: articleComposStructure.Article.type,
      })
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getArticleOfUser = async (user_id) => {
  async function executor(collection) {
    return await collection
      .find({
        postType: articleComposStructure.Article.type,
        owner_id: user_id,
      })
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateArticle = async (article_id, edited_Article_Obj) => {
  async function executor(collection) {
    return await collection.updateOne(
      {
        _id: new ObjectId(article_id),
      },
      {
        $set: edited_Article_Obj,
      }
    );
  }
  return await nonSQLQuery(executor, "BaiViet")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllCategories = () => {
  return [
    "CHÓ",
    "CHÓ CON",
    "CHÓ TRƯỞNG THÀNH",
    "CHÓ LỚN TUỔI",
    "GIỐNG LOÀI",
    "MÈO",
    "MÈO CON",
    "MÈO TRƯỞNG THÀNH",
    "MÈO LỚN TUỔI",
    "DỊ ỨNG",
    "CÁCH CHĂM SÓC",
    "BỆNH",
    "CHẾ ĐỘ ĂN UỐNG",
    "HÀNH VI & KỸ NĂNG",
  ];
};

// (async function () {
//   const data = await getAllCommentsOfArticle("6548f00bb7221c7de43e80f6");
//   console.log(data);
// })();

module.exports = {
  addArticle,
  addUpVote,
  getUpVoteArticleInforOfUser,
  updateNumOfUpVoteArticle,
  removeUpVote,
  addDownVote,
  getDownVoteArticleInforOfUser,
  updateNumOfDownVoteArticle,
  removeDownVote,
  addComment,
  updateNumOfCommentArticle,
  updateNumOfReplyComment,
  getCommentByCmtId,
  addReply,
  getReplyByReplyId,
  updateContentOfReply,
  updateContentOfComment,
  deleteReply,
  deleteAllReplyOfComment,
  deleteComment,
  deleteAllUpVoteOfArticle,
  deleteAllDownVoteOfArticle,
  deleteAllReplyAndCommentOfArticle,
  deleteArticle,
  getArticleById,
  getAllCommentsOfArticle,
  getAllArticles,
  getAllCategories,
  getArticleOfUser,
  updateArticle,
};
