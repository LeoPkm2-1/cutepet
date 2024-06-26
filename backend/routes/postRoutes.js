const express = require('express');
const statusPostMiddle = require('../middlewares/BaiViet/postMiddlewares');
const statusPostController = require('../controllers/postControllers/statusPostController');
const { requireLoginedForNormUser } = require('../middlewares/auth');
const router = express.Router();

// router.use(requireLoginedForNormUser);
router.post(
	'/statusPost/addPost',
	statusPostMiddle.preProcessAddPost,
	statusPostController.addPostController
);

router.post(
	'/statusPost/likePost',
	[statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessLikePost],
	statusPostController.toggleLikePostController
);
router.post(
	'/statusPost/addComment',
	[statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessCmtPost],
	statusPostController.addCommentController
);

router.post(
	'/statusPost/likeComment',
	[
		statusPostMiddle.checkCmtPostExistMid,
		statusPostMiddle.preProcessLikeCmtPost,
	],
	statusPostController.toggleLikeCmtController
);

router.post(
	'/statusPost/replyComment',
	[
		statusPostMiddle.checkCmtPostExistMid,
		statusPostMiddle.preProcessRelyCmtPost,
	],
	statusPostController.replyCmtController
);

router.post(
	'/statusPost/getAllComment',
	[statusPostMiddle.checkPostExistMid],
	statusPostController.getAllCmtController
);

router.post(
	'/statusPost/getCommentStartFrom',
	[statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessGetCmtPost],
	statusPostController.getCmtStartFromController
);

router.post(
	'/statusPost/getAllReply',
	[statusPostMiddle.checkCmtPostExistMid],
	statusPostController.getAllReplyController
);

router.post(
	'/statusPost/getReplyStartFrom',
	[
		statusPostMiddle.checkCmtPostExistMid,
		statusPostMiddle.preProcessGetReplyOfCmtPost,
	],
	statusPostController.getReplyStartFromController
);

router.post(
	'/statusPost/getPost',
	[statusPostMiddle.checkPostExistMid],
	statusPostController.getPostController
);

router.post(
	'/statusPost/getPostStartFrom',
	[statusPostMiddle.preProcessGetPostStartFrom],
	statusPostController.getPostStartFromController
);

router.post(
	'/statusPost/updateReply',
	[
		statusPostMiddle.checkReplyPostExistMid,
		statusPostMiddle.preProcessUpdateReplyPost,
	],
	statusPostController.updateReplyController
);

router.post(
	'/statusPost/updateComment',
	[
		statusPostMiddle.checkCmtPostExistMid,
		statusPostMiddle.preProcessUpdateCmtPost,
	],
	statusPostController.updateCommentController
);

router.post(
	'/statusPost/deleteReply',
	[
		statusPostMiddle.checkReplyPostExistMid,
		statusPostMiddle.preProcessDeleteReplyOFCmt,
	],
	statusPostController.deleteReplyController
);

router.post(
	'/statusPost/deleteComment',
	[
		statusPostMiddle.checkCmtPostExistMid,
		statusPostMiddle.preProcessDeleteComment,
	],
	statusPostController.deleteCommentController
);

router.post(
	'/statusPost/deletePost',
	[statusPostMiddle.checkPostExistMid, statusPostMiddle.preProcessDeletePost],
	statusPostController.deletePostController
);

router.post(
	'/statusPost/updatePost',
	[statusPostMiddle.checkPostExistMid],
	statusPostController.updatePostController
)

router.post(
	'/statusPost/isUserFollowedPost',
	[statusPostMiddle.checkPostExistMid],

	statusPostController.isUserFollowedPostController
)

router.post(
	'/statusPost/unfollowPost',
	[statusPostMiddle.checkPostExistMid],
	statusPostController.unfollowPostController
)

router.post(
	'/statusPost/followPost',
	[statusPostMiddle.checkPostExistMid],
	statusPostController.followPostController
)

module.exports = router;
