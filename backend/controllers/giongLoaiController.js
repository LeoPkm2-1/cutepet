const giongloaiModel = require("./../models/giongLoaiModel");
const { Response } = require("./../utils/index");

const getDanhSachLoai = async (req, res) => {
  const loai = await giongloaiModel.getLoai().then((data) => data.payload);
  res.status(200).json(new Response(200, loai, ""));
};
const getDanhSachGiong = async (req, res) => {
  const giong = await giongloaiModel.getGiong().then((data) => data.payload);
  res.status(200).json(new Response(200, giong, ""));
};
const getDanhSachGiongTheoMaLoai = async (req, res) => {
  const ma_loai = req.body.ma_loai;
  const giong = await giongloaiModel
    .getGiongByMaLoai(ma_loai)
    .then((data) => data.payload);
  res.status(200).json(new Response(200, giong, ""));
};


module.exports = {
  getDanhSachLoai,
  getDanhSachGiong,
  getDanhSachGiongTheoMaLoai,
};
