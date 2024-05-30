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
  duration = -1,
  petSpecies
) => {
  const serviceObj = new shopServiceStructure.ShopService(
    service_name,
    shop_id,
    short_description,
    service_description,
    service_img_url,
    service_type,
    price_quotation,
    duration,
    petSpecies
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

const updateServiceForShop = async (
  service_id,
  service_name,
  short_description = "",
  service_description = "",
  service_img_url = "",
  service_type = [],
  price_quotation = 0,
  duration = 0,
  petSpecies
) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(service_id) },
      {
        $set: {
          serviceName: `${service_name}`,
          shortDescription: short_description,
          serviceDescription: service_description,
          serviceImgUrl: service_img_url,
          serviceType: service_type,
          priceQuotation: price_quotation,
          duration: duration,
          petSpecies: petSpecies,
        },
      }
    );
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => new Response(200, data, ""))
    .catch((err) => {
      console.log(err);
      return new Response(400, err, "", 300, 300);
    });
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

const addVoteForService = async (
  service_id,
  user_Voting_id,
  num_of_star = 1,
  content = "",
  create_at = new Date(),
  modified_at = null
) => {
  const voteObject = new shopServiceStructure.VoteForService(
    service_id,
    user_Voting_id,
    num_of_star,
    content,
    create_at,
    modified_at
  );
  async function executor(collection) {
    return await collection.insertOne(voteObject);
  }
  return await nonSQLQuery(executor, "DanhGiaDichVu")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateVoteForService = async (
  service_id,
  user_Voting_id,
  num_of_star = 1,
  content = ""
) => {
  async function executor(collection) {
    return await collection.updateOne(
      { serviceId: service_id, userVotingId: user_Voting_id },
      {
        $set: { numOfStar: num_of_star, content: content },
      }
    );
  }
  return await nonSQLQuery(executor, "DanhGiaDichVu")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getUserVotingServiceInfor = async (user_Voting_id, service_id) => {
  async function executor(collection) {
    return await collection.findOne({
      serviceId: service_id,
      userVotingId: user_Voting_id,
    });
  }
  return await nonSQLQuery(executor, "DanhGiaDichVu")
    .then((data) => {
      if (typeof data == "undefined" || data == null) return {};
      return { ...data, _id: data._id.toString() };
    })
    .catch((err) => {});
};

const hasUserVoteService = async (user_Voting_id, service_id) => {
  const votingInfor = await getUserVotingServiceInfor(
    user_Voting_id,
    service_id
  );
  // console.log({ votingInfor });
  if (Object.keys(votingInfor).length === 0) return false;
  return true;
};

const getVoteInforBeforeTime = async (service_id, before, num) => {
  async function executor(collection) {
    return await collection
      .find({
        $and: [
          { serviceId: service_id },
          {
            createAt: {
              $lte: before,
            },
          },
        ],
      })
      .limit(num)
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "DanhGiaDichVu")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getAllVoteOfService = async (service_id) => {
  async function executor(collection) {
    return await collection
      .find({
        serviceId: service_id,
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "DanhGiaDichVu")
    .then((data) => {
      if (typeof data == "undefined" || data == null || data.length == 0)
        return [];
      return data.map((vote_Infor) => {
        return { ...vote_Infor, _id: vote_Infor._id.toString() };
      });
    })
    .catch((err) => []);
};

const updateAverageStarForService = async (service_id, average_star) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(service_id) },
      {
        $set: {
          numOfStar: average_star,
        },
      }
    );
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => new Response(200, data, "cập nhật thành công"))
    .catch((err) => new Response(400, err, "đã có lỗi", 300, 300));
};

const getAllCategoriesForService = () => {
  return [
    "CHĂM SÓC",
    "TẮM",
    "LÀM ĐẸP",
    "CẮT TỈA LÔNG",
    "NHUỘM LÔNG",
    "VỆ SINH TAI",
    "LÀM MÓNG",
    "KHÁM BỆNH",
    "CHỮA BỆNH",
    "KHÁC",
  ];
};

const filterServiceByCustomAggregate = async (aggregateArray) => {
  async function executor(collection) {
    return await collection.aggregate(aggregateArray).toArray();
  }
  return await nonSQLQuery(executor, "DichVuCuaCuaHang")
    .then((data) => new Response(200, data, "cập nhật thành công"))
    .catch((err) => new Response(400, err, "đã có lỗi", 300, 300));
};

const getVoteInforOfUserForServiceById = async (user_id, service_id) => {
  user_id = parseInt(user_id);
  async function executor(collection) {
    return await collection.findOne({
      serviceId: service_id,
      userVotingId: user_id,
    });
  }
  return await nonSQLQuery(executor, "DanhGiaDichVu")
    .then((data) => {
      return data
        ? {
            ...data,
            _id: data._id.toString(),
          }
        : {};
    })
    .catch((err) => new Response(400, err, "đã có lỗi", 300, 300));
};
const getAllVoteForServicesList = async (list_of_service_id) => {
  async function executor(collection) {
    return await collection
      .find({
        serviceId: {
          $in: list_of_service_id,
        },
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "DanhGiaDichVu")
    .then((data) => {
      if (typeof data == "undefined" || data == null || data.length == 0)
        return [];
      return data.map((vote_Infor) => {
        return { ...vote_Infor, _id: vote_Infor._id.toString() };
      });
    })
    .catch((err) => []);
};
// (async () => {
//   const data = await getAllVoteForServicesList([
//     "6610e4c2034b2c1379d2b7fc",
//     "6610e4ea034b2c1379d2b7fd",
//   ]);
//   console.log(data);
// })();

module.exports = {
  addServiceForShop,
  deleteServiceForShop,
  updateServiceForShop,
  getServiceById,
  getAllServicesOfShop,
  getServiceOfShopByServiceName,
  addVoteForService,
  getUserVotingServiceInfor,
  hasUserVoteService,
  updateVoteForService,
  getVoteInforBeforeTime,
  getAllVoteOfService,
  updateAverageStarForService,
  filterServiceByCustomAggregate,
  getAllCategoriesForService,
  getVoteInforOfUserForServiceById,
  getAllVoteForServicesList,
};
