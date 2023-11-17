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

module.exports = {
  changePasswordMid,
  updateAvatarMid,
};
