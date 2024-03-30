const express = require("express");
const router = express.Router();
const {
  requireLoginedForShop,
  nonRequireLogined,
  requireLoginedForNormUser,
} = require("../middlewares/auth");
const shopController = require("./../controllers/shopController");
const shopMid = require("./../middlewares/shopMid");

router.use(
  [
    "/getShopInforById",
    "/getAllAvailableServiceOfShop",
    "/voteService",
    "/getServiceById",
    "/categoriesForService",
  ],
  requireLoginedForNormUser
);

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

module.exports = router;
