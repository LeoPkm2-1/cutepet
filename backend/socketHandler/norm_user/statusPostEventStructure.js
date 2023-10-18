const notificationStructure = require('./../../models/thongbao/notificationStruture');
class LikePostEvent {
	static getEventName() {
		return notificationStructure.LikeStatusPostNotification.getNotificationType();
		return 'LIKE_STATUS_POST';
	}
	constructor(
		userLike,
		postOwner,
		likeAt = new Date(),
		areYouOwner = false,
		message = ''
	) {
		this.userLike = userLike;
		this.postOwner = postOwner;
		this.message = message;
		this.likeAt = likeAt;
		this.youAreOwner = areYouOwner;
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
		commentAt = new Date(),
		areYouOwner = false,
		message = ''
	) {
		this.userComment = userComment;
		this.postOwner = postOwner;
		this.message = message;
		this.commentAt = commentAt;
		this.youAreOwner = areYouOwner;
	}
}
module.exports = {
	LikePostEvent,
	CommentPostEvent,
};
