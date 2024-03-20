const express = require("express");
const router = express.Router();
const {
  requireLoginedForShop,
  nonRequireLogined,
  requireLoginedForNormUser,
} = require("../middlewares/auth");
const shopController = require("./../controllers/shopController");
const shopMid = require("./../middlewares/shopMid");

router.use("/requireLoginedForNormUser", requireLoginedForNormUser);
router.post("/getShopInforById", shopController.getShopInforByIdController);
router.use(requireLoginedForShop);
router.post(
  "/updateShopInfor",
  shopMid.updateInforMid,
  shopController.updateInforForShopController
);

router.post("/updateShopCoverImage", shopController.updateCoverImgForShop);
module.exports = router;
