class Article {
  constructor(title, main_image, intro, content, categories, owner_id) {
    this.title = title;
    this.postType = "ARTICLE";
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

module.exports = {
  Article,
  CommentArticle,
};
