const diaChiHanhChinhModel = require("../models/diaChi/diaChiHanhChinhModel");

const isProvinceExistById = async (province_id) => {
  const province_infor = await diaChiHanhChinhModel.getProvinceById(
    province_id
  );
  //   console.log({province_infor});
  return Object.keys(province_infor).length > 0;
};

const isDistrictExistById = async (district_id) => {
  const district_infor = await diaChiHanhChinhModel.getDistrictById(
    district_id
  );
  //   console.log({district_infor});
  return Object.keys(district_infor).length > 0;
};

// (async () => {
//    const data =await isProvinceExistById('66169cdfcf40fa5369bd57e5')
//    console.log({data});
// })()

module.exports = {
  isProvinceExistById,
  isDistrictExistById,
};
