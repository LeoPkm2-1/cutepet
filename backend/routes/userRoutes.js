var express = require("express");
const router = express.Router();
const userControler = require("../controllers/userControllers");

// router.get("/all", userControler.getAllUser);

router.get("/infor/:username", userControler.getUserByUserName);
// router.post("/add", userControler.addUser);
// router.post("/login", userControler.handlLogin);

module.exports = router;
