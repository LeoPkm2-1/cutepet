const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ShopDescription } = require("./shopStructure");
const shopServiceStructure = require("./shopServiceStructure");
const { ObjectId } = require("mongodb");

const addServiceForShop = async (
  service_name,
  shop_id,
  short_description = "",
  service_description = "",
  service_img_url = "",
  service_type = [],
  price_quotation = 0,
  duration = -1
) => {
  const serviceObj = new shopServiceStructure.ShopService(
    service_name,
    shop_id,
    short_description,
    service_description,
    service_img_url,
    service_type,
    price_quotation,
    duration
  );
  async function executor(collection) {
    return await collection.insertOne(serviceObj);
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const deleteServiceForShop = async (service_id) => {
  service_id = service_id.trim();
  async function executor(collection) {
    return await collection.deleteOne({ _id: new ObjectId(`${service_id}`) });
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      return new Response(400, err, "", 300, 300);
    });
};

// (async () => {
//  const data = await deleteServiceForShop("660061e055f0ed139ca9eb89");
//  console.log(data);
// })();

module.exports = { addServiceForShop, deleteServiceForShop };
