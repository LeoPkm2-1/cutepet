var express = require('express');
var router = express.Router();
const userRouter = require('./user');
const socialNetworkRouter = require('./social-network');
const mediaRouter = require('./media');

// Router total
router.use('/user', userRouter);
router.use('/social-network', socialNetworkRouter);
router.use('/media', mediaRouter);
module.exports = router;