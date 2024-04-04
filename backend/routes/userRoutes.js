const express = require("express");
const router = express.Router();
const {
  requireLoginedForNormUser,
  nonRequireLogined,
} = require("../middlewares/auth");
const userMid = require("./../middlewares/userMid");
const userControler = require("../controllers/userControllers");
const {
  handleConfirmRegister,
} = require("./../controllers/registerController");
const schedulerController = require("../controllers/schedulerController");
const shopMid = require("../middlewares/shopMid");
const schedulerMid = require("../middlewares/schedulerMid");

// router.get("/all", userControler.getAllUser);
// router.post("/confirmRegister", handleConfirmRegister);
router.use(requireLoginedForNormUser);
// get user infor by username
router.get("/infor/:username", userControler.userPublicInforByUserName);
// search user by username or name
router.post("/searchPeople", userControler.searchPeopleController);
// router.post('/searchPeopleByName', userControler.searchPeopleByNameController);
router.post(
  "/changePassword",
  userMid.changePasswordMid,
  userControler.changePasswordController
);

// cập nhật thông tin người dùng:
// cập nhật ảnh đại diện
router.post(
  "/updateAvatar",
  userMid.updateAvatarMid,
  userControler.updateAvatarController
);
// cập nhật lại thông tin cá nhân của người dùng
router.post(
  "/updateInfor",
  userMid.updateBasicInforMid,
  userControler.updateBasicInforController
);

router.post(
  "/createSchedule",
  shopMid.checkServiceExistsMid,
  schedulerMid.createScheduleMid,
  schedulerController.createSchedule
);

router.post(
  "/getServiceScheduleById",
  schedulerMid.checkScheduleExistMid,
  schedulerController.getServiceScheduleByIdController
);

module.exports = router;
