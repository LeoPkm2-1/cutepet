async function addArticle(req, res) {
  const { content } = req.body;
  const owner_id = req.auth_decoded.ma_nguoi_dung;
}

async function addArticleTest(req, res) {
  const { content } = req.body;
  const owner_id = req.auth_decoded.ma_nguoi_dung;
}

module.exports = {
  addArticle,
  addArticleTest,
};
