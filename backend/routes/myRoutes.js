const express = require("express");
const router = express.Router();
const profileMid = require("../middlewares/profileMid");

const myController = require("../controllers/myController");

router.get("/profile", myController.myProfileController);
router.post(
  "/timelineBackward",
  profileMid.preProccessGetMyProfile,
  myController.myTimelineBackwardController
);

module.exports = router;
