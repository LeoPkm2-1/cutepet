const articleModel = require("../../models/BaiViet/articleModel");

async function hasUserUpVotedArticle(user_id, article_id) {
  return await articleModel
    .getUpVoteOfArticleByUser(user_id, article_id)
    .then((data) => data.payload != null);
}

async function hasUserDownVotedArticle(user_id, article_id) {
  return await articleModel
    .getDownVoteOfArticleByUser(user_id, article_id)
    .then((data) => data.payload != null);
}

// (async function () {
//   const data_1 = await hasUserDownVotedArticle(10,'6545f11d264a36e0b590d15a');
//   // console.log('');
//   console.log({data_1});
// })()

module.exports = {
  hasUserUpVotedArticle,
  hasUserDownVotedArticle,
};
