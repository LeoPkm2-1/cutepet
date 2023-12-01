const express = require("express");
const router = express.Router();
const friendController = require("./../controllers/friendController");
const addFriendMid = require("../middlewares/addFriendMid");

// request add friend
router.post(
  "/requestAddFriendById",
  addFriendMid.AddByUserIdMid,
  friendController.requestAddFriend
);
router.post(
  "/requestAddFriendByUserName",
  addFriendMid.AddByUserNameMid,
  friendController.requestAddFriend
);
// remove request add friend
router.post(
  "/removeRequestAddFriendById",
  [addFriendMid.hasSendRequestAddFriendToMid],
  friendController.removeRequestAddFriend
);
// respone add friend request.
router.post(
  "/responeAddFriendRequestById",
  [addFriendMid.hasReceiveRequestAddFriendFromMid],
  friendController.responeAddFriend
);
// unfriend
router.post(
  "/unfriendById",
  addFriendMid.checkFriendShipExistsMid,
  friendController.unFriendById
);
router.post(
  "/getRequestAddFriendList",
  friendController.getRequestAddFriendList
);
router.post("/getFriendList", friendController.getFriendList);

// unfollow Friend
router.post(
  "/unFollowFriend",
  addFriendMid.checkFriendShipExistsMid,
  friendController.unfollowFriend
);

// get list suggested friend
router.post(
  "/getListSuggestedFriends",
  addFriendMid.preProccessSuggestFriendMid,
  friendController.getListSuggestedFriendController
);

// get list of all user who has recieved request add friend from current user
router.post(
  '/getListOfAllUserrecievedRequestAddFriendFromMe',
  friendController.getListOfAllUserrecievedRequestAddFriendFromMe
)
module.exports = router;
