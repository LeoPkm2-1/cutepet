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

// cập nhật nội dung của reply comment
router.post(
  "/updateReply",
  [articleMiddle.checkReplyExistMid, articleMiddle.preProcessUpdateReply],
  articleController.updateReplyController
);

// cập nhật nội dung của bình luận
router.post(
  "/updateComment",
  [articleMiddle.checkCommentExistMid, articleMiddle.preProcessUpdateComment],
  articleController.updateCommentController
);

// xóa phản hồi
router.post(
  "/deleteReply",
  [articleMiddle.checkReplyExistMid, articleMiddle.preProcessDeleteReply],
  articleController.deleteReplyController
);

// xóa bình luận trong bài viết chia sẻ kiến thức
router.post(
  "/deleteComment",
  [articleMiddle.checkCommentExistMid, articleMiddle.preProcessDeleteComment],
  articleController.deleteCommentController
);

// xóa bài viết chia sẻ kiến thức
router.post(
  "/deleteArticle",
  [articleMiddle.checkArticleExistMid, articleMiddle.preProcessDeleteArticle],
  articleController.deleteArticleController
);

// lấy bài viết chia sẻ kiến thức bằng id bài viết
router.post(
  "/getArticle",
  articleMiddle.checkArticleExistMid,
  articleController.getArticleController
);

// kiểm tra xem người dùng đã theo dõi bài viết chia sẻ kiến thức chưa
router.post(
  "/isUserFollowedPost",
  [articleMiddle.checkArticleExistMid],
  articleController.isUserFollowedArticleController
);

// theo dõi bài viết chia sẻ kiến thức
router.post(
  "/followArticle",
  [articleMiddle.checkArticleExistMid],
  articleController.followArticleController
);

// theo bỏ dõi bài viết chia sẻ kiến thức
router.post(
  "/unFollowArticle",
  [articleMiddle.checkArticleExistMid],
  articleController.unFollowArticleController
);

// lấy tất cả các bình luận của bài viết chia sẻ kiến thức
router.post(
  "/getAllComment",
  [articleMiddle.checkArticleExistMid],
  articleController.getAllCmtOfArticleController
);

// lấy bình luận của bài viết chia sẻ kiến thức thứ tự trước sau
router.post(
  "/getCommentStartFrom",
  [articleMiddle.checkArticleExistMid, articleMiddle.preProcessGetCmtByIndex],
  articleController.getCmtStartFromController
);
// lấy tất các các bài viết chia sẻ kiến thức trong DB
router.post(
  "/getAllArticleInDB",
  articleController.getAllArticleInDBController
);

// lấy tất cả các thể loại của bài viết chiase kiến thức
router.post(
  "/AllAvailableCategories",
  articleController.getAllCategoriesController
);

// danh sách bài viết chia sẻ kiến thức của chính mình
router.post("/getMyArticles", articleController.getMyArticlesController);

// chỉnh sửa danh sách chia sẻ bài viết
router.post(
  "/editArticle",
  [
    articleMiddle.checkArticleExistMid,
    articleMiddle.preProcessEditArticle,
    articleMiddle.preProcessAddArtticle,
  ],
  articleController.editArticleController
);

// tố cáo bài viết chia sẻ trạng thái
router.post(
  "/reportArticle",
  [articleMiddle.checkArticleExistMid,articleMiddle.preProcessReport],
  articleController.reportArticleController
);

router.post(
  "/getArticlesByIndexAndNum",
  articleMiddle.prePageingForArticle,
  articleController.getArticlesByIndexAndNumController
);

router.post(
  "/filterArticles_old",
  [
    articleMiddle.preFilterArticleMid,
    articleMiddle.navigateToSuitableFilterArricleMid,
  ],
  articleController.filterArticlesController
);

router.post(
  "/filterArticles",
  [
    articleMiddle.preFilterArticleMid_2,
    articleMiddle.navigateToSuitableFilterArricleMid_2,
  ],
  articleController.filterArticlesController_2
);

// router.post






// // search article
// router.post(
//   "/filterArticles",
//   [articleMiddle.preProcessFilterArticle_1,
//   articleMiddle.preProcessFilterArticle_2],
//   articleController.filterArticleController
// );

module.exports = router;
