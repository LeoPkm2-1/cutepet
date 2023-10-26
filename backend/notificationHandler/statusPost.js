const StatusPostModel = require("../models/BaiViet/StatusPostModel");
const socketHelper = require("../utils/socketHelper");
const theodoiHelper = require("../utils/theodoiHelper");
const userHelper = require("../utils/userHelper");
const UtilsHelper = require("../utils/UtilsHelper");
const statusPostEventStruture = require("../socketHandler/norm_user/statusPostEventStructure");
const statusPostNotificationModel = require("../models/thongbao/statusPost");
const { normUserNamespace } = require("../socketHandler/norm_user");

async function prepareUserBeforeHandleNotiForStatusPost(
  sender_id,
  followed_obj_id,
  owner_id
) {
  // get owner_id if not provided
  if (typeof owner_id == "undefined")
    owner_id = await StatusPostModel.getOnwerIdOfPost(followed_obj_id);
  // prepare user data
  let userInforList = await socketHelper.getStatusPostFollowerAndFilter(
    followed_obj_id
  );
  // exit if dont have any follower
  if (userInforList.length == 0)
    return {
      allFollowerInforList: null, // don't have any follower
      owner_infor: null, // owner is not following so don't get infor
      sender_infor: null, // sender is not following so don't get infor
      post_infor: null, //post don't have follower so don't get infor
      follower_not_sender_onwer: null, // others is not following so don't get infor
      isOwnerFollowing: false, // owner is not following
      isSenderFollowing: false, //sender is not following
    };

  // follower don't contain sender and onwer.
  const follower_not_sender_onwer = userInforList.filter(
    (user) => user.ma_nguoi_dung != sender_id && user.ma_nguoi_dung != owner_id
  );

  // sender information
  const senderInfor = await userHelper
    .getUserPublicInforByUserId(sender_id)
    .then((user) =>
      UtilsHelper.filter_keys_in_Obj(user, [
        "ma_nguoi_dung",
        "ten",
        "tai_khoan",
        "anh",
      ])
    );
  // owner information
  const ownerInfor = await userHelper
    .getUserPublicInforByUserId(owner_id)
    .then((user) =>
      UtilsHelper.filter_keys_in_Obj(user, [
        "ma_nguoi_dung",
        "ten",
        "tai_khoan",
        "anh",
      ])
    );
  // is user following post
  const is_Owner_following_post = await theodoiHelper.hasUserFollowedStatusPost(
    followed_obj_id,
    owner_id
  );
  const is_Sender_following_post =
    await theodoiHelper.hasUserFollowedStatusPost(followed_obj_id, sender_id);
  let postInfor = await StatusPostModel.getPostById(followed_obj_id).then(
    (data) => {
      const post = data.payload[0];
      post._id = post._id.toString();
      return post;
    }
  );

  postInfor = UtilsHelper.filter_keys_in_Obj(postInfor, [
    "_id",
    "postType",
    "text",
    "createAt",
  ]);

  return {
    allFollowerInforList: userInforList, // all follower
    owner_infor: ownerInfor, // owner infor
    sender_infor: senderInfor, // sender infor
    post_infor: postInfor, // post infor
    follower_not_sender_onwer: follower_not_sender_onwer, // others who is following the post and not contain owner or sender
    isOwnerFollowing: is_Owner_following_post, // owner is following
    isSenderFollowing: is_Sender_following_post, //sender is following
  };
}

