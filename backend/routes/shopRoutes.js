const express = require("express");
const router = express.Router();
const {
  requireLoginedForShop,
  nonRequireLogined,
  requireLoginedForNormUser,
  requireOnlyNormUser,
} = require("../middlewares/auth");
const shopController = require("./../controllers/shopController");
const shopMid = require("./../middlewares/shopMid");
const schedulerMid = require("../middlewares/schedulerMid");
const schedulerController = require("../controllers/schedulerController");

router.use(
  [
    "/getShopInforById",
    "/getAllAvailableServiceOfShop",
    "/getServiceById",
    "/categoriesForService",
    "/filterServices",
    "/getAllStatusOfSchedule",
  ],
  requireLoginedForNormUser
);

router.use("/voteService", requireOnlyNormUser);

router.post("/getShopInforById", shopController.getShopInforByIdController);
router.post("/categoriesForService", shopController.categoriesForService);
router.post(
  "/getAllAvailableServiceOfShop",
  requireLoginedForNormUser,
  shopMid.checkShopExistsMid,
  shopController.getAllAvailableServicesOfShop
);

router.post(
  "/getServiceById",
  shopMid.checkServiceExistsMid,
  shopController.getServiceByIdController
);

router.post(
  "/voteService",
  shopMid.checkServiceExistsMid,
  shopMid.preProcessVotingService,
  shopController.votingServiceController
);
router.post(
  "/getVoteInforBefore",
  shopMid.checkServiceExistsMid,
  shopMid.getVoteInforBeforeTime,
  shopController.getVoteInforBeforeController
);

router.post(
  "/filterServices",
  shopMid.filterServiceCheckParamMid_v1,
  shopMid.filterServiceCheckParamMid_v2,
  shopController.filterServiceController
);

router.post(
  "/getAllStatusOfSchedule",
  schedulerController.getListStatusOfSchedule
);

// shop acess=================================================================

router.use(requireLoginedForShop);
router.post(
  "/updateShopInfor",
  shopMid.updateInforMid,
  shopController.updateInforForShopController
);

router.post("/updateShopCoverImage", shopController.updateCoverImgForShop);
router.post("/updateShopMainImage", shopController.updateMainImgForShop);
router.post(
  "/addService",
  shopMid.addServiceMid,
  shopController.addServiceForShop
);

router.post(
  "/deleteService",
  shopMid.checkRightToChangeServiceMid,
  shopController.deleteServiceOfShop
);

router.post(
  "/updateService",
  shopMid.checkRightToChangeServiceMid,
  shopController.updateServiceOfShop
);

router.post(
  "/cancelServiceSchedule",
  schedulerMid.checkScheduleExistMid,
  schedulerMid.checkRighToChangeServiceScheduleStatus,
  schedulerMid.preCancelServiceSchedule,
  schedulerController.cancelScheduleController
);
router.post(
  "/confirmServiceSchedule",
  schedulerMid.checkScheduleExistMid,
  schedulerMid.checkRighToChangeServiceScheduleStatus,
  schedulerMid.preConfirmServiceSchedule,
  schedulerController.confirmServiceScheduleController
);

router.post(
  "/getAllScheduleForShop",
  schedulerController.getAllScheduleForShopController
);

router.post("/getListUserFollowShop", shopController.getListUserFollowShop);

router.post(
  "/changeStatusOfServiceSchedule",
  schedulerMid.checkScheduleExistMid,
  schedulerMid.checkRighToChangeServiceScheduleStatus,
  schedulerController.changeScheduleStatusController
);

router.post(
  "/getServiceScheduleById",
  schedulerMid.checkScheduleExistMid,
  schedulerMid.checkRighToChangeServiceScheduleStatus,
  schedulerController.getServiceScheduleByIdController
);

module.exports = router;
