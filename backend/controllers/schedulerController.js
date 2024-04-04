const schedulerModel = require("../models/schedulerModel");
const shopServiceModel = require("../models/shop/shopServiceModel");
const shopHelper = require("../utils/Shop/shopHelper");
const petHelper = require("../utils/petHelper");
const { Response } = require("../utils/index");
const userHelper = require("../utils/userHelper");

const createSchedule = async (req, res) => {
  let { service_id, schedule_name, pet_id, happen_at } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const pet_infor = !pet_id ? {} : await petHelper.publicInforOfPet(pet_id);
  const user_infor = await userHelper.getUserPublicInforByUserId(user_id);

  const service_infor = await shopServiceModel.getServiceById(service_id);
  const shop_infor = await shopHelper.getPublicInforForShopById(
    service_infor.shopId
  );

  schedule_name = !schedule_name ? new Date().toString() : schedule_name.trim();

  const insertScheduleId = await schedulerModel
    .createNewSchedule(
      schedule_name,
      service_id,
      pet_id,
      user_infor,
      shop_infor,
      service_infor,
      happen_at,
      new Date()
    )
    .then((data) => {
      const process = data.payload;
      return process.acknowledged == true ? process.insertedId.toString() : "";
    });
  // console.log({ insertScheduleId });
  const scheduleData = await schedulerModel
    .getServiceScheduleById(insertScheduleId)
    .then((data) => data.payload);
  res.status(200).json(new Response(200, scheduleData, "Thêm lịch thành công"));
  return;
};

const getServiceScheduleByIdController = async (req, res) => {
  let { schedule_id } = req.body;
  const data = await schedulerModel
    .getServiceScheduleById(schedule_id)
    .then((data) => data.payload);
    res.status(200).json(new Response(200, data, "Lấy lịch thành cộng"));
    return;
};

module.exports = {
  createSchedule,
  getServiceScheduleByIdController,
};
