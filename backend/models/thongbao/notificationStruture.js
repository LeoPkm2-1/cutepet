class GeneralNotification {
  constructor(
    notificationType,
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
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
  static NOTIFICATION_TYPE = "LIKE_STATUS_POST";
  static getNotificationType() {
    return LikeStatusPostNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
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
  static NOTIFICATION_TYPE = "COMMENT_STATUS_POST";
  static getNotificationType() {
    return CommentStatusPostNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
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
  static NOTIFICATION_TYPE = "LIKE_COMMENT_IN_STATUS_POST";
  static getNotificationType() {
    return LikeCommentStatusPostNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
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

class ReplyCommentStatusPostNotification extends GeneralNotification {
  static NOTIFICATION_TYPE = "REPLY_COMMENT_IN_STATUS_POST";
  static getNotificationType() {
    return ReplyCommentStatusPostNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      ReplyCommentStatusPostNotification.NOTIFICATION_TYPE,
      receiver_id,
      payload,
      createAt,
      title,
      message,
      hasRead
    );
  }
}

class TagUserInStatusPostNotification extends GeneralNotification {
  static NOTIFICATION_TYPE = "TAG_USER_IN_STATUS_POST";
  static getNotificationType() {
    return TagUserInStatusPostNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      TagUserInStatusPostNotification.NOTIFICATION_TYPE,
      receiver_id,
      payload,
      createAt,
      title,
      message,
      hasRead
    );
  }
}

class RequestAddFriendNotification extends GeneralNotification {
  static NOTIFICATION_TYPE = "REQUEST_ADD_FRIEND";
  static getNotificationType() {
    return RequestAddFriendNotification.NOTIFICATION_TYPE;
  }

  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      RequestAddFriendNotification.NOTIFICATION_TYPE,
      receiver_id,
      payload,
      createAt,
      title,
      message,
      hasRead
    );
  }
}

class AcceptAddFriendNotification extends GeneralNotification {
  static NOTIFICATION_TYPE = "ACCEPT_ADD_FRIEND";
  static getNotificationType() {
    return AcceptAddFriendNotification.NOTIFICATION_TYPE;
  }

  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      AcceptAddFriendNotification.NOTIFICATION_TYPE,
      receiver_id,
      payload,
      createAt,
      title,
      message,
      hasRead
    );
  }
}

class UpvoteArticleNotification extends GeneralNotification {
  static NOTIFICATION_TYPE = "UPVOTE_ARTICLE";
  static getNotificationType() {
    return UpvoteArticleNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      UpvoteArticleNotification.NOTIFICATION_TYPE,
      receiver_id,
      payload,
      createAt,
      title,
      message,
      hasRead
    );
  }
}

class DownvoteArticleNotification extends GeneralNotification {
  static NOTIFICATION_TYPE = "DOWNVOTE_ARTICLE";
  static getNotificationType() {
    return DownvoteArticleNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      DownvoteArticleNotification.NOTIFICATION_TYPE,
      receiver_id,
      payload,
      createAt,
      title,
      message,
      hasRead
    );
  }
}

class CommentArticleNotification extends GeneralNotification {
  static NOTIFICATION_TYPE = "COMMENT_ARTICLE";
  static getNotificationType() {
    return CommentArticleNotification.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      CommentArticleNotification.NOTIFICATION_TYPE,
      receiver_id,
      payload,
      createAt,
      title,
      message,
      hasRead
    );
  }
}

class ServiceScheduleChangeStatus extends GeneralNotification {
  static NOTIFICATION_TYPE = "CHANGE_SERVICE_SCHEDULE_STATUS";
  static getNotificationType() {
    return ServiceScheduleChangeStatus.NOTIFICATION_TYPE;
  }
  constructor(
    receiver_id,
    payload,
    createAt = new Date(),
    title = "",
    message = "",
    hasRead = false
  ) {
    super(
      ServiceScheduleChangeStatus.NOTIFICATION_TYPE,
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
  ReplyCommentStatusPostNotification,
  TagUserInStatusPostNotification,
  RequestAddFriendNotification,
  AcceptAddFriendNotification,
  UpvoteArticleNotification,
  DownvoteArticleNotification,
  CommentArticleNotification,
  ServiceScheduleChangeStatus,
};
