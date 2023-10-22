const express = require('express');
const router = express.Router();
const friendController = require('./../controllers/friendController');
const addFriendMid = require('../middlewares/addFriendMid');

router.post(
	'/requestAddFriendById',
	addFriendMid.AddByUserIdMid,
	friendController.requestAddFriend
);
router.post(
	'/requestAddFriendByUserName',
	addFriendMid.AddByUserNameMid,
	friendController.requestAddFriend
);
// respone add friend request.
router.post('/responeAddFriendRequestById', friendController.responeAddFriend);
// unfriend
router.post(
	'/unfriendById',
	addFriendMid.unFriendMidById,
	friendController.unFriendById
);
router.get('/getRequestAddFriendList',friendController.getRequestAddFriendList)
router.get('/getFriendList',friendController.getFriendList)
module.exports = router;
