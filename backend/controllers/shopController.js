const shopDescriptionModel = require("../models/shop/shopDescriptionModel");
const { Response } = require("./../utils/index");
const userHelper = require("./../utils/userHelper");
const getShopInforByIdController = async (req, res) => {
  try {
    const shop_id = parseInt(req.body.shop_id);
    // console.log({ shop_id });
    const shopInfor = await userHelper.getUserPublicInforByUserId(shop_id);
    const SHOP_NOT_EXISTS_MSG = "Cửa hàng không tồn tại";
    if (
      Object.keys(shopInfor).length == 0 ||
      shopInfor.vai_tro.roleDescription != "cua_hang"
    ) {
      res
        .status(400)
        .json(new Response(400, {}, SHOP_NOT_EXISTS_MSG, 300, 300));
      return;
    } else {
      res.status(200).json(new Response(200, { ...shopInfor }, "", 300, 300));
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
  let url_cover_anh = req.body.url_cover_anh;
  if (typeof url_cover_anh != "string" || url_cover_anh.trim() == "") {
    res
      .status(400)
      .json(
        new Response(400, "", "Vui lòng nhập url của ảnh bìa hợp lệ", 300, 300)
      );
    return;
  }
  const data = await shopDescriptionModel
    .updateCoverImageForShop(shop_id, url_cover_anh.trim())
    .then((data) => data.payload)
    .catch((err) => err);
  res.status(200).json(new Response(200, {}, "cập nhật thành công"));
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

  // console.log(req.body);
  res.send("hihi");
};

module.exports = {
  getShopInforByIdController,
  updateInforForShopController,
  updateCoverImgForShop,
};
