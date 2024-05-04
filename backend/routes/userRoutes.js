const express = require("express");
const router = express.Router();
const {
  requireLoginedForNormUser,
  nonRequireLogined,
  requireOnlyNormUser,
} = require("../middlewares/auth");
const userMid = require("./../middlewares/userMid");
const userControler = require("../controllers/userControllers");
const {
  handleConfirmRegister,
} = require("./../controllers/registerController");
const schedulerController = require("../controllers/schedulerController");
const shopMid = require("../middlewares/shopMid");
const schedulerMid = require("../middlewares/schedulerMid");

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
  "/createServiceSchedule",
  requireOnlyNormUser,
  shopMid.checkServiceExistsMid,
  schedulerMid.createScheduleMid,
  schedulerController.createSchedule
);

router.post(
  "/getServiceScheduleById",
  schedulerMid.checkScheduleExistMid,
  schedulerController.getServiceScheduleByIdController
);

router.post(
  "/getAllScheduleForUser",
  schedulerController.getAllScheduleForUserController
);

router.post(
  "/cancelServiceSchedule",
  requireOnlyNormUser,
  schedulerMid.checkScheduleExistMid,
  schedulerMid.checkRighToChangeServiceScheduleStatus,
  schedulerMid.preCancelServiceSchedule,
  schedulerController.cancelScheduleController
);

router.post(
  "/followShop",
  shopMid.checkShopExistsMid,
  userControler.userFollowShopController
);

router.post(
  "/unfollowShop",
  shopMid.checkShopExistsMid,
  userControler.userUnFollowShopController
);

router.post("/getListFollowedShop", userControler.getListOfFollowedShop);

router.post(
  "/getMyVoteForService",
  shopMid.checkServiceExistsMid,
  userControler.getMyVoteForServiceController
);

module.exports = router;
