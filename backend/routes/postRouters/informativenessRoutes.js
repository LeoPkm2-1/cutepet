const express = require("express");
const articleController = require("../../controllers/postControllers/articleController");
const articleMiddle = require("./../../middlewares/BaiViet/articleMiddleware");
const router = express.Router();

// thêm bài viết chia sẻ kiến thức
router.post(
  "/addArticle",
  articleMiddle.preProcessAddArtticle,
  articleController.addArticle
);
// router.post("/addArticleTest", articleController.addArticle);

router.post("/test", (req, res) => {
  res.send(" xin chào Việt Nam");
});

module.exports = router;
