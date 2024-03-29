const shopDescriptionModel = require("../../models/shop/shopDescriptionModel");
const shopModel = require("../../models/shop/shopModel");
const shopServiceModel = require("../../models/shop/shopServiceModel");

const isShopExist = async (shop_id) => {
  const data = await shopDescriptionModel.getDescriptionInforOfShop(shop_id);
  return Object.keys(data).length > 0;
};

const isNameServiceExistsInShop = async (service_name, shop_id) => {
  shop_id = parseInt(shop_id);
  service_name = service_name.trim();
  const serviceslist = await shopServiceModel.getServiceOfShopByServiceName(
    service_name,
    shop_id
  );
  if (serviceslist.length <= 0) {
    return false;
  }
  return true;
  console.log(serviceslist);
  console.log({ length: serviceslist.length });
};

const checkServiceBelongToShopById = async (service_id, shop_id) => {};

module.exports = {
  isShopExist,
  isNameServiceExistsInShop,
};
