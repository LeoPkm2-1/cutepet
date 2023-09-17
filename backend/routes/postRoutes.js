const express = require('express');
const postMiddle = require('../middlewares/postMiddlewares');
const statusPostController = require('../controllers/postControllers/statusPostController');
const router = express.Router();

router.post(
	'/statusPost/addPost',
	postMiddle.preProcessAddStatusPost,
	statusPostController.addPostController
);

router.post(
	'/statusPost/likePost',
	[postMiddle.checkStatusPostExistMid, postMiddle.preProcessLikeStatusPost],
	statusPostController.toggleLikePostController
);
router.post(
	'/statusPost/addComment',
	[postMiddle.checkStatusPostExistMid, postMiddle.preProcessCmtStatusPost],
	statusPostController.addCommentController
);

router.post(
	'/statusPost/likeComment',
	[
		postMiddle.checkCmtStatusPostExistMid,
		postMiddle.preProcessLikeCmtStatusPost,
	],
	statusPostController.toggleLikeCmtController
);

router.post(
	'/statusPost/replyComment',
	[
		postMiddle.checkCmtStatusPostExistMid,
		postMiddle.preProcessRelyCmtStatusPost,
	],
	statusPostController.replyCmtController
);

router.get(
	'/statusPost/getAllComment',
	[postMiddle.checkStatusPostExistMid],
	statusPostController.getAllCmtController
);

router.get(
	'/statusPost/getCommentStartFrom',
	[postMiddle.checkStatusPostExistMid, postMiddle.preProcessGetCmtStatusPost],
	statusPostController.getCmtStartFromController
);

router.get(
	'/statusPost/getAllReply',
	[postMiddle.checkCmtStatusPostExistMid],
	statusPostController.getAllReplyController
);

router.get(
	'/statusPost/getReplyStartFrom',
	[postMiddle.checkCmtStatusPostExistMid,postMiddle.preProcessGetReplyOfCmtStatusPost],
	statusPostController.getReplyStartFromController
)

module.exports = router;
