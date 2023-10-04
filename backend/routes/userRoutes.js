const express = require('express');
const router = express.Router();
const { requireLogined, nonRequireLogined } = require('../middlewares/auth');
const addFriendMid = require('../middlewares/addFriendMid')
const userControler = require('../controllers/userControllers');
const {
	handleConfirmRegister,
} = require('./../controllers/registerController');

// router.get("/all", userControler.getAllUser);
router.get('/confirmRegister', handleConfirmRegister);
router.use(requireLogined);
// get user infor by username
router.get('/infor/:username', userControler.userPublicInforByUserName);
// request add friend 
router.post('/requestAddFriendById', addFriendMid.AddByUserIdMid,userControler.requestAddFriend);
router.post('/requestAddFriendByUserName',addFriendMid.AddByUserNameMid ,userControler.requestAddFriend);
// respone add friend request.
router.post('/responeAddFriendRequestById',userControler.responeAddFriend)
module.exports = router;
