const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ShopDescription } = require("./shopStructure");

const getAllServicesOfShop = async (shop_id) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection.find({ shopId: shop_id }).toArray();
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => data)
    .catch((err) => []);
};

const getServiceOfShopByServiceName = async (service_name, shop_id) => {
  shop_id = parseInt(shop_id);
  service_name = service_name.trim();
  async function executor(collection) {
    return await collection
      .find({ shopId: shop_id, serviceName: service_name })
      .toArray();
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => data)
    .catch((err) => []);
};

// (async () => {
//   const data = await getServiceOfShopByServiceName("dịch vụ tốt", 531);
//   console.log(data);
// })();

module.exports = { getAllServicesOfShop, getServiceOfShopByServiceName };
