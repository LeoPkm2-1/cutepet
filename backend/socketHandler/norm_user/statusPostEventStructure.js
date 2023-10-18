const notificationStructure = require('./../../models/thongbao/notificationStruture');
class LikePostEvent {
	static getEventName() {
		return notificationStructure.LikeStatusPostNotification.getNotificationType();
		return 'LIKE_STATUS_POST';
	}
	constructor(
		userLike,
		postOwner,
		postInfor = null,
		likeAt = new Date(),
		areYouOwner = false,
		dependOn = null,
		message = ''
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
		return 'COMMENT_STATUS_POST';
	}
	constructor(
		userComment,
		postOwner,
		postInfor = null,
		commentAt = new Date(),
		areYouOwner = false,
		dependOn = null,
		message = ''
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
		return 'LIKE_COMMENT_IN_STATUS_POST';
	}
	constructor(
		userLike,
		commentOwner,
		commentInfor,
		likeAt = new Date(),
		areYouCommenOwner = false,
		dependOn = null,
		message = ''
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

module.exports = {
	LikePostEvent,
	CommentPostEvent,
	LikeCommentEvent,
};
