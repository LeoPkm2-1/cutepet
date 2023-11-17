const UtilsHelper = require("../utils/UtilsHelper");
const { Response } = require("./../utils");
const changePasswordMid = async (req, res, next) => {
  const { old_pass, new_pass, confirm_pass } = req.body;

  if (typeof old_pass != "string" || old_pass == "") {
    res
      .status(400)
      .json(new Response(400, [], "vui lòng nhập mật khẩu hiện tại"));
    return;
  } else if (typeof new_pass != "string" || new_pass == "") {
    res
      .status(400)
      .json(new Response(400, [], "vui lòng nhập mật khẩu cần thay đổi"));
    return;
  } else if (typeof confirm_pass != "string" || confirm_pass == "") {
    res
      .status(400)
      .json(new Response(400, [], "vui lòng nhập xác nhận  mật khẩu "));
    return;
  }
  if (new_pass != confirm_pass) {
    res
      .status(400)
      .json(
        new Response(400, [], "mật khẩu mới và xác nhận mật khẩu không khớp")
      );
    return;
  }
  next();
};

const updateAvatarMid = async (req, res, next) => {
  const { url_anh } = req.body;
  if (typeof url_anh != "string" || url_anh.trim() == "") {
    res.status(400).json(new Response(400, [], "vui lòng nhập url ảnh"));
    return;
  }
  next();
};

const updateBasicInforMid = async (req, res, next) => {
  let { ten, ngay_sinh, so_dien_thoai, gioi_tinh } = req.body;
  // kiểm tra tên
  if (typeof ten != "string" || ten.trim() == "") {
    res.status(400).json(new Response(400, [], "vui lòng nhập tên người dùng"));
    return;
  }
  // kiểm tra ngày sinh
  if (!ngay_sinh) {
    req.body.ngay_sinh = ngay_sinh = null;
  } else if (
    typeof ngay_sinh != "string" ||
    !UtilsHelper.isDateValid(new Date(ngay_sinh))
  ) {
    res.status(400).json(new Response(400, [], "ngày sinh không hợp lệ"));
    return;
  } else {
    req.body.ngay_sinh = ngay_sinh = new Date(ngay_sinh);
  }

  // kiểm tra số điện thoại
  if (!so_dien_thoai) {
    req.body.so_dien_thoai = so_dien_thoai = null;
  } else if (
    typeof so_dien_thoai != "string" ||
    !UtilsHelper.isPhoneNumberValid(so_dien_thoai.trim())
  ) {
    res.status(400).json(new Response(400, [], "số điện thoại không hợp lệ"));
    return;
  } else {
    req.body.so_dien_thoai = so_dien_thoai = so_dien_thoai.trim();
  }
  // kiểm tra giới tính
  if (!gioi_tinh) {
    req.body.gioi_tinh = gioi_tinh = null;
  } else if (
    Number.isNaN(parseInt(gioi_tinh)) ||
    (parseInt(gioi_tinh) != 0 && parseInt(gioi_tinh) != 1)
  ) {
    // 1. là nam
    // 0. là nữ
    res.status(400).json(new Response(400, [], "giới tính không hợp lệ"));
    return;
  } else {
    req.body.gioi_tinh = parseInt(gioi_tinh);
  }
  next();
};

module.exports = {
  changePasswordMid,
  updateAvatarMid,
  updateBasicInforMid,
};
