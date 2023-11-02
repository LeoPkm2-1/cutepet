const express = require("express");
const router = express.Router();
const profileMid = require("../middlewares/profileMid");

const profileController = require("../controllers/profileController");

router.post("/myProfile", profileController.myProfileController);
router.post(
  "/myTimelineBackward",
  profileMid.preProccessGetMyTimeline,
  profileController.myTimelineBackwardController
);

router.post('/userProfile',profileController.userProfileController)
module.exports = router;
