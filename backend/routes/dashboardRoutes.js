const express = require("express");
const router = express.Router();
const dashBoardController = require("./../controllers/dashBoardController");
const {
  requireLoginedForShop,
  nonRequireLogined,
  requireLoginedForNormUser,
  requireOnlyNormUser,
} = require("../middlewares/auth");
const dashboardMid = require("../middlewares/dashboardMid");
const shopMid = require("../middlewares/shopMid");

router.post(
  "/numFollowerOfShop",
  requireLoginedForNormUser,
  shopMid.checkShopExistsMid,
  dashBoardController.getNumOfFollewrsForShop
);

router.post(
  "/getListFollowersOfShop",
  requireLoginedForNormUser,
  shopMid.checkShopExistsMid,
  dashboardMid.preGetFollowerOfShop,
  dashBoardController.getFollowerInforOfShopByTimeRange
);

router.post(
  "/filterSchedulesListForShop",
  requireLoginedForShop,
  shopMid.preFilterScheduleForShop,
  dashBoardController.filterSchedulesListForShopController
);

module.exports = router;
