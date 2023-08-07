const express = require('express');
const router = express.Router();
const { requireLogined, nonRequireLogined } = require('../middlewares/auth');
const userControler = require('../controllers/userControllers');

// router.get("/all", userControler.getAllUser);
router.use(requireLogined);
router.get('/infor/:username', userControler.getUserByUserName);
router.post('/requestAddFriend', userControler.requestAddFriend);

module.exports = router;
