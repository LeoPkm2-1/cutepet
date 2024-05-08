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
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const data = await schedulerModel
    .getServiceScheduleById(schedule_id)
    .then((data) => data.payload);
  if (!data) {
    res.status(200).json(new Response(200, data, "Lấy lịch thành công"));
    return;
  } else if (parseInt(data.userCreate.ma_nguoi_dung) != user_id) {
    res
      .status(400)
      .json(new Response(400, {}, "Bạn không có lịch này", 300, 300));
    return;
  }
  res.status(200).json(new Response(200, data, "Lấy lịch thành công"));
  return;
};

const getAllScheduleForUserController = async (req, res) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const schedules = await schedulerModel
    .getAllScheduleOfUser(user_id)
    .then((data) => data.payload);
  res.status(200).json(new Response(200, schedules, "Lấy lịch thành công"));
  return;
};

const cancelScheduleController = async (req, res) => {
  const { schedule_id, reason, WHO_HANDLING } = req.body;
  const user_id =
    WHO_HANDLING == "USER"
      ? parseInt(req.auth_decoded.ma_nguoi_dung)
      : req.auth_decoded.ma_cua_hang;
  const user_infor =
    WHO_HANDLING == "USER"
      ? await userHelper.getUserPublicInforByUserId(user_id)
      : await shopHelper.getPublicInforForShopById(user_id);

  const cancelProgress = await schedulerModel.updateStatusOfServiceSchedule(
    schedule_id,
    schedulerModel.SERVICE_SCHEDULE_REJECT_STATUS_STR,
    user_infor,
    new Date(),
    reason
  );
  if (cancelProgress.status == 200) {
    res.status(200).json(new Response(200, {}, "Hủy lịch thành công"));
  } else {
    res
      .status(400)
      .json(
        new Response(
          400,
          {},
          "Hủy lịch thành không công, đã có lỗi xảy ra",
          300,
          300
        )
      );
  }
};

const confirmServiceScheduleController = async (req, res) => {
  const { schedule_id } = req.body;
  const shop_id = req.auth_decoded.ma_cua_hang;
  const shop_infor = await shopHelper.getPublicInforForShopById(shop_id);
  const confirmProgress = await schedulerModel.updateStatusOfServiceSchedule(
    schedule_id,
    schedulerModel.SERVICE_SCHEDULE_CONFIRM_STATUS_STR,
    shop_infor,
    new Date(),
    ""
  );
  if (confirmProgress.status == 200) {
    res.status(200).json(new Response(200, {}, "Xác nhận lịch thành công"));
  } else {
    res
      .status(400)
      .json(
        new Response(
          400,
          {},
          "Xác nhận lịch thành thất bại, đã có lỗi xảy ra",
          300,
          300
        )
      );
  }
};

const getAllScheduleForShopController = async (req, res) => {
  const shop_id = req.auth_decoded.ma_cua_hang;
  let schedules = await schedulerModel
    .getAllScheduleOfShop(shop_id)
    .then((data) => data.payload);
  const schedules_2 = await Promise.all(
    schedules.map(async (schedule_infor) => {
      const petInfor = await petHelper.publicInforOfPet(schedule_infor.petId);
      // return petInfor;
      return {
        ...schedule_infor,
        petInfor,
      };
    })
  );
  res.status(200).json(new Response(200, schedules_2, "Lấy lịch thành công"));
  return;
};

module.exports = {
  createSchedule,
  getServiceScheduleByIdController,
  getAllScheduleForUserController,
  getAllScheduleForShopController,
  cancelScheduleController,
  confirmServiceScheduleController,
};
