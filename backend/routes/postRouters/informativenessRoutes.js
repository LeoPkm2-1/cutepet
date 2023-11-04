const express = require("express");
const articleController = require("../../controllers/postControllers/articleController");
const router = express.Router();

router.post("/addArticle", articleController.addArticle);
router.post("/addArticleTest", articleController.addArticle);

router.post("/test", (req, res) => {
  res.send(" xin chào Việt Nam");
});

module.exports = router;
