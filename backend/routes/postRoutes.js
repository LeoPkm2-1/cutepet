const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { requireLogined } = require('../middlewares/auth');

// yêu cầu đăng nhập
router.use(requireLogined);

router.post('/addStatusPost', postController.createStatusPost);
module.exports = router;
