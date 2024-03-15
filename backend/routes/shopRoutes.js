const express = require("express");
const router = express.Router();
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");
const shopController = require("./../controllers/shopController");

router.use(requireLogined);
router.post("/getShopInforById", shopController.getShopInforByIdController);

module.exports = router;
