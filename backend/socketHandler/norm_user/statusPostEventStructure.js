class LikePostEvent {
	static getEventName() {
		return 'LIKE_STATUS_POST';
	}
	constructor(
		userLike,
		owner,
		likeAt = new Date(),
		areYouOwner = false,
		message = ''
	) {
		this.userLike = userLike;
		this.owner = owner;
		this.message = message;
		this.likeAt = likeAt;
		this.youAreOwner = areYouOwner;
	}
}
module.exports = {
  LikePostEvent
}