const notifyLikePost = async (
  sender_id,
  followed_obj_id,
  owner_id = undefined,
  likeAt = new Date()
) => {
  // get owner_id if not provided
  if (typeof owner_id == "undefined")
    owner_id = await StatusPostModel.getOnwerIdOfPost(followed_obj_id);

  // prepare user data
  const {
    allFollowerInforList,
    owner_infor,
    sender_infor,
    post_infor,
    follower_not_sender_onwer,
    isOwnerFollowing,
    isSenderFollowing,
  } = await prepareUserBeforeHandleNotiForStatusPost(
    sender_id,
    followed_obj_id,
    owner_id
  );

  // exit if dont have any follower
  if (allFollowerInforList == null) return;
  //1. Store notification to database
  // 1.1 store notification infor for owner
  if (
    isOwnerFollowing &&
    owner_infor.ma_nguoi_dung != sender_infor.ma_nguoi_dung
  ) {
    const notiInforForOwner = new statusPostEventStruture.LikePostEvent(
      sender_infor,
      owner_infor,
      post_infor,
      likeAt,
      true
    );

    await statusPostNotificationModel.addLikePostNotification(
      owner_id,
      notiInforForOwner
    );

    // send notification through socket to owner of post when he/she is following
    const socketRoomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(
      owner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketRoomNameOfOwner)
      .emit(
        statusPostEventStruture.LikePostEvent.getEventName(),
        notiInforForOwner
      );
  }

  // 1.2 store notification infor for others
  if (follower_not_sender_onwer.length > 0) {
    const notiInforForOthers = new statusPostEventStruture.LikePostEvent(
      sender_infor,
      owner_infor,
      post_infor,
      likeAt,
      false
    );
    Promise.all(
      follower_not_sender_onwer.map(async (user) => {
        return await statusPostNotificationModel.addLikePostNotification(
          user.ma_nguoi_dung,
          notiInforForOthers
        );
      })
    );
    // send notification to other followers
    const socketRoomNameOfOthers = follower_not_sender_onwer.map((user) =>
      socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
    );
    const socketOfOthers = socketRoomNameOfOthers.reduce(
      (acc, room_name_of_user) => acc.to(room_name_of_user),
      normUserNamespace
    );
    socketOfOthers.emit(
      statusPostEventStruture.LikePostEvent.getEventName(),
      notiInforForOthers
    );
  }
};

const notifyCommentPost = async (
  commenter_id,
  statusPost_id,
  owner_id = undefined,
  commentAt = new Date()
) => {
  // get owner_id if not provided
  if (typeof owner_id == "undefined")
    owner_id = await StatusPostModel.getOnwerIdOfPost(statusPost_id);
  // prepare user data
  const {
    allFollowerInforList,
    owner_infor,
    sender_infor,
    post_infor,
    follower_not_sender_onwer,
    isOwnerFollowing,
    isSenderFollowing,
  } = await prepareUserBeforeHandleNotiForStatusPost(
    commenter_id,
    statusPost_id,
    owner_id
  );
  // exit if dont have any follower
  if (allFollowerInforList == null) return;
  //1. Store notification to database
  // 1.1 store notification infor for owner
  if (
    isOwnerFollowing &&
    owner_infor.ma_nguoi_dung != sender_infor.ma_nguoi_dung
  ) {
    const notiInforForOwner = new statusPostEventStruture.CommentPostEvent(
      sender_infor,
      owner_infor,
      post_infor,
      commentAt,
      true
    );
    await statusPostNotificationModel.addCmtPostNotification(
      owner_id,
      notiInforForOwner
    );
    // send notification to owner of post when he/she is following through socket
    const socketRoomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(
      owner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketRoomNameOfOwner)
      .emit(
        statusPostEventStruture.CommentPostEvent.getEventName(),
        notiInforForOwner
      );
  }
  // 1.2 store notification infor for others
  if (follower_not_sender_onwer.length > 0) {
    const notiInforForOthers = new statusPostEventStruture.CommentPostEvent(
      sender_infor,
      owner_infor,
      post_infor,
      commentAt,
      false
    );
    Promise.all(
      follower_not_sender_onwer.map(async (user) => {
        return await statusPostNotificationModel.addCmtPostNotification(
          user.ma_nguoi_dung,
          notiInforForOthers
        );
      })
    );

    // send notification to other who are following post
    const socketRoomNameOfOthers = follower_not_sender_onwer.map((user) =>
      socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
    );
    const socketOfOthers = socketRoomNameOfOthers.reduce(
      (acc, room_name_of_user) => acc.to(room_name_of_user),
      normUserNamespace
    );
    socketOfOthers.emit(
      statusPostEventStruture.CommentPostEvent.getEventName(),
      notiInforForOthers
    );
  }
};

