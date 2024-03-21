const anhNguoiDungModel = require("../models/anhNguoiDungModel");
const shopDescriptionModel = require("../models/shop/shopDescriptionModel");
const userModel = require("../models/userModel");
const { Response } = require("./../utils/index");
const userHelper = require("./../utils/userHelper");

const getShopInforByIdController = async (req, res) => {
  try {
    const shop_id = parseInt(req.body.shop_id);
    // console.log({ shop_id });
    const shop_basic_infor = await userHelper.getUserPublicInforByUserId(
      shop_id
    );
    const SHOP_NOT_EXISTS_MSG = "Cửa hàng không tồn tại";
    if (
      Object.keys(shop_basic_infor).length == 0 ||
      shop_basic_infor.vai_tro.roleDescription != "cua_hang"
    ) {
      res
        .status(400)
        .json(new Response(400, {}, SHOP_NOT_EXISTS_MSG, 300, 300));
      return;
    } else {
      const shop_detail_infor =
        await shopDescriptionModel.getDescriptionInforOfShop(shop_id);
      res
        .status(200)
        .json(
          new Response(
            200,
            { ...shop_basic_infor, shopInfor: shop_detail_infor },
            "",
            300,
            300
          )
        );
      return;
    }
  } catch (error) {
    res
      .status(400)
      .json(new Response(400, error, "some_thing_wrong", 300, 300));
  }
};

const updateCoverImgForShop = async (req, res) => {
  const shop_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  let url_anh_bia = req.body.url_anh_bia;
  if (typeof url_anh_bia != "string" || url_anh_bia.trim() == "") {
    res
      .status(400)
      .json(
        new Response(400, "", "Vui lòng nhập url của ảnh bìa hợp lệ", 300, 300)
      );
    return;
  }
  const data = await shopDescriptionModel
    .updateCoverImageForShop(shop_id, url_anh_bia.trim())
    .then((data) => data.payload)
    .catch((err) => err);
  res.status(200).json(new Response(200, {}, "cập nhật thành công"));
};

const updateMainImgForShop = async (req, res) => {
  const shop_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  let url_anh_chinh = req.body.url_anh_chinh;
  if (typeof url_anh_chinh != "string" || url_anh_chinh.trim() == "") {
    res
      .status(400)
      .json(
        new Response(400, "", "Vui lòng nhập url của ảnh hợp lệ", 300, 300)
      );
    return;
  }

  const updateAvatarProcess = await anhNguoiDungModel
    .CapNhatAnhDaiDienNguoiDung(url_anh_chinh.trim(), shop_id)
    .then((data) => data.payload);
  updateAvatarProcess.insertId = Number(updateAvatarProcess.insertId);
  // console.log(updateAvatarProcess);
  res
    .status(200)
    .json(
      new Response(
        200,
        updateAvatarProcess,
        "Cập nhật ảnh đại diện thành công cho cửa hàng"
      )
    );
};

const updateInforForShopController = async (req, res) => {
  const {
    ten_cua_hang,
    dia_chi,
    so_dien_thoai,
    khau_hieu,
    mo_ta_cua_hang,
    thoi_gian_lam_viec,
  } = req.body;
  const shop_id = req.auth_decoded.ma_cua_hang;
  // cập nhật thông tin cơ bản của cửa hàng

  const updateBasicInforProcess = await userModel
    .updateUserBasicInfor(shop_id, {
      ten: ten_cua_hang,
      ngay_sinh: null,
      so_dien_thoai,
      gioi_tinh: null,
    })
    .then((data) => data)
    .catch((err) => err);
  

  // cập nhật thông tin mô tả chi tiết của cửa hàng
  const updateDescriptInforProcess = await shopDescriptionModel
    .updateShopInforNotCoverImage(
      shop_id,
      dia_chi,
      khau_hieu,
      mo_ta_cua_hang,
      thoi_gian_lam_viec
    )
    .then((data) => data)
    .catch((err) => err);
  // console.log(updateDescriptInforProcess);
  res
    .status(200)
    .json(new Response(200, {}, "Cập nhật thành công thông tin cửa hàng"));
};

module.exports = {
  getShopInforByIdController,
  updateInforForShopController,
  updateCoverImgForShop,
  updateMainImgForShop,
};
