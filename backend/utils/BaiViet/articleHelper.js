const articleModel = require("../../models/BaiViet/articleModel");

async function hasUserUpVotedArticle(user_id, article_id) {
  return await articleModel
    .getUpVoteArticleInforOfUser(user_id, article_id)
    .then((data) => data.payload != null);
}

async function hasUserDownVotedArticle(user_id, article_id) {
  return await articleModel
    .getDownVoteArticleInforOfUser(user_id, article_id)
    .then((data) => data.payload != null);
}

// (async function () {
//   const data = await hasUserDownVotedArticle("1", "6549106cd55fe46e0f9dd857");
//   console.log(data);
// })();

module.exports = {
  hasUserUpVotedArticle,
  hasUserDownVotedArticle,
};
