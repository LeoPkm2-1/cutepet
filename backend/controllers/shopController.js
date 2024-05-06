const anhNguoiDungModel = require("../models/anhNguoiDungModel");
const diaChiHanhChinhModel = require("../models/diaChi/diaChiHanhChinhModel");
const shopDescriptionModel = require("../models/shop/shopDescriptionModel");
const shopModel = require("../models/shop/shopModel");
const shopServiceModel = require("../models/shop/shopServiceModel");
const followModel = require("../models/theodoi/followModel");
const userModel = require("../models/userModel");
const serviceHelper = require("../utils/Shop/serviceHelper");
const shopHelper = require("../utils/Shop/shopHelper");
const { Response } = require("./../utils/index");
const userHelper = require("./../utils/userHelper");

const getShopInforByIdController = async (req, res) => {
  try {
    const shop_id = parseInt(req.body.shop_id);
    // console.log({ shop_id });
    const shop_basic_infor = await userHelper.getUserPublicInforByUserId(
      shop_id
    );
    const SHOP_NOT_EXISTS_MSG = "Cửa hàng không tồn tại";
    if (
      Object.keys(shop_basic_infor).length == 0 ||
      shop_basic_infor.vai_tro.roleDescription != "cua_hang"
    ) {
      res
        .status(400)
        .json(new Response(400, {}, SHOP_NOT_EXISTS_MSG, 300, 300));
      return;
    } else {
      // const shop_detail_infor =
      //   await shopDescriptionModel.getDescriptionInforOfShop(shop_id);
      // res
      //   .status(200)
      //   .json(
      //     new Response(
      //       200,
      //       { ...shop_basic_infor, shopInfor: shop_detail_infor },
      //       "",
      //       300,
      //       300
      //     )
      //   );
      // return;
      const shop_infor = await shopHelper.getPublicInforForShopById(shop_id);
      res
        .status(200)
        .json(new Response(200, shop_infor, "Lấy thông tin thành công"));
      return;
    }
  } catch (error) {
    res
      .status(400)
      .json(new Response(400, error, "some_thing_wrong", 300, 300));
  }
};

const updateCoverImgForShop = async (req, res) => {
  const shop_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  let url_anh_bia = req.body.url_anh_bia;
  if (typeof url_anh_bia != "string" || url_anh_bia.trim() == "") {
    res
      .status(400)
      .json(
        new Response(400, "", "Vui lòng nhập url của ảnh bìa hợp lệ", 300, 300)
      );
    return;
  }
  const data = await shopDescriptionModel
    .updateCoverImageForShop(shop_id, url_anh_bia.trim())
    .then((data) => data.payload)
    .catch((err) => err);
  res.status(200).json(new Response(200, {}, "cập nhật thành công"));
};

const updateMainImgForShop = async (req, res) => {
  const shop_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  let url_anh_chinh = req.body.url_anh_chinh;
  if (typeof url_anh_chinh != "string" || url_anh_chinh.trim() == "") {
    res
      .status(400)
      .json(
        new Response(400, "", "Vui lòng nhập url của ảnh hợp lệ", 300, 300)
      );
    return;
  }

  const updateAvatarProcess = await anhNguoiDungModel
    .CapNhatAnhDaiDienNguoiDung(url_anh_chinh.trim(), shop_id)
    .then((data) => data.payload);
  updateAvatarProcess.insertId = Number(updateAvatarProcess.insertId);
  // console.log(updateAvatarProcess);
  res
    .status(200)
    .json(
      new Response(
        200,
        updateAvatarProcess,
        "Cập nhật ảnh đại diện thành công cho cửa hàng"
      )
    );
};

const updateInforForShopController = async (req, res) => {
  const {
    ten_cua_hang,
    dia_chi,
    so_dien_thoai,
    khau_hieu,
    mo_ta_cua_hang,
    thoi_gian_lam_viec,
  } = req.body;

  const { house_number, ward_id, district_id, province_id } = dia_chi;
  const shop_id = req.auth_decoded.ma_cua_hang;
  // cập nhật thông tin cơ bản của cửa hàng

  const updateBasicInforProcess = await userModel
    .updateUserBasicInfor(shop_id, {
      ten: ten_cua_hang,
      ngay_sinh: null,
      so_dien_thoai,
      gioi_tinh: null,
    })
    .then((data) => data)
    .catch((err) => err);

  const ward_infor = await diaChiHanhChinhModel.getWardById(ward_id);
  const district_infor = await diaChiHanhChinhModel.getDistrictById(
    district_id
  );
  const province_infor = await diaChiHanhChinhModel.getProvinceById(
    province_id
  );

  const address_infor = {
    house_number,
    ward_infor,
    district_infor,
    province_infor,
  };

  // cập nhật thông tin mô tả chi tiết của cửa hàng
  const updateDescriptInforProcess = await shopDescriptionModel
    .updateShopInforNotCoverImage(
      shop_id,
      address_infor,
      khau_hieu,
      mo_ta_cua_hang,
      thoi_gian_lam_viec
    )
    .then((data) => data)
    .catch((err) => err);
  // console.log(updateDescriptInforProcess);
  res
    .status(200)
    .json(new Response(200, {}, "Cập nhật thành công thông tin cửa hàng"));
};

