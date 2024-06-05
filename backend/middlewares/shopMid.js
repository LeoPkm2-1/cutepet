const shopModel = require("../models/shop/shopModel");
const shopHelper = require("../utils/Shop/shopHelper");
const UtilsHelper = require("../utils/UtilsHelper");
const { Response } = require("./../utils");
const shopServiceModel = require("../models/shop/shopServiceModel");
const serviceHelper = require("../utils/Shop/serviceHelper");
const userRoleModel = require("../models/userRoleModel");
const addressHelper = require("../utils/addressHelper");
const petHelper = require("../utils/petHelper");
const schedulerModel = require("../models/schedulerModel");

const updateInforMid = async (req, res, next) => {
  let {
    ten_cua_hang,
    dia_chi,
    so_dien_thoai,
    khau_hieu,
    mo_ta_cua_hang,
    thoi_gian_lam_viec,
  } = req.body;
  const { house_number, ward_id, district_id, province_id } = dia_chi;

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

  // kiểm tra địa chỉ hợp lệ

  // kiểm tra số nhà
  if (typeof house_number !== "string" && house_number) {
    res
      .status(400)
      .json(new Response(400, [], "Thông tin nhà không hợp lệ", 300, 300));
    return;
  } else if (
    !house_number ||
    house_number == undefined ||
    house_number == null
  ) {
    req.body.dia_chi.house_number = "";
  } else req.body.dia_chi.house_number = house_number.trim();

  // kiểm tra -id  phường
  if (
    typeof ward_id != "string" &&
    typeof ward_id != "undefined" &&
    ward_id != null
  ) {
    res
      .status(400)
      .json(new Response(400, [], "Thông tin xã không hợp lệ", 300, 300));
    return;
  } else if (!ward_id) {
    req.body.dia_chi.ward_id = "";
  } else req.body.dia_chi.ward_id = ward_id.trim();

  // kiểm tra id quận
  if (
    typeof district_id != "string" &&
    typeof district_id != "undefined" &&
    district_id != null
  ) {
    res
      .status(400)
      .json(
        new Response(400, [], "Thông tin quận huyện không hợp lệ", 300, 300)
      );
    return;
  } else if (!district_id) {
    req.body.dia_chi.district_id = "";
  } else req.body.dia_chi.district_id = district_id.trim();

  // kiểm tra id tỉnh
  if (
    typeof province_id != "string" &&
    typeof province_id != "undefined" &&
    province_id != null
  ) {
    res
      .status(400)
      .json(
        new Response(400, [], "Thông tin tỉnh thành phố không hợp lệ", 300, 300)
      );
    return;
  } else if (!province_id) {
    req.body.dia_chi.province_id = "";
  } else req.body.dia_chi.province_id = province_id.trim();

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
  let { danh_sach_loai_phu_hop } = req.body;

  if (typeof ten_dich_vu != "string" || ten_dich_vu.trim() == "") {
    res
      .status(400)
      .json(new Response(400, {}, "Tên dịch vụ không được để trống", 300, 300));
    return;
  }
  const danhSachTenCacLoai = await petHelper.getDanhSachTenLoai();
  if (
    !danh_sach_loai_phu_hop ||
    !Array.isArray(danh_sach_loai_phu_hop) ||
    danh_sach_loai_phu_hop.length <= 0
  ) {
    danh_sach_loai_phu_hop = req.body.danh_sach_loai_phu_hop =
      danhSachTenCacLoai;
  } else {
    danh_sach_loai_phu_hop = danh_sach_loai_phu_hop.map((tenloai) =>
      String(tenloai).toLowerCase()
    );
    danh_sach_loai_phu_hop = danh_sach_loai_phu_hop.filter((tenloai) =>
      danhSachTenCacLoai.includes(tenloai)
    );
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
    danh_sach_loai_phu_hop,
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
  if (
    !UtilsHelper.isVaildInt(num_of_star) ||
    parseInt(num_of_star) <= 0 ||
    parseInt(num_of_star) > 5
  ) {
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

const getVoteInforBeforeTime = async (req, res, next) => {
  const VALID_PARAM = "Tham số không hợp lệ";
  const DEFAUT_NUM = 5;
  let { before, num } = req.body;
  try {
    if (!UtilsHelper.isDateValid(new Date(before))) {
      throw new Error(VALID_PARAM);
    }
    if (typeof num != "undefined" && Number.isNaN(parseInt(num))) {
      throw new Error(VALID_PARAM);
    }
    num = typeof num == "undefined" ? DEFAUT_NUM : parseInt(num);
    if (num <= 0) throw new Error(VALID_PARAM);
    req.body.before = new Date(before);
    req.body.num = num;
  } catch (error) {
    res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
    return;
  }
  next();
};

const filterServiceCheckParamMid_v1 = async (req, res, next) => {
  let {
    service_name,
    service_type,
    num_of_star,
    price_point,
    price_search,
    province_id,
    district_id,
    pageNumber,
    pageSize,
    suitable_species,
  } = req.body;

  if (
    !service_name ||
    typeof service_name != "string" ||
    service_name.trim() == ""
  ) {
    req.body.service_name = service_name = undefined;
  } else req.body.service_name = service_name.trim();

  if (
    !service_type ||
    !Array.isArray(service_type) ||
    service_type.length == 0
  ) {
    req.body.service_type = service_type = undefined;
  } else {
    service_type = service_type.map((category) => category.toUpperCase());
    service_type = [...new Set(service_type)];
    const allCategories = shopServiceModel.getAllCategoriesForService();
    req.body.service_type = service_type.filter((category) =>
      allCategories.includes(category)
    );
  }

  if (
    !num_of_star ||
    !UtilsHelper.isVaildInt(num_of_star) ||
    parseInt(num_of_star) < 0
  ) {
    req.body.num_of_star = num_of_star = undefined;
  }

  if (
    !price_point ||
    !UtilsHelper.isValidNumber(price_point) ||
    parseFloat(price_point) < 0
  ) {
    req.body.price_point = price_point = undefined;
  } else {
    req.body.price_point = price_point = parseFloat(price_point);
  }

  if (
    typeof price_search != "undefined" &&
    price_search != null &&
    typeof price_search != "string"
  ) {
    res
      .status(400)
      .json(
        new Response(
          400,
          {},
          "Phương thức lọc theo tiền không hợp lệ",
          300,
          300
        )
      );
    return;
  }

  if (!price_search || price_search.trim() == "") {
    req.body.price_search = "LESS";
  } else if (
    price_search.trim().toUpperCase() == "GREATER" ||
    price_search.trim().toUpperCase() == "LESS"
  ) {
    req.body.price_search = price_search = price_search.trim().toUpperCase();
  } else {
    res
      .status(400)
      .json(
        new Response(
          400,
          {},
          "Phương thức lọc theo tiền không hợp lệ",
          300,
          300
        )
      );
    return;
  }

  next();
};

const filterServiceCheckParamMid_v2 = async (req, res, next) => {
  let {
    service_name,
    service_type,
    num_of_star,
    price_point,
    price_search,
    province_id,
    district_id,
    pageNumber,
    pageSize,
    suitable_species,
  } = req.body;

  const DEFAUT_NUM = 2;

  if (
    !province_id ||
    typeof province_id != "string" ||
    province_id.trim() == ""
  ) {
    province_id = req.body.province_id = undefined;
  }

  if (
    !district_id ||
    typeof district_id != "string" ||
    district_id.trim() == ""
  ) {
    district_id = req.body.district_id = undefined;
  }

  if (
    !pageNumber ||
    !UtilsHelper.isVaildInt(pageNumber) ||
    parseInt(pageNumber) < 1
  ) {
    req.body.pageNumber = pageNumber = undefined;
  } else req.body.pageNumber = pageNumber = parseInt(pageNumber);

  if (
    !pageSize ||
    !UtilsHelper.isVaildInt(pageSize) ||
    parseInt(pageSize) < 0
  ) {
    req.body.pageSize = pageSize = undefined;
  } else req.body.pageSize = pageSize = parseInt(pageSize);

  if (typeof province_id != "undefined") {
    const isExist = await addressHelper.isProvinceExistById(province_id);
    if (!isExist) {
      res
        .status(400)
        .json(new Response(400, [], "Tỉnh không tồn tại", 300, 300));
      return;
    }
  }

  if (typeof district_id != "undefined") {
    const isExist = await addressHelper.isDistrictExistById(district_id);
    if (!isExist) {
      res
        .status(400)
        .json(new Response(400, [], "Quận huyện không tồn tại", 300, 300));
      return;
    }
  }

  if (
    !suitable_species ||
    !Array.isArray(suitable_species) ||
    suitable_species.length <= 0
  ) {
    req.body.suitable_species = suitable_species = undefined;
  } else {
    const danhSachTenCacLoai = await petHelper.getDanhSachTenLoai();
    suitable_species = suitable_species.map((tenloai) =>
      String(tenloai).toLowerCase()
    );
    suitable_species = suitable_species.filter((tenloai) =>
      danhSachTenCacLoai.includes(tenloai)
    );
    req.body.suitable_species = suitable_species =
      suitable_species.length > 0 ? suitable_species : undefined;
  }
  next();
};

const preFilterScheduleForShop = async (req, res, next) => {
  let { schedule_status, start_time, end_time, service_id } = req.body;
  const shop_id = parseInt(req.auth_decoded.ma_cua_hang);

  if (!schedule_status) schedule_status = undefined;
  else schedule_status = schedule_status.toUpperCase();
  const listOfAvaibleStatus = schedulerModel.getListOfServiceScheduleStatus();

  if (schedule_status) {
    schedule_status = listOfAvaibleStatus.includes(schedule_status)
      ? schedule_status
      : undefined;
  }

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

  if (!service_id || typeof service_id != "string") service_id = undefined;
  else {
    const allServiceOfShop = await shopServiceModel
      .getAllServicesOfShop(shop_id)
      .then((servicesList) => servicesList.map((service) => service._id));
    service_id = allServiceOfShop.includes(service_id) ? service_id : undefined;
  }
  req.body = {
    ...req.body,
    schedule_status,
    start_time,
    end_time,
    service_id,
    shop_id,
  };
  next();
};

module.exports = {
  updateInforMid,
  addServiceMid,
  checkShopExistsMid,
  checkRightToChangeServiceMid,
  checkServiceExistsMid,
  preProcessVotingService,
  getVoteInforBeforeTime,
  filterServiceCheckParamMid_v1,
  filterServiceCheckParamMid_v2,
  preFilterScheduleForShop,
};

// db.DanhGiaDichVu.aggregate([
//   {
//     $addFields: {
//       service_id_obj: { $toObjectId: "$serviceId" }, // Convert product_id from string to ObjectId
//     },
//   },
//   {
//     $lookup: {
//       from: "DichVuCuaCuaHang",
//       localField: "service_id_obj",
//       foreignField: "_id",
//       as: "serviceInfor",
//     },
//   },
//   {
//     $unwind: "$serviceInfor", // Optional: unwind the product array if you want to work with individual products
//   },
//   {
//     $lookup: {
//       from: "ThongTinMoTaCuaHang",
//       localField: "serviceInfor.shopId",
//       foreignField: "shopId",
//       as: "shopDescription",
//     },
//   },
//   {
//     $unwind: "$shopDescription", // Optional: unwind the product array if you want to work with individual products
//   },
//   {
//     $lookup: {
//       from: "DiaChiHanhChinhVN",
//       localField: "shopDescription.addressInfor.province_infor.code",
//       foreignField: "province_code",
//       as: "Districts",
//     },
//   },
//   {
//     $unwind: "$Districts", // Optional: unwind the product array if you want to work with individual products
//   },
// ]);
