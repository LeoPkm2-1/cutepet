class Article {
  static type = "ARTICLE";
  constructor(title, main_image, intro, content, categories, owner_id) {
    this.title = title;
    this.postType = this.constructor.type;
    this.visibility = "PUBLIC";
    this.main_image = main_image;
    this.intro = intro;
    this.content = content;
    this.categories = categories;
    this.createAt = new Date();
    this.numOfUpVote = 0;
    this.numOfDownVote = 0;
    this.numOfComment = 0;
    this.modifiedAt = null;
    this.owner_id = owner_id;
  }
}

class CommentArticle {
  static type = "COMMENT_ARTICLE";
  constructor(articleId, comment, commentBy) {
    this.articleId = articleId;
    this.type = this.constructor.type;
    this.comment = comment;
    this.commentBy = commentBy;
    this.commentAt = new Date();
    this.numOfUpVote = 0;
    this.numOfDownVote = 0;
    this.numOfReply = 0;
    this.modifiedAt = null;
  }
}

class ReplyCommentArticle {
  static type = "REPLY_COMMENT_ARTICLE";
  constructor(cmtId, reply, replyBy, articleId) {
    this.cmtId = cmtId;
    this.type = this.constructor.type;
    this.reply = reply;
    this.replyBy = replyBy;
    this.replyAt = new Date();
    this.articleId = articleId;
    this.modifiedAt = null;
    this.numOfUpVote = 0;
    this.numOfDownVote = 0;
  }
}

class ReportArticle {
  static type = "REPORT_ARTICLE";
  constructor(articleId, reportBy) {
    this.type = this.constructor.type;
    this.articleId = articleId;
    this.reportBy = reportBy;
    this.handleStatus = "PENDING";
    this.reportAt = new Date();
    this.handleAt = null;
  }
}

module.exports = {
  Article,
  CommentArticle,
  ReplyCommentArticle,
  ReportArticle,
};
