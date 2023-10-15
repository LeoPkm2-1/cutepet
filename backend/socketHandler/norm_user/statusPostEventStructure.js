class LikePostEvent {
	static getEventName() {
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
