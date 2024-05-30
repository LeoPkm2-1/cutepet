class StatusPost {
  static type = "STATUS";
  constructor(text, visibility, media, taggedUsers, withPets, owner_id) {
    this.text = text;
    this.postType = this.constructor.type;
    this.visibility = visibility;
    this.media = media;
    this.taggedUsers = taggedUsers;
    this.withPets = withPets;
    this.createAt = new Date();
    this.numOfLike = 0;
    this.numOfComment = 0;
    this.modifiedAt = null;
    this.owner_id = owner_id;
  }
}

class ShareSchedulePost extends StatusPost {
  constructor(
    text,
    visibility,
    media,
    taggedUsers,
    withPets,
    owner_id,
    service_id,
    service_infor
  ) {
    super(text, visibility, media, taggedUsers, withPets, owner_id);
    this.serviceId = service_id;
    this.serviceInfor = service_infor;
  }
  getType() {
    return ShareSchedulePost.type;
  }
}

class CommentPost {
  constructor(post_id, comment, commentBy) {
    this.postId = post_id;
    this.comment = comment;
    this.commentBy = commentBy;
    this.commentAt = new Date();
    this.numOfLike = 0;
    this.numOfReply = 0;
    this.modifiedAt = null;
  }
}

class LikeComment {
  constructor(cmt_id, likeBy, postId) {
    this.cmtId = cmt_id;
    this.userLike = likeBy;
    this.postId = postId;
    this.likeAt = new Date();
  }
}

class ReplyComment {
  constructor(cmt_id, reply, replyBy, postId) {
    this.cmtId = cmt_id;
    this.reply = reply;
    this.replyBy = replyBy;
    this.replyAt = new Date();
    this.numOfLike = 0;
    this.postId = postId;
    this.modifiedAt = null;
  }
}

class ReportPost {
  static type = "REPORT_STATUS_POST";
  constructor(postId, reportBy, reportReason = "") {
    this.type = this.constructor.type;
    this.postId = postId;
    this.reportBy = reportBy;
    this.reportReason = reportReason;
    this.handleStatus = "PENDING";
    this.reportAt = new Date();
    this.handleAt = null;
  }
}

module.exports = {
  StatusPost,
  CommentPost,
  ReplyComment,
  LikeComment,
  ReportPost,
  ShareSchedulePost,
};
