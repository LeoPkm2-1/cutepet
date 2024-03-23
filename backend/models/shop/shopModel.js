const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ShopDescription } = require("./shopStructure");
const { ObjectId } = require("mongodb");

const getAllServicesOfShop = async (shop_id) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection.find({ shopId: shop_id }).toArray();
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) =>
      data.map((service) => {
        return { ...service, _id: service._id.toString() };
      })
    )
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
    .then((data) =>
      data.map((service) => {
        return { ...service, _id: service._id.toString() };
      })
    )
    .catch((err) => []);
};

const getServiceById = async (service_id) => {
  service_id = service_id.trim();
  async function executor(collection) {
    return await collection.findOne({ _id: new ObjectId(service_id) });
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => data)
    .catch((err) => {});
};

// (async () => {
//   const data = await getServiceById("65fe53fb707c456043b02744");
//   console.log(data);
// })();

module.exports = { getAllServicesOfShop, getServiceOfShopByServiceName };
