const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ShopDescription } = require("./shopStructure");
const addDescriptionInforOfShop = async (
  shop_id,
  address_object = {},
  sologan = "",
  description_msg = "",
  time_serving = "",
  cover_image_Url = "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2Fanh_bia_shop.jpg?alt=media&token=3ce38cb4-2ae7-4548-9aee-375b1d2584cb"
) => {
  const descriptionInfor = new ShopDescription(
    shop_id,
    address_object,
    sologan,
    description_msg,
    time_serving,
    cover_image_Url
  );

  async function executor(collection) {
    return await collection.insertOne(descriptionInfor);
  }
  return await nonSQLQuery(executor, "ThongTinMoTaCuaHang")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getDescriptionInforOfShop = async (shop_id) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection.findOne({
      shopId: shop_id,
      type: ShopDescription.type,
    });
  }
  return await nonSQLQuery(executor, "ThongTinMoTaCuaHang")
    .then((data) => {
      if (typeof data == "undefined" || data == null) {
        return {};
      }
      return data;
    })
    .catch(
      (err) =>
        new Response(
          400,
          {},
          "đã có lỗi xảy rả ở getDescriptionInforOfShop",
          300,
          300
        )
    );
};

const updateCoverImageForShop = async (shop_id, cover_image_url) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection.updateOne(
      { shopId: shop_id },
      { $set: { coverImageUrl: cover_image_url } }
    );
  }
  return await nonSQLQuery(executor, "ThongTinMoTaCuaHang")
    .then((data) => new Response(200, data, ""))
    // .then(data=>data)
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateShopInforNotCoverImage = async (
  shop_id,
  dia_chi,
  khau_hieu,
  mo_ta_cua_hang,
  thoi_gian_lam_viec
) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection.updateOne(
      { shopId: shop_id },
      {
        $set: {
          addressInfor: dia_chi,
          sologan: khau_hieu,
          descriptionMsg: mo_ta_cua_hang,
          timeServing: thoi_gian_lam_viec,
        },
      }
    );
  }
  return await nonSQLQuery(executor, "ThongTinMoTaCuaHang")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async () => {
//   const data = await updateShopInforNotCoverImage(531,
//     {sonha:100,tinh:'HN'},"test","pet",1)
//     console.log(data);
// })()

module.exports = {
  addDescriptionInforOfShop,
  getDescriptionInforOfShop,
  updateCoverImageForShop,
  updateShopInforNotCoverImage,
};
