const anhNguoiDungModel = require("../../models/anhNguoiDungModel");
const shopDescriptionModel = require("../../models/shop/shopDescriptionModel");
const shopModel = require("../../models/shop/shopModel");
const shopServiceModel = require("../../models/shop/shopServiceModel");
const userModel = require("../../models/userModel");
const userRoleModel = require("../../models/userRoleModel");
const userHelper = require("../userHelper");

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

const getPublicInforForShopById = async (shop_id) => {
  const shopExist = await isShopExist(shop_id);
  if (!shopExist) {
    return {};
  }
  const shopBasicInfor = await userModel.getUserById(shop_id).then((data) => {
    let userInfor = data.payload[0];
    userInfor = { ma_cua_hang: userInfor.ma_nguoi_dung, ...userInfor };
    // delete userInfor.ma_nguoi_dung;
    delete userInfor.mat_khau;
    delete userInfor.gioi_tinh;
    delete userInfor.token;
    return userInfor;
  });
  const vai_tro = userRoleModel.getFullRoleByIndex(shopBasicInfor.user_type);
  const anh = await anhNguoiDungModel
    .getAnhDaiDienHienTai(shopBasicInfor.ma_cua_hang)
    .then((data) =>
      data.payload.length > 0
        ? data.payload[0]
        : {
            ma_anh: null,
            url: "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2FUser-avatar.svg.png?alt=media&token=8fc5e517-78a1-4f12-84fa-2f18245f1dc9",
            ngay_cap_nhat: null,
            ma_nguoi_dung: `${shopBasicInfor.ma_nguoi_dung}`,
            is_active: null,
          }
    );

  const shopAdditionInfor = await shopDescriptionModel
    .getDescriptionInforOfShop(shop_id)
    .then((data) => {
      return {
        ...data,
        _id: data._id.toString(),
      };
    });

  return {
    ...shopBasicInfor,
    vai_tro,
    anh,
    shopAdditionInfor,
  };
};

// (async function () {
//   const a = await getPublicInforForShopById(533);
//   console.log({ a });
// })();

const checkServiceBelongToShopById = async (service_id, shop_id) => {};

module.exports = {
  isShopExist,
  isNameServiceExistsInShop,
  getPublicInforForShopById,
};
