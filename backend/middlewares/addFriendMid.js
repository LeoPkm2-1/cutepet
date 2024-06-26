const userModel = require("../models/userModel");
const banbeHelper = require("./../utils/banbeHelper");
const { Response } = require("./../utils");
const loiMoiKetBanModel = require("./../models/loiMoiKetBanModel");
const loiMoiKetBanHelper = require("../utils/loiMoiKetBanHelper");
const petHelper = require("../utils/petHelper");
const suggestFriendModel = require("../models/goiYBanBe/suggestFriendModel");
const { areTwoSetsEqual } = require("../utils/UtilsHelper");

const AddByUserIdMid = async (req, res, next) => {
  const ma_nguoi_dung = req.body.requestID;
  const { tai_khoan } = await userModel.getUsernameByUserId(ma_nguoi_dung);
  if (typeof tai_khoan == "undefined") {
    res
      .status(400)
      .json(
        new Response(400, [], "Thông tin người dùng không chính xác", 300, 300)
      );
    return;
  }
  req.body.requestUserName = tai_khoan;
  next();
};
const AddByUserNameMid = async (req, res, next) => {
  const tai_khoan = req.body.requestUserName;
  const { ma_nguoi_dung } = await userModel.getUserIdByUsername(tai_khoan);
  if (typeof ma_nguoi_dung == "undefined") {
    res
      .status(400)
      .json(
        new Response(400, [], "thông tin người dùng không chính xác", 300, 300)
      );
    return;
  }
  req.body.requestID = ma_nguoi_dung;
  next();
};
const checkFriendShipExistsMid = async (req, res, next) => {
  const friend_id = parseInt(req.body.friend_id);
  const ma_nguoi_dung = parseInt(req.auth_decoded.ma_nguoi_dung);

  if (Number.isNaN(friend_id)) {
    res
      .status(400)
      .json(new Response(400, [], "mã người dùng không đúng", 300, 300));
    return;
  }

  const isFriend = await banbeHelper.haveFriendShipBetween(
    ma_nguoi_dung,
    friend_id
  );
  if (!isFriend) {
    res
      .status(400)
      .json(
        new Response(
          400,
          [],
          `người dùng ${friend_id} không nằm trong danh sách bạn bè`,
          300,
          300
        )
      );
    return;
  }
  next();
};

const hasReceiveRequestAddFriendFromMid = async (req, res, next) => {
  const NOT_SEND_SENDER_ID = `Phải nhập id của người gửi yêu cầu kết bạn`;
  const idNguoiGui = parseInt(req.body.senderID);
  const idNguoiPhanHoi = parseInt(req.auth_decoded.ma_nguoi_dung);
  const NOT_HAVE_REQUEST_ADD_FRIEND = `không tồn tại lời mời kết bạn từ ${idNguoiGui} đến ${idNguoiPhanHoi}`;

  // Ngươi dùng phải nhập id friend muốn kết bạn
  if (Number.isNaN(idNguoiGui)) {
    res.status(400).json(new Response(400, [], NOT_SEND_SENDER_ID, 300, 300));
    return;
  }
  const isHaveRequest = await loiMoiKetBanModel
    .havePendingRequestAddFriend(idNguoiGui, idNguoiPhanHoi)
    .then((data) => data.payload);
  if (!isHaveRequest) {
    res
      .status(400)
      .json(new Response(400, [], NOT_HAVE_REQUEST_ADD_FRIEND, 300, 300));
    return;
  }
  req.body.senderID = idNguoiGui;
  next();
};

const hasSendRequestAddFriendToMid = async (req, res, next) => {
  const NOT_SEND_RECEIVER_ID = `Phải nhập id của người nhận yêu cầu kết bạn`;
  const idNguoiNhan = parseInt(req.body.requestID);
  const idNguoiGui = parseInt(req.auth_decoded.ma_nguoi_dung);
  const NOT_HAVE_REQUEST_ADD_FRIEND = `Bạn chưa gửi lời mời đến người dùng này`;

  // Ngươi dùng phải nhập id friend muốn kết bạn
  if (Number.isNaN(idNguoiNhan)) {
    res.status(400).json(new Response(400, [], NOT_SEND_RECEIVER_ID, 300, 300));
    return;
  }
  const isHaveRequest = await loiMoiKetBanModel
    .havePendingRequestAddFriend(idNguoiGui, idNguoiNhan)
    .then((data) => data.payload);
  if (!isHaveRequest) {
    res
      .status(400)
      .json(new Response(400, [], NOT_HAVE_REQUEST_ADD_FRIEND, 300, 300));
    return;
  }
  req.body.requestID = idNguoiNhan;
  next();
};

