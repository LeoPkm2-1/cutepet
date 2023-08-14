const express = require('express');
const router = express.Router();
const giongLoaiController = require('./../controllers/giongLoaiController');

router.get('/danhsachloai', giongLoaiController.getDanhSachLoai);
router.get('/danhsachgiong', giongLoaiController.getDanhSachGiong);
router.get(
	'/danhsachgiong/:ma_loai',
	giongLoaiController.getDanhSachGiongTheoMaLoai
);

module.exports = router;
