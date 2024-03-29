const shopModel = require("../models/shop/shopModel");
const shopHelper = require("../utils/Shop/shopHelper");
const UtilsHelper = require("../utils/UtilsHelper");
const { Response } = require("./../utils");
const shopServiceModel = require("../models/shop/shopServiceModel");
const serviceHelper = require("../utils/Shop/serviceHelper");
const userRoleModel = require("../models/userRoleModel");

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
    thoi_gian_lam_viec,
  };
  next();
};

const checkShopExistsMid = async (req, res, next) => {
  const shop_id = parseInt(req.body.shop_id);
  const checkShopExist = await shopHelper.isShopExist(shop_id);
  if (!checkShopExist) {
    res
      .status(400)
      .json(new Response(400, {}, "Cửa hàng không tồn tại", 300, 300));
    return;
  }
  next();
};

const addServiceMid = async (req, res, next) => {
  const {
    ten_dich_vu,
    mo_ta_ngan,
    mo_ta_dich_vu,
    anh_dich_vu,
    the_loai_dich_vu,
    don_gia,
    thoi_luong_dich_vu,
  } = req.body;

  if (typeof ten_dich_vu != "string" || ten_dich_vu.trim() == "") {
    res
      .status(400)
      .json(new Response(400, {}, "Tên dịch vụ không được để trống", 300, 300));
    return;
  }

  // if (!(don_gia >= 0 && thoi_luong_dich_vu >= 0)) {
  //   res
  //     .status(400)
  //     .json(
  //       new Response(
  //         400,
  //         {},
  //         "Tham số thời lượng và giá tiền có thể không hợp lệ",
  //         300,
  //         300
  //       )
  //     );
  //   return;
  // }

  req.body = {
    ...req.body,
    ten_dich_vu: ten_dich_vu.trim(),
    mo_ta_ngan: typeof mo_ta_ngan != "string" ? "" : mo_ta_ngan.trim(),
    mo_ta_dich_vu: mo_ta_dich_vu.trim(),
    anh_dich_vu: anh_dich_vu.trim(),
    the_loai_dich_vu: the_loai_dich_vu,
    don_gia,
    thoi_luong_dich_vu,
  };
  next();
};

const checkRightToChangeServiceMid = async (req, res, next) => {
  let { service_id } = req.body;
  if (typeof service_id != "string" || service_id.trim() == "") {
    res
      .status(400)
      .json(new Response(400, {}, "Mã dịch vụ không hợp lệ", 300, 300));
    return;
  }
  // console.log({service_id});
  req.body.service_id = service_id = service_id.trim();
  const shop_id = req.auth_decoded.ma_cua_hang;
  const service_infor = await shopServiceModel.getServiceById(service_id);
  if (Object.keys(service_infor).length === 0) {
    res
      .status(400)
      .json(new Response(400, {}, "Dịch vụ không tồn tại", 300, 300));
    return;
  }

  if (parseInt(service_infor.shopId) != shop_id) {
    res
      .status(400)
      .json(new Response(400, {}, "Không có quyền thay đổi dịch vụ", 300, 300));
    return;
  }
  next();
};

const checkServiceExistsMid = async (req, res, next) => {
  let { service_id } = req.body;
  if (typeof service_id != "string" || service_id.trim() == "") {
    res
      .status(400)
      .json(new Response(400, {}, "Mã dịch vụ không hợp lệ", 300, 300));
    return;
  }
  req.body.service_id = service_id = req.body.service_id.trim();
  const isServiceExist = await serviceHelper.checkServiceExistById(service_id);
  // console.log({ isServiceExist });
  if (!isServiceExist) {
    res
      .status(400)
      .json(new Response(400, {}, "Dịch vụ không tồn tại", 300, 300));
    return;
  }
  next();
};

const preProcessVotingService = async (req, res, next) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const vai_tro = req.auth_decoded.vai_tro;
  let { service_id, num_of_star, content } = req.body;
  // console.log({
    // service_id,
    // num_of_star,
    // content,
  // });
  // res.send("hihi");
  // return;
  if (!UtilsHelper.isVaildInt(num_of_star) || parseInt(num_of_star) <= 0) {
    res
      .status(400)
      .json(new Response(400, {}, "Số lượng sao không hợp lệ", 300, 300));
    return;
  }
  if (
    typeof content != "string" &&
    typeof content != "undefined" &&
    content != null
  ) {
    res
      .status(400)
      .json(new Response(400, {}, "Nội dung đánh giá không hợp lệ", 300, 300));
    return;
  }
  if (vai_tro.roleDescription == userRoleModel.SHOP_ROLE_STRING) {
    res
      .status(400)
      .json(
        new Response(400, {}, "Cửa hàng không có quyền đánh giá", 300, 300)
      );
    return;
  }

  const isVoted = await shopServiceModel.hasUserVoteService(
    user_id,
    service_id
  );
  const data = {
    user_Voting_id: user_id,
    num_of_star: parseInt(num_of_star),
    content: !content ? "" : content.trim(),
    service_id: req.body.service_id,
  };
  if (!isVoted) {
    req.body.VOTE_PAGELOAD = {
      action: "ADD_VOTE",
      ...data,
    };
  } else {
    req.body.VOTE_PAGELOAD = {
      action: "UPDATE_VOTE",
      ...data,
    };
  }
  next();
};

module.exports = {
  updateInforMid,
  addServiceMid,
  checkShopExistsMid,
  checkRightToChangeServiceMid,
  checkServiceExistsMid,
  preProcessVotingService,
};
