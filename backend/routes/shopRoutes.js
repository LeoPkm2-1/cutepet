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
  ["/getShopInforById", "/getAllAvailableServiceOfShop", "/voteService"],
  requireLoginedForNormUser
);

router.post("/getShopInforById", shopController.getShopInforByIdController);
router.post(
  "/getAllAvailableServiceOfShop",
  requireLoginedForNormUser,
  shopMid.checkShopExistsMid,
  shopController.getAllAvailableServicesOfShop
);

router.post(
  "/voteService",
  shopMid.checkServiceExistsMid,
  shopMid.preProcessVotingService,
  shopController.votingServiceController
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
