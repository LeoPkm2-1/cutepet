const schedulerModel = require("../models/schedulerModel");
const UtilsHelper = require("../utils/UtilsHelper");
const petHelper = require("../utils/petHelper");
const { Response } = require("./../utils");

const createScheduleMid = async (req, res, next) => {
  let { service_id, schedule_name, pet_id, happen_at } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  if (!schedule_name) {
    req.body.schedule_name = schedule_name = null;
  }

  if (!pet_id) {
    req.body.pet_id = pet_id = null;
  } else {
    const doesUserOwnPet = await petHelper.isOwnPet(pet_id, user_id);
    if (!doesUserOwnPet) {
      res
        .status(400)
        .json(new Response(400, {}, "Bạn không sở hữu thú cưng này", 300, 300));
      return;
    }
  }

  if (
    typeof happen_at != "string" ||
    // ||    !UtilsHelper.isDateValid(new Date(happen_at))
    !UtilsHelper.isDateValid(new Date(happen_at.trim()))
  ) {
    res
      .status(400)
      .json(new Response(400, {}, "Thời gian không hợp lệ", 300, 300));
    return;
  }
  req.body.happen_at = new Date(happen_at.trim());
  next();
};

const checkScheduleExistMid = async (req, res, next) => {
  let { schedule_id } = req.body;
  if (typeof schedule_id != "string" || schedule_id.trim() == "") {
    res.status(400).json(new Response(400, {}, "Mã lịch không hợp lệ"));
    return;
  }
  const is_exist = await schedulerModel.isScheduleExist(schedule_id.trim());
  if (!is_exist) {
    res.status(400).json(new Response(400, {}, "Lịch không tồn tại", 300, 300));
    return;
  }
  req.body.schedule_id = schedule_id.trim();
  next();
};

module.exports = {
  createScheduleMid,
  checkScheduleExistMid,
};
