const express = require("express");
const statusPostMiddle = require("../../middlewares/BaiViet/postMiddlewares");
const statusPostController = require("../../controllers/postControllers/statusPostController");
const { requireLogined } = require("../../middlewares/auth");
const router = express.Router();

// router.use(requireLogined);
router.post(
  "/addPost",
  statusPostMiddle.preProcessAddPost,
  statusPostController.addPostController
);

router.post(
  "/likePost",
  [statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessLikePost],
  statusPostController.toggleLikePostController
);
router.post(
  "/addComment",
  [statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessCmtPost],
  statusPostController.addCommentController
);

router.post(
  "/likeComment",
  [
    statusPostMiddle.checkCmtPostExistMid,
    statusPostMiddle.preProcessLikeCmtPost,
  ],
  statusPostController.toggleLikeCmtController
);

router.post(
  "/replyComment",
  [
    statusPostMiddle.checkCmtPostExistMid,
    statusPostMiddle.preProcessRelyCmtPost,
  ],
  statusPostController.replyCmtController
);

router.post(
  "/getAllComment",
  [statusPostMiddle.checkPostExistMid],
  statusPostController.getAllCmtController
);

router.post(
  "/getCommentStartFrom",
  [statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessGetCmtPost],
  statusPostController.getCmtStartFromController
);

router.post(
  "/getAllReply",
  [statusPostMiddle.checkCmtPostExistMid],
  statusPostController.getAllReplyController
);

router.post(
  "/getReplyStartFrom",
  [
    statusPostMiddle.checkCmtPostExistMid,
    statusPostMiddle.preProcessGetReplyOfCmtPost,
  ],
  statusPostController.getReplyStartFromController
);

router.post(
  "/getPost",
  [statusPostMiddle.checkPostExistMid],
  statusPostController.getPostController
);

router.post(
  "/getPostStartFrom",
  [statusPostMiddle.preProcessGetPostStartFrom],
  statusPostController.getPostStartFromController
);

router.post(
  "/updateReply",
  [
    statusPostMiddle.checkReplyPostExistMid,
    statusPostMiddle.preProcessUpdateReplyPost,
  ],
  statusPostController.updateReplyController
);

router.post(
  "/updateComment",
  [
    statusPostMiddle.checkCmtPostExistMid,
    statusPostMiddle.preProcessUpdateCmtPost,
  ],
  statusPostController.updateCommentController
);

router.post(
  "/deleteReply",
  [
    statusPostMiddle.checkReplyPostExistMid,
    statusPostMiddle.preProcessDeleteReplyOFCmt,
  ],
  statusPostController.deleteReplyController
);

router.post(
  "/deleteComment",
  [
    statusPostMiddle.checkCmtPostExistMid,
    statusPostMiddle.preProcessDeleteComment,
  ],
  statusPostController.deleteCommentController
);

router.post(
  "/deletePost",
  [statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessDeletePost],
  statusPostController.deletePostController
);

router.post(
  "/updatePost",
  [
    statusPostMiddle.checkPostExistMid,
    statusPostMiddle.preProcessUpdatePost_1,
    statusPostMiddle.preProcessUpdatePost_2,
  ],
  statusPostController.updatePostController
);

router.post(
  "/isUserFollowedPost",
  [statusPostMiddle.checkPostExistMid],

  statusPostController.isUserFollowedPostController
);

router.post(
  "/unFollowPost",
  [statusPostMiddle.checkPostExistMid],
  statusPostController.unfollowPostController
);

router.post(
  "/followPost",
  [statusPostMiddle.checkPostExistMid],
  statusPostController.followPostController
);

router.post(
  "/reportPost",
  [statusPostMiddle.checkPostExistMid],
  statusPostController.reportPostController
);

router.post(
  "/getPostForNewsfeed",
  [statusPostMiddle.preProccessToGetNewFeed],
  statusPostController.getPostForNewsfeedController
);

module.exports = router;