const addServiceForShop = async (req, res) => {
  const {
    ten_dich_vu,
    mo_ta_ngan,
    mo_ta_dich_vu,
    anh_dich_vu,
    the_loai_dich_vu,
    don_gia,
    thoi_luong_dich_vu,
  } = req.body;
  const shop_id = req.auth_decoded.ma_cua_hang;

  const isNameExist = await shopHelper.isNameServiceExistsInShop(
    ten_dich_vu,
    shop_id
  );
  if (isNameExist) {
    res
      .status(400)
      .json(
        new Response(
          400,
          {},
          "Không thể thêm được dịch vụ do đã tồn tại trong cửa hàng",
          300,
          300
        )
      );
    return;
  }

  const processStatus = await shopServiceModel.addServiceForShop(
    ten_dich_vu,
    shop_id,
    mo_ta_ngan,
    mo_ta_dich_vu,
    anh_dich_vu,
    the_loai_dich_vu,
    don_gia,
    thoi_luong_dich_vu
  );
  if (processStatus.status == 400) {
    res
      .status(400)
      .json(
        new Response(400, {}, "Thêm dịch vụ thất bại do lỗi nào đó", 300, 300)
      );
    return;
  }

  res.status(200).json(new Response(200, {}, "Thêm dịch vụ thành công"));
};

const getAllAvailableServicesOfShop = async (req, res) => {
  const shop_id = parseInt(req.body.shop_id);
  const services_list = await shopServiceModel.getAllServicesOfShop(shop_id);
  res.status(200).json(new Response(200, services_list, "lấy thành công"));
};

const deleteServiceOfShop = async (req, res) => {
  let { service_id } = req.body;
  const data = await shopServiceModel.deleteServiceForShop(service_id);
  res.status(200).json(new Response(200, data.payload, "Xóa thành công"));
};

