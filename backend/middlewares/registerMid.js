const { Response } = require("../utils/index");
const registerMid = (req, res, next) => {
  const NOT_HAVE_NAME = "Vui lòng nhập tên người dùng";
  const NOT_HAVE_USERNAME = "Vui lòng nhập tên đăng nhập";
  const NOT_HAVE_PASSWORD = "Vui lòng nhập mật khẩu";
  const NOT_HAVE_EMAIL = "Vui lòng nhập email";
  const { ten, tai_khoan, mat_khau, email } = req.body;
  //   kiểm tra việc nhập tên
  if (typeof ten !== "string" || ten.trim() == "") {
    res.status(400).json(new Response(400, [], NOT_HAVE_NAME, 300, 300));
    return;
  } else req.body.ten = ten.trim();

  // console.log({ a: req.body.ten });

  //   kiểm tra việc nhập tài khoản
  if (typeof tai_khoan !== "string" || tai_khoan.trim() == "") {
    res.status(400).json(new Response(400, [], NOT_HAVE_USERNAME, 300, 300));
    return;
  } else req.body.tai_khoan = tai_khoan.trim();
  //  kiểm tra việc nhập mật khẩu
  if (typeof mat_khau !== "string" || mat_khau.trim() == "") {
    res.status(400).json(new Response(400, [], NOT_HAVE_PASSWORD, 300, 300));
    return;
  } else req.body.mat_khau = mat_khau.trim();
  //  kiểm tra việc nhập email
  if (typeof email !== "string" || email.trim() == "") {
    res.status(400).json(new Response(400, [], NOT_HAVE_EMAIL, 300, 300));
    return;
  } else req.body.email = email.trim();
  next();
};

module.exports = { registerMid };