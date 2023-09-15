const express = require('express');
const postMiddle = require('../middlewares/postMiddlewares');
const postController = require('../controllers/postController');
const router = express.Router();

router.post(
	'/addStatusPost',
	postMiddle.preProcessAddStatusPost,
	postController.addStatusPostController
);

router.post(
	'/likeStatusPost',
	[postMiddle.checkStatusPostExistMid, postMiddle.preProcessLikeStatusPost],
	postController.toggleLikeStatusController
);
router.post(
	'/addCommentStatusPost',
	[postMiddle.checkStatusPostExistMid, postMiddle.preProcessCmtStatusPost],
	postController.addCommentController
);

router.post(
	'/likeCommentStatusPost',
	[postMiddle.checkCmtStatusPostExistMid,postMiddle.preProcessLikeCmtStatusPost],
	postController.toggleLikeCmtStatusController
);

router.post(
	'/replyCommentStatusPost',
	[postMiddle.checkCmtStatusPostExistMid,postMiddle.preProcessRelyCmtStatusPost],
	postController.replyCmtStatusController
)



module.exports = router;
