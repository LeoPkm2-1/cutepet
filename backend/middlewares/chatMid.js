const UtilsHelper = require("../utils/UtilsHelper");
const { userId2Username, isUserIdExist } = require("../utils/userHelper");
const { Response } = require("./../utils");

const sendMessageMid = async (req, res, next) => {
  try {
    let { message_type, message_content } = req.body;
    const sender_id = parseInt(req.auth_decoded.ma_nguoi_dung);
    // console.log("ok");
    message_type =
      typeof message_type == "string" ? message_type.trim().toUpperCase() : "";
    message_content =
      typeof message_content == "string" ? message_content.trim() : "";

    if (!UtilsHelper.isVaildInt(req.body.receiver_id)) {
      throw new Error("receiver_id is not valid int");
    }
    const receiver_id = parseInt(req.body.receiver_id);

    const isExisted = await isUserIdExist(receiver_id);
    if (!isExisted) {
      throw new Error("receiver_id is not existed");
    }
    if (message_type != "TEXT_MESSAGE") {
      throw new Error("message_type is not valid");
    }
    if (message_type === "TEXT_MESSAGE" && message_content.length === 0) {
      throw new Error("message_content is empty");
    }
    if (sender_id == receiver_id) {
      throw new Error("sender_id and receiver_id must be different");
    }
    req.body.receiver_id = receiver_id;
    req.body.sender_id = sender_id;
    req.body.message_type = message_type;
    req.body.message_content = message_content;
    next();
  } catch (error) {
    switch (error.message) {
      case "receiver_id is not valid int":
        res
          .status(400)
          .json(new Response(400, [], "Mã người nhận không hợp lệ", 300, 300));
        return;

      case "receiver_id is not existed":
        res
          .status(400)
          .json(new Response(400, [], "Mã người nhận không tồn tại", 300, 300));
        return;
      case "message_type is not valid":
        res
          .status(400)
          .json(new Response(400, [], "Loại tin nhắn không hợp lệ", 300, 300));
        return;
      case "message_content is empty":
        res
          .status(400)
          .json(
            new Response(
              400,
              [],
              "Nội dung tin nhắn không được để trống",
              300,
              300
            )
          );
        return;
      case "sender_id and receiver_id must be different":
        res
          .status(400)
          .json(
            new Response(
              400,
              [],
              "Mã người gửi và mã người nhận phải khác nhau",
              300,
              300
            )
          );
          return;

      default:
        break;
    }
  }
};

module.exports = { sendMessageMid };
