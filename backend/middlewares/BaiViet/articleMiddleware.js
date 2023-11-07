const statusAndArticleModel = require("./../../models/BaiViet/StatusAndArticleModel");
const articleModel = require("./../../models/BaiViet/articleModel");
const articleHelper = require("./../../utils/BaiViet/articleHelper");
const StatusAndArticleModel = require("./../../models/BaiViet/StatusAndArticleModel");
const { Response } = require("../../utils");
const NOT_HAVE_TITLE_ERR = "Tiêu đề không được để trống";
const NOT_HAVE_MAIN_IMG_ERR = "Bài chiase kiến thức phải có ảnh chính";
const NOT_HAVE_CONTENT_ERR = "Nội dung bài viết không được để trống";
const NOT_HAVE_CATEGORIES_ERR = "bài chia sẻ không có thể loại";
const WRONG_INTRO_ERR = "intro phải là string";

function hasStringContent(param) {
  return typeof param == "string" && param.length > 0;
}
function hasArrayContent(param) {
  return Array.isArray(param) && param.length > 0;
}

async function preProcessAddArtticle(req, res, next) {
  //   console.log(req.body);
  const { title, main_image, intro, content, categories } = req.body;
  try {
    // check content of variables
    if (!hasStringContent(title)) throw new Error(NOT_HAVE_TITLE_ERR);
    if (!hasStringContent(main_image)) throw new Error(NOT_HAVE_MAIN_IMG_ERR);
    if (!hasStringContent(content)) throw new Error(NOT_HAVE_CONTENT_ERR);
    if (!hasArrayContent(categories)) throw new Error(NOT_HAVE_CATEGORIES_ERR);
    if (intro && typeof intro != "string") throw new Error(WRONG_INTRO_ERR);
    req.body.intro = intro || "";
    next();
    return;
  } catch (error) {
    switch (error.message) {
      case NOT_HAVE_TITLE_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_TITLE_ERR, 300, 300));
        return;
      case NOT_HAVE_MAIN_IMG_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_MAIN_IMG_ERR, 300, 300));
        return;
      case NOT_HAVE_CONTENT_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_CONTENT_ERR, 300, 300));
        return;
      case NOT_HAVE_CATEGORIES_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_CATEGORIES_ERR, 300, 300));
        return;
      case WRONG_INTRO_ERR:
        res.status(400).json(new Response(400, [], WRONG_INTRO_ERR, 300, 300));
        return;
      default:
        console.log(error);
        break;
    }
  }
}

async function checkArticleExistMid(req, res, next) {
  const { article_id } = req.body;
  const data = await articleModel.getArticleById(article_id)
    .then((data) => data.payload);

  if (data == null) {
    res
      .status(400)
      .json(
        new Response(400, [], "Bài chia sẻ kiến thức không tồn tại", 300, 300)
      );
    return;
  }
  // change type của _id từ object sang string
  data._id = data._id.toString();
  req.body.ARTICLE_INFOR = data;
  // console.log({ ARTICLE_INFOR: req.body.ARTICLE_INFOR });
  next();
}

async function checkCommentExistMid(req, res, next) {
  const cmt_id = req.body.cmt_id;

  // get data of comment article
  const data = await articleModel.getCommentByCmtId(cmt_id);
  if (data.payload == null) {
    res
      .status(400)
      .json(new Response(400, [], "Bình luận không tồn tại", 300, 300));
    return;
  }
  // change type của _id từ object sang string
  data.payload._id = data.payload._id.toString();
  req.body.CMT_ARTICLE_INFOR = data.payload;
  // get data of article
  const articleInfor = await StatusAndArticleModel.getPostById(
    data.payload.articleId
  ).then((data) => data.payload[0]);
  articleInfor._id = articleInfor._id.toString();
  req.body.ARTICLE_INFOR = articleInfor;
  next();
}

// kiểm tra sự tồn tại của reply comment
async function checkReplyExistMid(req, res, next) {
  const { reply_id } = req.body;
  const replyInfor = await articleModel.getReplyByReplyId(reply_id);
  if (replyInfor.payload == null) {
    res
      .status(400)
      .json(new Response(400, [], "Phản hồi không tồn tại", 300, 300));
    return;
  }
  // change type của _id từ object sang string
  replyInfor.payload._id = replyInfor.payload._id.toString();
  req.body.REPLY_CMT_ARTICLE_INFOR = replyInfor.payload;
  // get data of comment article
  req.body.CMT_ARTICLE_INFOR = await articleModel
    .getCommentByCmtId(replyInfor.payload.cmtId)
    .then((data) => {
      data.payload._id = data.payload._id.toString();
      return data.payload;
    });
  // // get data of article
  req.body.ARTICLE_INFOR = await statusAndArticleModel
    .getPostById(replyInfor.payload.articleId)
    .then((data) => {
      data.payload[0]._id = data.payload[0]._id.toString();
      return data.payload[0];
    });

  next();
  return;
}

