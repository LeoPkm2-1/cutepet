const express = require("express");
const addressController = require("../controllers/addressController");

const router = express.Router();

router.post(
  "/hanhchinh/getAllProvinces",
  addressController.getAllProvincesController
);

router.post(
  "/hanhchinh/getAllDistrictsOfProvince",
  addressController.getAllDistrictInProvinceController
);

router.post(
  "/hanhchinh/getAllWardsOfDistrict",
  addressController.getAllWardsInDistrictController
);

module.exports = router;
