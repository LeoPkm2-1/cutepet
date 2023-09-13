const express = require('express');
const postMiddle = require('../middlewares/postMiddlewares');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/addStatusPost',postMiddle.preProcessAddStatusPost, postController.addStatusPostController);
router.post('/likeStatusPost',postMiddle.preProcessLikeStatusPost,postController.toggleLikeStatusController);
// router.post('/commentStatusPost',postController)
module.exports = router;
