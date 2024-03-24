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
  ["/getShopInforById", "/getAllAvailableServiceOfShop"],
  requireLoginedForNormUser
);

router.post("/getShopInforById", shopController.getShopInforByIdController);
router.post(
  "/getAllAvailableServiceOfShop",
  requireLoginedForNormUser,
  shopMid.checkShopExistsMid,
  shopController.getAllAvailableServicesOfShop
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

module.exports = router;
