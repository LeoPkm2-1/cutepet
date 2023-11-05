const express = require("express");
const articleController = require("../../controllers/postControllers/articleController");
const articleMiddle = require("../../middlewares/BaiViet/articleMiddleware");
const router = express.Router();

// thêm bài viết chia sẻ kiến thức
router.post(
  "/addArticle",
  articleMiddle.preProcessAddArtticle,
  articleController.addArticleControler
);

// upvote bài viết chiase kiến thức
router.post(
  "/upVoteArticle",
  [articleMiddle.checkArticleExistMid, articleMiddle.preProcessUpVoteArticle],
  articleController.toggleUpVoteArticleControler
);

// downvote bài viết chiase kiến thức
router.post(
  "/downVoteArticle",
  [articleMiddle.checkArticleExistMid, articleMiddle.preProcessDownVoteArticle],
  articleController.toggleDownVoteArticleControler
);

// thêm comment vào bài chia sẻ kiến thức`
router.post(
  "/addComment",
  [articleMiddle.checkArticleExistMid, articleMiddle.preProcessAddCmtArticle],
  articleController.addCommentController
);

// thêm reply của comment vào bài viết chia sẻ kiến thức
router.post(
  "/addReply",
  [articleMiddle.checkCommentExistMid, articleMiddle.preProcessAddReplyCmt],
  articleController.addReplyController
);

module.exports = router;
