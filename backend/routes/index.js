var express = require('express');
var router = express.Router();
const userRouter = require('./user');
const userSocialNetwork = require('./social-network');

// Router total
router.use('/user', userRouter);
router.use('/social-network', userSocialNetwork);
module.exports = router;