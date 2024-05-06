const notificationStructure = require("./../../models/thongbao/notificationStruture");

class LikePostEvent {
  static getEventName() {
    return notificationStructure.LikeStatusPostNotification.getNotificationType();
    return "LIKE_STATUS_POST";
  }
  constructor(
    userLike,
    postOwner,
    postInfor = null,
    likeAt = new Date(),
    areYouOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userLike = userLike;
    this.postOwner = postOwner;
    this.postInfor = postInfor;
    this.likeAt = likeAt;
    this.youAreOwner = areYouOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}
class CommentPostEvent {
  static getEventName() {
    return notificationStructure.CommentStatusPostNotification.getNotificationType();
    return "COMMENT_STATUS_POST";
  }
  constructor(
    userComment,
    postOwner,
    postInfor = null,
    commentAt = new Date(),
    areYouOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userComment = userComment;
    this.postOwner = postOwner;
    this.postInfor = postInfor;
    this.commentAt = commentAt;
    this.youAreOwner = areYouOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}

class LikeCommentEvent {
  static getEventName() {
    return notificationStructure.LikeCommentStatusPostNotification.getNotificationType();
    return "LIKE_COMMENT_IN_STATUS_POST";
  }
  constructor(
    userLike,
    commentOwner,
    commentInfor,
    likeAt = new Date(),
    areYouCommenOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userLike = userLike;
    this.commentOwner = commentOwner;
    this.commentInfor = commentInfor;
    this.likeAt = likeAt;
    this.areYouCommenOwner = areYouCommenOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}

class ReplyCommentEvent {
  static getEventName() {
    return notificationStructure.ReplyCommentStatusPostNotification.getNotificationType();
    return "REPLY_COMMENT_IN_STATUS_POST";
  }

  constructor(
    userReply,
    commentOwner,
    commentInfor,
    replyAt = new Date(),
    areYouCommenOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userReply = userReply;
    this.commentOwner = commentOwner;
    this.commentInfor = commentInfor;
    this.replyAt = replyAt;
    this.areYouCommenOwner = areYouCommenOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}

class TagUserInPost {
  static getEventName() {
    return notificationStructure.TagUserInStatusPostNotification.getNotificationType();
    // return notificationStructure.ReplyCommentStatusPostNotification.getNotificationType()
    return "TAG_USER_IN_STATUS_POST";
  }
  constructor(
    userTag,
    taggedUser,
    postInfor = null,
    tagAt = new Date(),
    areYouPostOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userTag = userTag;
    this.taggedUser = taggedUser;
    this.postInfor = postInfor;
    this.tagAt = tagAt;
    this.areYouPostOwner = areYouPostOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}

class NewStatusPostAppearEvent {
  static getEventName() {
    return "NEW_STATUS_POST_APPEAR";
  }
  constructor(postInfor, areYouOwner = false) {
    this.postInfor = postInfor;
    this.areYouOwner = areYouOwner;
  }
}

module.exports = {
  LikePostEvent,
  CommentPostEvent,
  LikeCommentEvent,
  ReplyCommentEvent,
  TagUserInPost,
  NewStatusPostAppearEvent,
};
