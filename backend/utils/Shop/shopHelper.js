const shopDescriptionModel = require("../../models/shop/shopDescriptionModel");

const isShopExist = async (shop_id) => {
  const data = await shopDescriptionModel.getDescriptionInforOfShop(shop_id);
//   console.log(data);
  return Object.keys(data).length > 0;
};

module.exports = {
  isShopExist,
};
