const { Response } = require("./../utils");

const followModel = require("../models/theodoi/followModel");
const shopHelper = require("../utils/Shop/shopHelper");
const userHelper = require("../utils/userHelper");
const schedulerModel = require("../models/schedulerModel");

const getNumOfFollewrsForShop = async (req, res) => {
  const { shop_id } = req.body;
  const data = await followModel
    .getListOfUserFollowShop(shop_id)
    .then((data) => data.payload.length);
  console.log({ data });
  res.status(200).json(new Response(200, { num: data }, "Lấy thành công"));
};

const getFollowerInforOfShopByTimeRange = async (req, res) => {
  const { shop_id, start_time, end_time } = req.body;
  const data = await followModel.getFollowerInforOfShopInTimeRange(
    shop_id,
    start_time,
    end_time
  );
  if (data.status != 200) {
    res.status(400).json(new Response(400, [], "Có lỗi xảy ra"));
    return;
  }
  const shopInfor = await shopHelper.getPublicInforForShopById(shop_id);
  const completed_data = await Promise.all(
    data.payload.map(async (followInfor) => {
      const followerInfor = await userHelper.getUserPublicInforByUserId(
        followInfor.follower_Id
      );
      return {
        ...followInfor,
        followerInfor,
        shopInfor,
      };
    })
  );
  res
    .status(200)
    .json(new Response(200, completed_data, "Lấy dữ liệu thành công"));
  return;
};
const filterSchedulesListForShopController = async (req, res) => {
  const { schedule_status, start_time, end_time, service_id } = req.body;
  const shop_id = parseInt(req.auth_decoded.ma_cua_hang);
  const data = await schedulerModel
    .filterSchedule(shop_id, schedule_status, start_time, end_time, service_id)
    .then((data) => data.payload);
  res.status(200).json(new Response(200, data, "Lấy dữ liệu thành công"));
};
module.exports = {
  getNumOfFollewrsForShop,
  getFollowerInforOfShopByTimeRange,
  filterSchedulesListForShopController,
};
