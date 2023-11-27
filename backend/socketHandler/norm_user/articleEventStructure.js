const notificationStructure = require("./../../models/thongbao/notificationStruture");

class UpvoteArticleEvent {
  static getEventName() {
    return notificationStructure.UpvoteArticleNotification.getNotificationType();
    return "UPVOTE_ARTICLE";
  }
  constructor(
    userUpvote,
    articleOwner,
    articleInfor = null,
    upVoteAt = new Date(),
    areYouOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userUpvote = userUpvote;
    this.articleOwner = articleOwner;
    this.articleInfor = articleInfor;
    this.upVoteAt = upVoteAt;
    this.youAreOwner = areYouOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}

class DownvoteArticleEvent {
  static getEventName() {
    return notificationStructure.DownvoteArticleNotification.getNotificationType();
    return "DOWNVOTE_ARTICLE";
  }
  constructor(
    userDownvote,
    articleOwner,
    articleInfor = null,
    downVoteAt = new Date(),
    areYouOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userDownvote = userDownvote;
    this.articleOwner = articleOwner;
    this.articleInfor = articleInfor;
    this.downVoteAt = downVoteAt;
    this.youAreOwner = areYouOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}

class CommentArticleEvent {
  static getEventName() {
    return notificationStructure.CommentArticleNotification.getNotificationType();
    return "COMMENT_ARTICLE";
  }
  constructor(
    userComment,
    articleOwner,
    articleInfor = null,
    commentAt = new Date(),
    areYouOwner = false,
    dependOn = null,
    message = ""
  ) {
    this.userComment = userComment;
    this.articleOwner = articleOwner;
    this.articleInfor = articleInfor;
    this.commentAt = commentAt;
    this.youAreOwner = areYouOwner;
    this.dependOn = dependOn;
    this.message = message;
  }
}

module.exports = {
  UpvoteArticleEvent,
  DownvoteArticleEvent,
  CommentArticleEvent,
};
