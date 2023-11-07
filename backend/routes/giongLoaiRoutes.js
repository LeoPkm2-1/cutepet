const express = require("express");
const router = express.Router();
const giongLoaiController = require("./../controllers/giongLoaiController");

router.post("/danhsachloai", giongLoaiController.getDanhSachLoai);
// router.get("/danhsachgiong", giongLoaiController.getDanhSachGiong);
router.post(
  "/danhsachgiongTheoLoai",
  giongLoaiController.getDanhSachGiongTheoMaLoai
);

module.exports = router;
