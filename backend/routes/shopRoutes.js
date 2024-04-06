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
  schedulerController.cancelScheduleOfUser
);

module.exports = router;
