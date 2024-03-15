// const { use } = require("../routes");
const diaChiModel = require("../models/diaChi/diaChiModel");
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
      const diaChi = await diaChiModel.getAddressOfShopById(
        shopInfor.ma_nguoi_dung
      );
      res
        .status(200)
        .json(new Response(200, { ...shopInfor, diaChi }, "", 300, 300));
    }
  } catch (error) {
    res
      .status(400)
      .json(new Response(400, error, "some_thing_wrong", 300, 300));
  }
};

module.exports = {
  getShopInforByIdController,
};
