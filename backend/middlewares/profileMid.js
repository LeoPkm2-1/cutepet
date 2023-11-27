const utilHelper = require("../utils/UtilsHelper");
const { Response } = require("../utils/index");
const userModel = require("../models/userModel");

const preProccessGetTimeline = async (req, res, next) => {
  const VALID_PARAM = "tham số không hợp lệ";
  let { before, num } = req.body;
  try {
    if (
      typeof before != "undefined" &&
      !utilHelper.isDateValid(new Date(before))
    ) {
      throw new Error(VALID_PARAM);
    }
    if (typeof num != "undefined" && Number.isNaN(parseInt(num))) {
      throw new Error(VALID_PARAM);
    }
    num = typeof num == "undefined" ? undefined : parseInt(num);
    if (typeof num != "undefined" && num <= 0) throw new Error(VALID_PARAM);
    req.body.before =
      typeof before == "undefined" ? new Date() : new Date(before);
    req.body.num = num;
  } catch (error) {
    res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
    return;
  }
  next();
};

const preProccessUserProfile = async (req, res, next) => {
  const user_id = parseInt(req.body.user_id);
  if (Number.isNaN(user_id)) {
    res
      .status(400)
      .json(new Response(400, [], "tham số không hợp lệ", 300, 300));
    return;
  }
  const username_of_user = await userModel
    .getUsernameByUserId(user_id)
    .then((data) => data.tai_khoan);
  if (typeof username_of_user == "undefined") {
    res
      .status(400)
      .json(new Response(400, [], "người dùng không tồn tại", 300, 300));
    return;
  }
  req.body.user_id = user_id;
  next();
};

module.exports = { preProccessGetTimeline, preProccessUserProfile };
