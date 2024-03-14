const express = require("express");
const router = express.Router();
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");
const { handleConfirmRegisterForShop } = require("../controllers/registerController");


router.post("/confirmRegisterForShop",handleConfirmRegisterForShop)


module.exports = router;
