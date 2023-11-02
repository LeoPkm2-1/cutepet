const express = require("express");
const router = express.Router();
const profileMid = require("../middlewares/profileMid");

const myController = require("../controllers/myController");

router.get("/myProfile", myController.myProfileController);
router.post(
  "/myTimelineBackward",
  profileMid.preProccessGetMyProfile,
  myController.myTimelineBackwardController
);

module.exports = router;