async function prepareUserBeforeHandleNotiForCmtStatusPost(
  sender_id,
  comment_id,
  commenter_id = undefined
) {
  // comment infor
  const commentInfor = await StatusPostModel.getCommentPostById(
    comment_id
  ).then((data) => {
    const comment = data.payload[0];
    comment._id = comment._id.toString();
    return comment;
  });

  // get commneter_id if not provided
  if (typeof commenter_id == "undefined") commenter_id = commentInfor.commentBy;
  // post infor
  const postInfor = await StatusPostModel.getPostById(commentInfor.postId).then(
    (data) => {
      const post = data.payload[0];
      post._id = post._id.toString();
      return post;
    }
  );

  // prepare user data
  const allFollowerInforList =
    await socketHelper.getStatusPostFollowerAndFilter(commentInfor.postId);

  // exit if don't have any follower
  if (allFollowerInforList.length == 0)
    return {
      allFollowerInforList: null, // don't have any followers
      commentOwner_infor: null, // commenter is not following so don't get infor
      comment_infor: null, // post don't have follower so don't get infor
      sender_infor: null, // sender is not following so don't get infor
      postOwner_infor: null, // postOwner is not following infor so don't get infor
      post_infor: null, // post don't have follower so don't get infor
      followerNotSenderCommenterPostOwner: null, // other is not following so don't get infor
      isCommenterFollowing: false,
      isPostOwnerFollowing: false,
      isSenderFollowing: false,
    };

  // commenter infor
  const commentOwnerInfor = await userHelper
    .getUserPublicInforByUserId(commenter_id)
    .then((user) =>
      UtilsHelper.filter_keys_in_Obj(user, [
        "ma_nguoi_dung",
        "ten",
        "tai_khoan",
        "anh",
      ])
    );

  // sender infor
  const senderInfor = await userHelper
    .getUserPublicInforByUserId(sender_id)
    .then((user) =>
      UtilsHelper.filter_keys_in_Obj(user, [
        "ma_nguoi_dung",
        "ten",
        "tai_khoan",
        "anh",
      ])
    );

  // post owner infor
  const postOwnerInfor = await userHelper
    .getUserPublicInforByUserId(postInfor.owner_id)
    .then((user) =>
      UtilsHelper.filter_keys_in_Obj(user, [
        "ma_nguoi_dung",
        "ten",
        "tai_khoan",
        "anh",
      ])
    );

  const followerNotSenderCommenterPostOwner = allFollowerInforList.filter(
    (user) =>
      user.ma_nguoi_dung != commentOwnerInfor.ma_nguoi_dung &&
      user.ma_nguoi_dung != postOwnerInfor.ma_nguoi_dung &&
      user.ma_nguoi_dung != sender_id
  );

  const is_commenter_followingPost =
    await theodoiHelper.hasUserFollowedStatusPost(
      commentInfor.postId,
      commenter_id
    );

  const is_postOwner_followingPost =
    await theodoiHelper.hasUserFollowedStatusPost(
      commentInfor.postId,
      postOwnerInfor.ma_nguoi_dung
    );

  const is_Sender_followingPost = await theodoiHelper.hasUserFollowedStatusPost(
    commentInfor.postId,
    sender_id
  );

  return {
    allFollowerInforList,
    commentOwner_infor: commentOwnerInfor,
    comment_infor: commentInfor,
    sender_infor: senderInfor,
    postOwner_infor: postOwnerInfor,
    post_infor: postInfor,
    followerNotSenderCommenterPostOwner: followerNotSenderCommenterPostOwner,
    isCommenterFollowing: is_commenter_followingPost,
    isPostOwnerFollowing: is_postOwner_followingPost,
    isSenderFollowing: is_Sender_followingPost,
  };
}

