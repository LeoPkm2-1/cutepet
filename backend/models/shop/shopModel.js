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
  // console.log({ service_id });
  async function executor(collection) {
    return await collection.findOne({ _id: new ObjectId(service_id) });
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => {
      if (typeof data == "undefined" || data == null) return {};
      // console.log({ data });
      return { ...data, _id: data._id.toString() };
    })
    .catch((err) => {});
};

// (async () => {
//   const data = await getServiceById("660061e055f0ed139ca9eb81222");
//   console.log(data);
// })();

module.exports = {
  getAllServicesOfShop,
  getServiceOfShopByServiceName,
  getServiceById,
};
