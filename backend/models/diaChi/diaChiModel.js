const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const diaChiStructure = require("./diaChiStructure");

const addAddressForShop = async (user_id, address_obj) => {
  const address_infor = new diaChiStructure.ShopAddress(user_id, address_obj);
  async function executor(collection) {
    return await collection.insertOne(address_infor);
  }
  return await nonSQLQuery(executor, "DiaChi")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAddressOfShopById = async (shop_id) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection.findOne({
      accountId: shop_id,
      type: diaChiStructure.ShopAddress.type,
    });
  }
  return await nonSQLQuery(executor, "DiaChi")
    .then((data) => {
      if (typeof data == "undefined" || data == null) {
        return {};
      }
      return data;
    })
    .catch((err) => new Response(400, {}, "", 300, 300));
};

// (async () => {
//   const data_1 = await getAddressOfShopById(5280);
//   console.log({ data_1 });
// })();

module.exports = { addAddressForShop, getAddressOfShopById };