const notifyLikeComment = async (
  userLike_id,
  comment_id,
  commenter_id = undefined,
  likeAt = new Date()
) => {
  const {
    allFollowerInforList,
    commentOwner_infor,
    comment_infor,
    sender_infor,
    postOwner_infor,
    post_infor,
    followerNotSenderCommenterPostOwner,
    isCommenterFollowing,
    isPostOwnerFollowing,
    isSenderFollowing,
  } = await prepareUserBeforeHandleNotiForCmtStatusPost(
    userLike_id,
    comment_id,
    commenter_id
  );

  // exit if don't have any follower
  if (allFollowerInforList == null) return;
  // 1. store notification to database
  // 1.1 store notification infor for commenter
  if (
    isCommenterFollowing &&
    commentOwner_infor.ma_nguoi_dung != sender_infor.ma_nguoi_dung
  ) {
    const notiInforForCommenter = new statusPostEventStruture.LikeCommentEvent(
      sender_infor,
      commentOwner_infor,
      comment_infor,
      likeAt,
      true,
      {
        postInfor: post_infor,
        postOwner: postOwner_infor,
        areYouPostOwner:
          postOwner_infor.ma_nguoi_dung == commentOwner_infor.ma_nguoi_dung,
      }
    );
    await statusPostNotificationModel.addCmtPostNotification(
      commentOwner_infor.ma_nguoi_dung,
      notiInforForCommenter
    );

    // send notification to commenter through socket
    const socketNameOfCommenter = socketHelper.getPrivateRoomNameOfUser(
      commentOwner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketNameOfCommenter)
      .emit(
        statusPostEventStruture.LikeCommentEvent.getEventName(),
        notiInforForCommenter
      );
  }

  // 1.2 store notification infor for post owner
  if (
    isPostOwnerFollowing &&
    postOwner_infor.ma_nguoi_dung != sender_infor.ma_nguoi_dung &&
    postOwner_infor.ma_nguoi_dung != commentOwner_infor.ma_nguoi_dung
  ) {
    const notiInforForPostOwner = new statusPostEventStruture.LikeCommentEvent(
      sender_infor,
      commentOwner_infor,
      comment_infor,
      likeAt,
      commentOwner_infor.ma_nguoi_dung == postOwner_infor.ma_nguoi_dung,
      {
        postInfor: post_infor,
        postOwner: postOwner_infor,
        areYouPostOwner: true,
      }
    );
    await statusPostNotificationModel.addLikeCommentNotification(
      postOwner_infor.ma_nguoi_dung,
      notiInforForPostOwner
    );
    // send notification to post owner
    const socketNameOfPostOwner = socketHelper.getPrivateRoomNameOfUser(
      postOwner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketNameOfPostOwner)
      .emit(
        statusPostEventStruture.LikeCommentEvent.getEventName(),
        notiInforForPostOwner
      );
  }

  // 1.3 store notifcation infor for others
  if (followerNotSenderCommenterPostOwner.length > 0) {
    const notiInforForOthers = new statusPostEventStruture.LikeCommentEvent(
      sender_infor,
      commentOwner_infor,
      comment_infor,
      likeAt,
      false,
      {
        postInfor: post_infor,
        postOwner: postOwner_infor,
        areYouPostOwner: false,
      }
    );

    Promise.all(
      followerNotSenderCommenterPostOwner.map(async (user) => {
        await statusPostNotificationModel.addLikeCommentNotification(
          user.ma_nguoi_dung,
          notiInforForOthers
        );
      })
    );
    // send notification to other followers
    const socketRoomNameOfOthers = followerNotSenderCommenterPostOwner.map(
      (user) => socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
    );
    const socketOfOthers = socketRoomNameOfOthers.reduce(
      (acc, room_name_of_user) => acc.to(room_name_of_user),
      normUserNamespace
    );
    socketOfOthers.emit(
      statusPostEventStruture.LikeCommentEvent.getEventName(),
      notiInforForOthers
    );
  }
  // return;
};

