var express = require("express");
var router = express.Router();
const userControler = require("../controler/userControler");

router.get("/login", userControler.login );
router.post("/logout", userControler.logout);
router.get("/register",userControler.register );

module.exports = router;