const updateServiceOfShop = async (req, res) => {
  let {
    service_id,
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
  const update_process = await shopServiceModel.updateServiceForShop(
    service_id,
    ten_dich_vu,
    mo_ta_ngan,
    mo_ta_dich_vu,
    anh_dich_vu,
    the_loai_dich_vu,
    don_gia,
    thoi_luong_dich_vu
  );
  res
    .status(200)
    .json(
      new Response(200, update_process.payload, "Cập nhật thành công dịch vụ")
    );
  return;
};

const getServiceByIdController = async (req, res) => {
  let { service_id } = req.body;
  const serviceInfor = await shopServiceModel.getServiceById(service_id);
  console.log({ serviceInfor });
  const thong_tin_cua_hang = await shopHelper.getPublicInforForShopById(
    serviceInfor.shopId
  );
  res
    .status(200)
    .json(
      new Response(
        200,
        { ...serviceInfor, thong_tin_cua_hang },
        "Lấy thông tin dịch vụ thành công"
      )
    );
  return;
};

const addVote = async (req, res) => {
  const { action, user_Voting_id, service_id, num_of_star, content } =
    req.body.VOTE_PAGELOAD;
  const addVoteProcess = await shopServiceModel.addVoteForService(
    service_id,
    user_Voting_id,
    num_of_star,
    content
  );
  // console.log({ addVoteProcess });
  if (addVoteProcess.status == 200) {
    res.status(200).json(new Response(200, {}, "Thêm đánh giá thành công"));
    return;
  } else {
    res
      .status(400)
      .json(new Response(400, {}, "Đã có lỗi xảy ra khi đánh giá"));
    return;
  }
};

const updateVote = async (req, res) => {
  const { action, user_Voting_id, service_id, num_of_star, content } =
    req.body.VOTE_PAGELOAD;
  const updateProcess = await shopServiceModel.updateVoteForService(
    service_id,
    user_Voting_id,
    num_of_star,
    content
  );
  // console.log({ updateProcess });
  if (updateProcess.status == 200) {
    res.status(200).json(new Response(200, {}, "Cập nhật đánh giá thành công"));
    return;
  } else {
    res
      .status(400)
      .json(new Response(400, {}, "Đã có lỗi xảy ra khi cập nhật đánh giá"));
    return;
  }
};

const votingServiceController = async (req, res) => {
  const { action, user_Voting_id, service_id, num_of_star, content } =
    req.body.VOTE_PAGELOAD;

  // console.log({
  //   a: req.body.VOTE_PAGELOAD,
  // });
  if (action == "ADD_VOTE") {
    await addVote(req, res);
  } else if (action == "UPDATE_VOTE") {
    await updateVote(req, res);
  }
  // update averageOfNumstart in service
  await serviceHelper.reUpdateNumOfStarOfService(service_id);
};

const categoriesForService = (req, res) => {
  res
    .status(200)
    .json(
      new Response(
        200,
        shopServiceModel.getAllCategoriesForService(),
        "Lấy thành công"
      )
    );
  return;
};

const getVoteInforBeforeController = async (req, res) => {
  const { before, num, service_id } = req.body;
  const data = await shopServiceModel
    .getVoteInforBeforeTime(service_id, before, num)
    .then((data) =>
      data.payload.map((vote) => {
        return { ...vote, _id: vote._id.toString() };
      })
    );
  // console.log({ data });
  res.status(200).json(new Response(200, data, "Lấy thành công"));
};
const filterServiceController = async (req, res) => {
  const {
    service_name,
    service_type,
    num_of_star,
    price_point,
    price_search,
    province_id,
    district_id,
    pageNumber,
    pageSize,
  } = req.body;
  let filter = { $match: {} };
  if (service_name) {
    filter.$match = {
      ...filter.$match,
      serviceName: { $regex: `${service_name}`, $options: "i" },
    };
  }

  if (service_type) {
    filter.$match = {
      ...filter.$match,
      serviceType: {
        $elemMatch: { $in: service_type },
      },
    };
  }

  if (num_of_star) {
    filter.$match = {
      ...filter.$match,
      numOfStar: { $gte: num_of_star },
    };
  }
  if (price_point) {
    const price_condition =
      price_search == "GREATER"
        ? {
            $gte: price_point,
          }
        : {
            $lte: price_point,
          };
    filter.$match = {
      ...filter.$match,
      priceQuotation: price_condition,
    };
  }

  const joinOp = {
    $lookup: {
      from: "ThongTinMoTaCuaHang",
      localField: "shopId",
      foreignField: "shopId",
      as: "shopInfor",
    },
  };
  const shopInforDestructOp = {
    $unwind: "$shopInfor",
  };
  const aggregateArray =
    typeof district_id != "undefined" || typeof province_id != "undefined"
      ? [filter, joinOp, shopInforDestructOp]
      : [filter];
  if (district_id) {
    const filterDistrictOp = {
      $match: {
        "shopInfor.addressInfor.district_infor._id": district_id,
      },
    };
    aggregateArray.push(filterDistrictOp);
  } else if (province_id) {
    const filterProvinceOp = {
      $match: {
        "shopInfor.addressInfor.province_infor._id": province_id,
      },
    };
    aggregateArray.push(filterProvinceOp);
  }

  if (pageNumber && pageSize) {
    aggregateArray.push(
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: pageSize }
    );
  }
  // console.log({ pageNumber });
  // console.log({ pageSize });
  // console.log({province_id,district_id});
  // console.log(aggregateArray.length);
  // console.log(aggregateArray[2]);
  // console.log(aggregateArray);

  const data = await shopServiceModel
    .filterServiceByCustomAggregate(aggregateArray)
    // .filterServiceByCustomAggregate([filter, lookup])
    .then((data) => data.payload);

  res.status(200).json(new Response(200, data, "Lấy dữ liệu thành công"));
};
const getListUserFollowShop = async (req, res) => {
  const shop_id = parseInt(req.auth_decoded.ma_cua_hang);
  // console.log(req.auth_decoded);
  const followInfor = await followModel
    .getListOfUserFollowShop(shop_id)
    .then((data) => data.payload);

  const user_list_id = followInfor.map((infor) => infor.follower_Id);
  const userListInfor = await userHelper.getUserPublicInforByListIds(
    user_list_id
  );
  res.status(200).json(new Response(200, userListInfor, ""));
};

module.exports = {
  getShopInforByIdController,
  updateInforForShopController,
  updateCoverImgForShop,
  updateMainImgForShop,
  addServiceForShop,
  getAllAvailableServicesOfShop,
  deleteServiceOfShop,
  updateServiceOfShop,
  votingServiceController,
  getServiceByIdController,
  categoriesForService,
  getVoteInforBeforeController,
  filterServiceController,
  getListUserFollowShop,
};