const notifyReplyComment = async (
  userReply_id,
  comment_id,
  commenter_id = undefined,
  likeAt = new Date()
) => {
  const {
    allFollowerInforList,
    commentOwner_infor,
    comment_infor,
    sender_infor,
    postOwner_infor,
    post_infor,
    followerNotSenderCommenterPostOwner,
    isCommenterFollowing,
    isPostOwnerFollowing,
    isSenderFollowing,
  } = await prepareUserBeforeHandleNotiForCmtStatusPost(
    userReply_id,
    comment_id,
    commenter_id
  );

  // exit if don't have any follower
  if (allFollowerInforList == null) return;
  // 1. store notification to database
  // 1.1. store notification infor and notify to commenter
  if (
    isCommenterFollowing &&
    commentOwner_infor.ma_nguoi_dung != sender_infor.ma_nguoi_dung
  ) {
    // store notification infor to database
    const notiInforForCommenter = new statusPostEventStruture.ReplyCommentEvent(
      sender_infor,
      commentOwner_infor,
      comment_infor,
      likeAt,
      true,
      {
        postInfor: post_infor,
        postOwner: postOwner_infor,
        areYouPostOwner:
          postOwner_infor.ma_nguoi_dung == commentOwner_infor.ma_nguoi_dung,
      }
    );
    await statusPostNotificationModel.addReplyCommentNotification(
      commentOwner_infor.ma_nguoi_dung,
      notiInforForCommenter
    );
    // send notification through socket
    const socketNameOfCommenter = socketHelper.getPrivateRoomNameOfUser(
      commentOwner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketNameOfCommenter)
      .emit(
        statusPostEventStruture.ReplyCommentEvent.getEventName(),
        notiInforForCommenter
      );
  }

  // 1.2 store notification infor and notify to post owner
  if (
    isPostOwnerFollowing &&
    postOwner_infor.ma_nguoi_dung != sender_infor.ma_nguoi_dung &&
    postOwner_infor.ma_nguoi_dung != commentOwner_infor.ma_nguoi_dung
  ) {
    // store notification infor to database
    const notiInforForPostOwner = new statusPostEventStruture.ReplyCommentEvent(
      sender_infor,
      commentOwner_infor,
      comment_infor,
      likeAt,
      false,
      {
        postInfor: post_infor,
        postOwner: postOwner_infor,
        areYouPostOwner: true,
      }
    );
    await statusPostNotificationModel.addReplyCommentNotification(
      postOwner_infor.ma_nguoi_dung,
      notiInforForPostOwner
    );

    // send notification through socket
    const socketNameOfPostOwner = socketHelper.getPrivateRoomNameOfUser(
      postOwner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketNameOfPostOwner)
      .emit(
        statusPostEventStruture.ReplyCommentEvent.getEventName(),
        notiInforForPostOwner
      );
  }

  // 1.3 store notification infor and notify to others
  if (followerNotSenderCommenterPostOwner.length > 0) {
    // store notification infor to database
    const notiInforForOthers = new statusPostEventStruture.ReplyCommentEvent(
      sender_infor,
      commentOwner_infor,
      comment_infor,
      likeAt,
      false,
      {
        postInfor: post_infor,
        postOwner: postOwner_infor,
        areYouPostOwner: false,
      }
    );

    Promise.all(
      followerNotSenderCommenterPostOwner.map(async (user) => {
        await statusPostNotificationModel.addReplyCommentNotification(
          user.ma_nguoi_dung,
          notiInforForOthers
        );
      })
    );

    // send notification
    const socketRoomNameOfOthers = followerNotSenderCommenterPostOwner.map(
      (user) => socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
    );
    const socketOfOthers = socketRoomNameOfOthers.reduce(
      (acc, room_name_of_user) => acc.to(room_name_of_user),
      normUserNamespace
    );

    socketOfOthers.emit(
      statusPostEventStruture.ReplyCommentEvent.getEventName(),
      notiInforForOthers
    );
  }
};

module.exports = {
  notifyLikePost,
  notifyCommentPost,
  notifyLikeComment,
  notifyReplyComment,
};