const preProccessSuggestFriendMid = async (req, res, next) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const listFriendIds = await banbeHelper.getListFriendIdsOfUser(user_id);
  const userIdsHaveWaittingResponse =
    await loiMoiKetBanHelper.getIdsOfReceiverInPendingAddFriendRequestOf(
      user_id
    );

  const userIdsHaveSendRequest =
    await loiMoiKetBanHelper.getIdsOfSenderInPendingAddFriendRequestTo(user_id);

  const unSuggestedFriendIds = [
    ...listFriendIds,
    ...userIdsHaveWaittingResponse,
    ...userIdsHaveSendRequest,
  ];

  unSuggestedFriendIds.push(user_id);
  // console.log(unSuggestedFriendIds);

  const danhsachGiong = await petHelper.getAllGiongOfPetsOwnedByUser(user_id);

  req.body.UN_SUGGESTED_FRIEND_IDS = unSuggestedFriendIds;
  req.body.DANH_SACH_MA_GIONG = danhsachGiong;
  next();
  // const pets = await petModel.getAllOwnsPetOf(user_id);
};

const userIdsShouldNotSuggestForUser = async (user_id) => {
  const listFriendIds = await banbeHelper.getListFriendIdsOfUser(user_id);
  const userIdsHaveWaittingResponse =
    await loiMoiKetBanHelper.getIdsOfReceiverInPendingAddFriendRequestOf(
      user_id
    );

  const userIdsHaveSendRequest =
    await loiMoiKetBanHelper.getIdsOfSenderInPendingAddFriendRequestTo(user_id);
  const unSuggestedFriendIds = [
    ...listFriendIds,
    ...userIdsHaveWaittingResponse,
    ...userIdsHaveSendRequest,
  ];
  unSuggestedFriendIds.push(user_id);
  return unSuggestedFriendIds;
};

const preProcessSuggestFriendNavMid = async (req, res, next) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const suggestRecord = await suggestFriendModel
    .getSuggestedFriendForUser(user_id)
    .then((data) => data.payload);
  const listFriendIds = req.body.FRIEND_IDS;
  const danhsachMaGiong = req.body.DANH_SACH_MA_GIONG;

  req.body.ACTION = {
    returnSuggested: "OLD_RECORD",
    evaluateNew: false,
  };

  if (suggestRecord === null) {
    req.body.ACTION.returnSuggested = "RANDOM";
    req.body.ACTION.evaluateNew = true;
  } else if (
    !areTwoSetsEqual(
      new Set(suggestRecord.friendIdsList),
      new Set(listFriendIds)
    ) ||
    !areTwoSetsEqual(
      new Set(suggestRecord.breedIdsList),
      new Set(danhsachMaGiong)
    )
  ) {
    req.body.ACTION.returnSuggested = "OLD_RECORD";
    req.body.ACTION.evaluateNew = true;
  } else if (suggestRecord.expireAt < new Date()) {
    req.body.ACTION.returnSuggested = "OLD_RECORD";
    req.body.ACTION.evaluateNew = true;
  }
  // console.log(req.body.ACTION);
  next();
};

const preProccessSuggestFriendMid_v2 = async (req, res, next) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  req.body.FRIEND_IDS = await banbeHelper.getListFriendIdsOfUser(user_id);
  req.body.UN_SUGGESTED_FRIEND_IDS = await userIdsShouldNotSuggestForUser(
    user_id
  );
  req.body.DANH_SACH_MA_GIONG = await petHelper
    .getAllGiongOfPetsOwnedByUser(user_id)
    .then((data) => [...new Set(data)]);

  next();
};

module.exports = {
  AddByUserNameMid,
  AddByUserIdMid,
  checkFriendShipExistsMid,
  hasReceiveRequestAddFriendFromMid,
  hasSendRequestAddFriendToMid,
  preProccessSuggestFriendMid,
  preProccessSuggestFriendMid_v2,
  preProcessSuggestFriendNavMid,
};
