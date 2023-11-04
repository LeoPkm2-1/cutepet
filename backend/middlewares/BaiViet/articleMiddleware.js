const statusAndArticleModel = require("./../../models/BaiViet/StatusAndArticleModel");
const articleHelper = require("./../../utils/BaiViet/articleHelper");
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
  const data = await statusAndArticleModel.getPostById(article_id);
  if (data.payload.length <= 0) {
    res
      .status(400)
      .json(
        new Response(400, [], "Bài chia sẻ kiến thức không tồn tại", 300, 300)
      );
  }
  req.body.ARTICLE_INFOR = data.payload[0];
  next();
}

// middleware tiền xử lý khi toggle like bài viết chia sẻ trạng thái, giả sử KHI bài viết đã TỒN TẠI
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
  const hasDownVoted = false;
  // const hasDownVoted = await articleHelper.hasUserDownVotedArticle(
  //   userId,
  //   article_id
  // );
  if (hasDownVoted) {
    req.body.action = "REMOVE_DOWNVOTE_BEFORE_UPVOTE";
    next();
    return;
  }
  req.body.action = "JUST_UPVOTE";
  next();
  return;
}

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

module.exports = {
  preProcessAddArtticle,
  checkArticleExistMid,
  preProcessUpVoteArticle,
  preProcessDownVoteArticle,
};
