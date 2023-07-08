var express = require("express");
var router = express.Router();
const userControler = require("../controllers/userControllers");

// router.get("/all", userControler.getAllUser);
router.get("/infor/:username", userControler.getUserByUserName);

module.exports = router;
