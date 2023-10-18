class GeneralNotification {
	constructor(
		notificationType,
		receiver_id,
		payload,
		createAt = new Date(),
		title = '',
		message = '',
		hasRead = false
	) {
		this.type = notificationType;
		this.receiver_id = receiver_id;
		this.payload = payload;
		this.createAt = createAt;
		this.title = title;
		this.message = message;
		this.hasRead = hasRead;
	}
}

class LikeStatusPostNotification extends GeneralNotification {
	static NOTIFICATION_TYPE = 'LIKE_STATUS_POST';
	static getNotificationType() {
		return LikeStatusPostNotification.NOTIFICATION_TYPE;
	}
	constructor(
		receiver_id,
		payload,
		createAt = new Date(),
		title = '',
		message = '',
		hasRead = false
	) {
		super(
			LikeStatusPostNotification.NOTIFICATION_TYPE,
			receiver_id,
			payload,
			createAt,
			title,
			message,
			hasRead
		);
	}
}

class CommentStatusPostNotification extends GeneralNotification {
	static NOTIFICATION_TYPE = 'COMMENT_STATUS_POST';
	static getNotificationType() {
		return CommentStatusPostNotification.NOTIFICATION_TYPE;
	}
	constructor(
		receiver_id,
		payload,
		createAt = new Date(),
		title = '',
		message = '',
		hasRead = false
	) {
		super(
			CommentStatusPostNotification.NOTIFICATION_TYPE,
			receiver_id,
			payload,
			createAt,
			title,
			message,
			hasRead
		);
	}
}

class LikeCommentStatusPostNotification extends GeneralNotification {
	static NOTIFICATION_TYPE = 'LIKE_COMMENT_IN_STATUS_POST';
	static getNotificationType() {
		return LikeCommentStatusPostNotification.NOTIFICATION_TYPE;
	}
	constructor(
		receiver_id,
		payload,
		createAt = new Date(),
		title = '',
		message = '',
		hasRead = false
	) {
		super(
			LikeCommentStatusPostNotification.NOTIFICATION_TYPE,
			receiver_id,
			payload,
			createAt,
			title,
			message,
			hasRead
		);
	}
}

module.exports = {
	LikeStatusPostNotification,
	CommentStatusPostNotification,
	LikeCommentStatusPostNotification,
};
