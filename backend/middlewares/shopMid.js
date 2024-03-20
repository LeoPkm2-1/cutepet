const UtilsHelper = require("../utils/UtilsHelper");
const { Response } = require("./../utils");

const updateInforMid = async (req, res, next) => {
  let {
    ten_cua_hang,
    dia_chi,
    so_dien_thoai,
    khau_hieu,
    mo_ta_cua_hang,
    thoi_gian_lam_viec,
  } = req.body;

  // kiểm tra tên
  if (typeof ten_cua_hang != "string" || ten_cua_hang.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Vui lòng nhập tên cửa hàng", 300, 300));
    return;
  } else if (!UtilsHelper.isValidVietnameseName(ten_cua_hang.trim())) {
    res
      .status(400)
      .json(
        new Response(
          400,
          [],
          "Tên cửa hàng chứa các ký tự không hợp lệ",
          300,
          300
        )
      );
    return;
  }

  // kiểm tra số điện thoại
  if (!so_dien_thoai) {
    req.body.so_dien_thoai = so_dien_thoai = null;
  } else if (
    typeof so_dien_thoai != "string" ||
    !UtilsHelper.isPhoneNumberValid(so_dien_thoai.trim())
  ) {
    res
      .status(400)
      .json(new Response(400, [], "Số điện thoại không hợp lệ", 300, 300));
    return;
  } else {
    so_dien_thoai = so_dien_thoai.trim();
  }

  // check thời gian làm việc hợp lệ

  req.body = {
    ...req.body,
    ten_cua_hang: ten_cua_hang.trim(),
    dia_chi,
    so_dien_thoai,
    khau_hieu:
      !khau_hieu || typeof khau_hieu != "string" ? "" : khau_hieu.trim(),
    mo_ta_cua_hang:
      !mo_ta_cua_hang || typeof mo_ta_cua_hang != "string"
        ? ""
        : mo_ta_cua_hang.trim(),
    thoi_gian_lam_viec: thoi_gian_lam_viec.trim(),
  };
  next();
};

module.exports = { updateInforMid };
