var express = require('express');
var router = express.Router();
const userRoutes = require('./userRoutes');
const userSocialNetwork = require('./social-network');

// Router total
router.use('/user', userRoutes);
router.use('/social-network', userSocialNetwork);
module.exports = router;
