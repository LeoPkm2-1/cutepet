const utilHelper = require("../utils/UtilsHelper");
const { Response } = require("../utils/index");
const preProccessGetMyProfile = async (req, res, next) => {
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
    if (num <= 0) throw new Error(VALID_PARAM);
    req.body.before =
      typeof before == "undefined" ? new Date() : new Date(before);
    req.body.num = num;
  } catch (error) {
    res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
    return;
  }
  next();
};

module.exports = { preProccessGetMyProfile };
