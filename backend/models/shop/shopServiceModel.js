const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ShopDescription } = require("./shopStructure");
const shopServiceStructure = require("./shopServiceStructure");

const addServiceForShop = async (
  service_name,
  shop_id,
  service_description = "",
  service_img_url = "",
  service_type = [],
  price_quotation = 0,
  duration = -1
) => {
  const serviceObj = new shopServiceStructure.ShopService(
    service_name,
    shop_id,
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

// (async () => {
//   await addServiceForShop("1", 1);
// })();

module.exports = { addServiceForShop };
