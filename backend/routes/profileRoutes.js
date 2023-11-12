const express = require("express");
const router = express.Router();
const profileMid = require("../middlewares/profileMid");

const profileController = require("../controllers/profileController");

router.post("/myProfile", profileController.myProfileController);
router.post(
  "/myTimelineBackward",
  profileMid.preProccessGetTimeline,
  profileController.myTimelineBackwardController
);

router.post(
  "/userProfile",
  profileMid.preProccessUserProfile,
  profileController.userProfileController
);
router.post(
  "/userTimelineBackward",
  [profileMid.preProccessUserProfile, profileMid.preProccessGetTimeline],
  profileController.userTimelineBackwardController
);
module.exports = router;
