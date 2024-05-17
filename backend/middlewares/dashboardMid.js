const UtilsHelper = require("../utils/UtilsHelper");
const { Response } = require("./../utils");
const preGetFollowerOfShop = async (req, res, next) => {
  const { shop_id } = req.body;
  let { start_time, end_time } = req.body;
  if (start_time && !UtilsHelper.isDateValid(new Date(start_time))) {
    res
      .status(400)
      .json(new Response(400, {}, "THời gian bắt đầu không hợp lệ"));
    return;
  } else if (!start_time) {
    start_time = undefined;
  }

  if (end_time && !UtilsHelper.isDateValid(new Date(end_time))) {
    res
      .status(400)
      .json(new Response(400, {}, "THời gian kết thúc không hợp lệ"));
    return;
  } else if (!end_time) {
    end_time = undefined;
  }
  if (start_time && end_time && new Date(start_time) >= new Date(end_time)) {
    res
      .status(400)
      .json(new Response(400, {}, "Khoảng thời gian không hợp lệ"));
    return;
  }
  req.body = { ...req.body, start_time, end_time };
  // console.log(req.body);
  next();
};
module.exports = { preGetFollowerOfShop };