// middleware tiền xử lý khi toggle upvote bài viết chia sẻ trạng thái
async function preProcessUpVoteArticle(req, res, next) {
  const { article_id } = req.body;
  const userId = parseInt(req.auth_decoded.ma_nguoi_dung);
  const hasUpVoted = await articleHelper.hasUserUpVotedArticle(
    userId,
    article_id
  );
  // user has already upvote the article
  if (hasUpVoted) {
    req.body.action = "REMOVE_UPVOTE";
    next();
    return;
  }
  const hasDownVoted = await articleHelper.hasUserDownVotedArticle(
    userId,
    article_id
  );
  // user has already downvote the article
  if (hasDownVoted) {
    req.body.action = "REMOVE_DOWNVOTE_BEFORE_UPVOTE";
    next();
    return;
  }
  req.body.action = "JUST_UPVOTE";
  next();
  return;
}

// middleware tiền xử lý khi toggle downvote bài viết chia sẻ trạng thái
async function preProcessDownVoteArticle(req, res, next) {
  const { article_id } = req.body;
  const userId = parseInt(req.auth_decoded.ma_nguoi_dung);
  const hasDownVoted = await articleHelper.hasUserDownVotedArticle(
    userId,
    article_id
  );
  // user has already downvote the article
  if (hasDownVoted) {
    req.body.action = "REMOVE_DOWNVOTE";
    next();
    return;
  }
  const hasUpVoted = await articleHelper.hasUserUpVotedArticle(
    userId,
    article_id
  );
  // user has already upvote the article
  if (hasUpVoted) {
    req.body.action = "REMOVE_UPVOTE_BEFORE_DOWNVOTE";
    next();
    return;
  }
  req.body.action = "JUST_DOWNVOTE";
  next();
  return;
}

// tiền xử lý khi add comment vào bài viết chia sẻ trạng thái
async function preProcessAddCmtArticle(req, res, next) {
  const comment = req.body.comment;
  if (typeof comment != "string" || comment.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Bình luận không được để trống", 300, 300));
    return;
  }
  next();
  return;
}

// tiền xử lý khi thêm phải hồi vào bình luận của bài viết chia sẻ trạng thái
async function preProcessAddReplyCmt(req, res, next) {
  const reply = req.body.reply;
  if (typeof reply != "string" || reply.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Phải hồi không được để trống", 300, 300));
    return;
  }
  next();
}

// tiền xử lý khi cập nhậtphản hồi của bình luận
async function preProcessUpdateReply(req, res, next) {
  const content = req.body.content;
  const oldReplyInfor = req.body.REPLY_CMT_ARTICLE_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != oldReplyInfor.replyBy) {
    res
      .status(400)
      .json(
        new Response(400, [], "Không có quyền chỉnh sủa phản hồi", 300, 300)
      );
    return;
  } else if (typeof content != "string" || content.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Nội dung không được để trống", 300, 300));
    return;
  }
  next();
}

async function preProcessUpdateComment(req, res, next) {
  const { content } = req.body;
  const oldCmtInfor = req.body.CMT_ARTICLE_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != oldCmtInfor.commentBy) {
    res
      .status(400)
      .json(
        new Response(400, [], "Không có quyền chỉnh sủa bình luận", 300, 300)
      );
    return;
  } else if (typeof content != "string" || content.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Nội dung không được để trống", 300, 300));
    return;
  }
  next();
}

async function preProcessDeleteReply(req, res, next) {
  const postInfor = req.body.ARTICLE_INFOR;
  const oldReplyInfor = req.body.REPLY_CMT_ARTICLE_INFOR;
  // kiểm tra quyền xóa phản hồi
  if (
    req.auth_decoded.ma_nguoi_dung != oldReplyInfor.replyBy &&
    req.auth_decoded.ma_nguoi_dung != postInfor.owner_id
  ) {
    res
      .status(400)
      .json(new Response(400, [], "Không có quyền xóa phản hồi", 300, 300));
    return;
  }
  next();
  return;
}

async function preProcessDeleteComment(req, res, next) {
  const postInfor = req.body.ARTICLE_INFOR;
  const cmtBeforeDelete = req.body.CMT_ARTICLE_INFOR;
  // kiểm tra quyền xóa bình luận
  if (
    req.auth_decoded.ma_nguoi_dung != cmtBeforeDelete.commentBy &&
    req.auth_decoded.ma_nguoi_dung != postInfor.owner_id
  ) {
    res
      .status(400)
      .json(new Response(400, [], "Không có quyền xóa bình luận", 300, 300));
    return;
  }
  next();
  return;
}

async function preProcessDeleteArticle(req, res, next) {
  const postInfor = req.body.ARTICLE_INFOR;
  // kiểm tra quyền xóa bài viết
  if (req.auth_decoded.ma_nguoi_dung != postInfor.owner_id) {
    res
      .status(400)
      .json(new Response(400, [], "Không có quyền xóa bài viết", 300, 300));
    return;
  }
  next();
  return;
}

module.exports = {
  preProcessAddArtticle,
  checkArticleExistMid,
  checkCommentExistMid,
  preProcessUpVoteArticle,
  preProcessDownVoteArticle,
  preProcessAddCmtArticle,
  preProcessAddReplyCmt,
  checkReplyExistMid,
  preProcessUpdateReply,
  preProcessUpdateComment,
  preProcessDeleteReply,
  preProcessDeleteComment,
  preProcessDeleteArticle,
};
