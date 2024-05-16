const UtilsHelper = require("../utils/UtilsHelper");
const { Response } = require("./../utils");
const preGetNumFollowerOfShop = async (req, res, next) => {
  const { shop_id, start_time, end_time } = req.body;
  if (!UtilsHelper.isDateValid(new Date(start_time))) {
    res
      .status(400)
      .json(new Response(400, {}, "THời gian bắt đầu không hợp lệ"));
    return;
  } else if (!UtilsHelper.isDateValid(new Date(end_time))) {
    res
      .status(400)
      .json(new Response(400, {}, "THời gian kết thúc không hợp lệ"));
    return;
  }
  if (new Date(start_time) >= new Date(end_time)) {
    res
      .status(400)
      .json(new Response(400, {}, "Khoảng thời gian không hợp lệ"));
    return;
  }
  next();
};
module.exports = { preGetNumFollowerOfShop };
