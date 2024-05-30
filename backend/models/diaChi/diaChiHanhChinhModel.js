const { sqlQuery, nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { ObjectId } = require("mongodb");

const getAllProvinces = async () => {
  async function executor(collection) {
    return await collection
      .find({
        type: "PROVINCE",
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) =>
      data.map((province) => {
        return { ...province, _id: province._id.toString() };
      })
    )
    .catch((err) => []);
};

const getProvinceById = async (province_id) => {
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(province_id),
      type: "PROVINCE",
    });
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) => (!data ? {} : { ...data, _id: data._id.toString() }))
    .catch((err) => {});
};

const getProvinceByCode = async (province_code) => {
  async function executor(collection) {
    return await collection.findOne({
      code: parseInt(province_code),
      type: "PROVINCE",
    });
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) => (!data ? {} : { ...data, _id: data._id.toString() }))
    .catch((err) => {});
};

const getAllDistrict = async () => {
  async function executor(collection) {
    return await collection
      .find({
        type: "DISTRICT",
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) =>
      data.map((province) => {
        return { ...province, _id: province._id.toString() };
      })
    )
    .catch((err) => []);
};

const getDistrictById = async (district_id) => {
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(district_id),
      type: "DISTRICT",
    });
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) => (!data ? {} : { ...data, _id: data._id.toString() }))
    .catch((err) => {});
};

const getDistrictByCode = async (district_code) => {
  async function executor(collection) {
    return await collection.findOne({
      code: parseInt(district_code),
      type: "DISTRICT",
    });
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) => (!data ? {} : { ...data, _id: data._id.toString() }))
    .catch((err) => {});
};

const getAllWards = async () => {
  async function executor(collection) {
    return await collection
      .find({
        type: "WARD",
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) =>
      data.map((province) => {
        return { ...province, _id: province._id.toString() };
      })
    )
    .catch((err) => []);
};

const getWardById = async (ward_id) => {
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(ward_id),
      type: "WARD",
    });
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) => (!data ? {} : { ...data, _id: data._id.toString() }))
    .catch((err) => {});
};

const getWardByCode = async (ward_code) => {
  async function executor(collection) {
    return await collection.findOne({
      code: parseInt(ward_code),
      type: "WARD",
    });
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) => (!data ? {} : { ...data, _id: data._id.toString() }))
    .catch((err) => {});
};

const getAllDistrictsByProvinceCode = async (province_code) => {
  async function executor(collection) {
    return await collection
      .find({
        type: "DISTRICT",
        province_code: parseInt(province_code),
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) =>
      data.map((province) => {
        return { ...province, _id: province._id.toString() };
      })
    )
    .catch((err) => []);
};

const getAllDistrictsByProvinceId = async (province_id) => {
  const province_infor = await getProvinceById(province_id);
  // console.log({ province_infor });
  if (Object.keys(province_infor).length == 0) {
    return [];
  }
  return await getAllDistrictsByProvinceCode(province_infor.code);
};

const getProvinceInforByDistrictId = async (district_id) => {
  const district_infor = await getDistrictById(district_id);
  // console.log({ district_infor });
  if (Object.keys(district_infor).length == 0) {
    return [];
  }
  return await getProvinceByCode(district_infor.province_code);
};

const getProvinceInforByDistrictCode = async (district_code) => {
  const district_infor = await getDistrictByCode(district_code);
  // console.log({ district_infor });
  if (Object.keys(district_infor).length == 0) {
    return [];
  }
  return await getProvinceByCode(district_infor.province_code);
};

const getAllWardsByDistrictCode = async (district_code) => {
  async function executor(collection) {
    return await collection
      .find({
        type: "WARD",
        district_code: parseInt(district_code),
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "DiaChiHanhChinhVN")
    .then((data) =>
      data.map((province) => {
        return { ...province, _id: province._id.toString() };
      })
    )
    .catch((err) => []);
};

const getAllWardsByDistrictId = async (district_id) => {
  const district_infor = await getDistrictById(district_id);
  // console.log({ district_infor });
  if (Object.keys(district_infor).length == 0) {
    return [];
  }
  return await getAllWardsByDistrictCode(district_infor.code);
};

const getDistrictInforByWardCode = async (ward_code) => {
  const ward_infor = await getWardByCode(ward_code);
  // console.log({ ward_infor });
  if (Object.keys(ward_infor).length == 0) {
    return [];
  }
  return await getDistrictByCode(ward_infor.district_code);
};

const getDistrictInforByWardId = async (ward_id) => {
  const ward_infor = await getWardById(ward_id);
  // console.log({ ward_infor });
  if (Object.keys(ward_infor).length == 0) {
    return [];
  }
  return await getDistrictByCode(ward_infor.district_code);
};
// (async function () {
//   const data = await getDistrictInforByWardId("66169cdfcf40fa5369bd5ae6");
//   console.log({ data });
// })();

module.exports = {
  getAllProvinces,
  getProvinceById,
  getProvinceByCode,
  getAllDistrict,
  getDistrictById,
  getDistrictByCode,
  getAllWards,
  getWardById,
  getWardByCode,

  getAllDistrictsByProvinceCode,
  getAllDistrictsByProvinceId,
  getProvinceInforByDistrictId,
  getProvinceInforByDistrictCode,

  getAllWardsByDistrictCode,
  getAllWardsByDistrictId,
  getDistrictInforByWardCode,
  getDistrictInforByWardId,
};
