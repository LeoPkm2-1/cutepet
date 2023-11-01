const express = require("express");
const router = express.Router();

const myController = require("../controllers/myController");

router.get("/profile", myController.myProfileController);

module.exports = router;
