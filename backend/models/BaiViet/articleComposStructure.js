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

module.exports = {
  Article,
};
