const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const postController = require('../controllers/postController');
const { requireLogined } = require('../middlewares/auth');

// yêu cầu đăng nhập
router.use(requireLogined);

router.post('/addStatusPost', postController.createStatusPost);
=======
const postMiddle = require('../middlewares/postMiddlewares');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/addStatusPost',postMiddle.preProcessAddStatusPost, postController.addStatusPostController);
router.post('/likeStatusPost',postMiddle.preProcessLikeStatusPost,()=>{
    res.send('ahihi')
});
router.post('/commentStatusPost',postController)
>>>>>>> 480b2941782e58795db1e4c0784ffea293895900
module.exports = router;
