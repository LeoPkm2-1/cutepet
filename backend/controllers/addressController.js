const diaChiHanhChinhModel = require("../models/diaChi/diaChiHanhChinhModel");
const { Response, readENV } = require("./../utils/index");

const getAllProvincesController = async (req, res) => {
  const provinces_list = await diaChiHanhChinhModel.getAllProvinces();
  res.status(200).json(new Response(200, provinces_list, ""));
};

const getAllDistrictInProvinceController = async (req, res) => {
  const { province_id } = req.body;
  const districts_list = await diaChiHanhChinhModel.getAllDistrictsByProvinceId(
    province_id
  );
  res.status(200).json(new Response(200, districts_list, ""));
};

const getAllWardsInDistrictController = async (req, res) => {
  const { district_id } = req.body;
  const wards_list = await diaChiHanhChinhModel.getAllWardsByDistrictId(
    district_id
  );
  res.status(200).json(new Response(200, wards_list, ""));
};

module.exports = {
  getAllProvincesController,
  getAllDistrictInProvinceController,
  getAllWardsInDistrictController,
};
