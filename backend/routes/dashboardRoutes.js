const express = require("express");
const router = express.Router();
const dashBoardController = require("./../controllers/dashBoardController");
const {
  requireLoginedForShop,
  nonRequireLogined,
  requireLoginedForNormUser,
  requireOnlyNormUser,
} = require("../middlewares/auth");
router.post(
  "/numFollowerOfShop",
  requireLoginedForNormUser,
  dashBoardController.getNumOfFollewrsForShop
);

module.exports = router;
