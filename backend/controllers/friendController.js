const loiMoiKetBanModel = require("../models/loiMoiKetBanModel");
const laBanBeModel = require("../models/laBanBeModel");
const userHelper = require("./../utils/userHelper");
const { Response } = require("./../utils/index");
const userOnlineModel = require("./../models/UserOnline/userOnlineModel");
const theodoiHelper = require("../utils/theodoiHelper");

// gửi lời mời kết bạn
const requestAddFriend = async (req, res) => {
  const NOT_SELF_REQUIRE_ADD_FRIEND_MESS =
    "Người Gửi không thể gửi lời mời kết bạn đến chính mình";
  const NOT_SEND_REQUIRE_ID =
    "Bắt buộc phải nhập ID người muốn gửi lời mời kết bạn";
  const BAN_TO_SEND_REQUEST = "không đủ điều kiện để gửi lời mời kết bạn";
  try {
    const idNguoiNhan = parseInt(req.body.requestID);
    const idNguoiGui = parseInt(req.auth_decoded.ma_nguoi_dung);
    // Ngươi dùng phải nhập id friend muốn kết bạn
    if (Number.isNaN(idNguoiNhan)) {
      throw new Error(NOT_SEND_REQUIRE_ID);
    }
    // người gửi và người nhận không dc trùng nhau
    if (idNguoiGui === idNguoiNhan) {
      throw new Error(NOT_SELF_REQUIRE_ADD_FRIEND_MESS);
    }
    const condition = await userHelper.conditionToSendAddFriendRequest(
      idNguoiGui,
      idNguoiNhan
    );
    if (!condition) {
      throw new Error(BAN_TO_SEND_REQUEST);
    }
    const data = await loiMoiKetBanModel.sendRequestAddFriend(
      idNguoiGui,
      idNguoiNhan
    );
    if (data.status == 200) {
      res.status(200).json(new Response(200, [], "Gửi lời mời thành công"));
    } else {
      console.log(data.message);
      res
        .status(400)
        .json(new Response(400, [], data.message, data.errno, data.errcode));
    }
  } catch (error) {
    switch (error.message) {
      case NOT_SEND_REQUIRE_ID:
        res
          .status(400)
          .json(new Response(400, [], NOT_SEND_REQUIRE_ID, 300, 300));
        return;
      case NOT_SELF_REQUIRE_ADD_FRIEND_MESS:
        res
          .status(400)
          .json(
            new Response(400, [], NOT_SELF_REQUIRE_ADD_FRIEND_MESS, 300, 300)
          );
        return;
      case BAN_TO_SEND_REQUEST:
        res
          .status(400)
          .json(new Response(400, [], BAN_TO_SEND_REQUEST, 300, 300));
      default:
        break;
    }
  }
};

// phản hồi lời mới kết bạn
const responeAddFriend = async (req, res) => {
  const NOT_SEND_SENDER_ID = `phải nhập id của người gửi yêu cầu kết bạn`;
  const RESPONE_INFOR_NOT_TRUE = `thông tin phản hồi lời mời kết bạn không đúng`;
  let NOT_HAVE_REQUEST_ADD_FRIEND = "";
  try {
    const idNguoiGui = parseInt(req.body.senderID);
    const idNguoiPhanHoi = parseInt(req.auth_decoded.ma_nguoi_dung);
    NOT_HAVE_REQUEST_ADD_FRIEND = `không tồn tại lời mời kết bạn từ ${idNguoiGui} đến ${idNguoiPhanHoi}`;
    const REJECT_MESSAGE = `người dùng ${idNguoiPhanHoi} đã từ chối lời mời kết bạn từ ${idNguoiGui}}`;
    const respone_infor = req.body.acceptOrReject
      ? req.body.acceptOrReject.toUpperCase()
      : "";
    // Ngươi dùng phải nhập id friend muốn kết bạn
    if (Number.isNaN(idNguoiGui)) {
      throw new Error(NOT_SEND_SENDER_ID);
    }
    const isHaveRequest = await loiMoiKetBanModel
      .havePendingRequestAddFriend(idNguoiGui, idNguoiPhanHoi)
      .then((data) => data.payload);
    if (!isHaveRequest) {
      throw new Error(NOT_HAVE_REQUEST_ADD_FRIEND);
    }
    if (respone_infor == "REJECT") {
      await loiMoiKetBanModel.updatePendingRequestToReject(
        idNguoiGui,
        idNguoiPhanHoi
      );
      res
        .status(200)
        .json(new Response(200, { accepted: false }, REJECT_MESSAGE));
      return;
    } else if (respone_infor == "ACCEPT") {
      await loiMoiKetBanModel.deleteRequestAddFriend(
        idNguoiGui,
        idNguoiPhanHoi
      );
      // accept
      await laBanBeModel.insertFriendShip(idNguoiGui, idNguoiPhanHoi);
      // insert follow to follow table
      await theodoiHelper.followUser(idNguoiGui, idNguoiPhanHoi);
      await theodoiHelper.followUser(idNguoiPhanHoi, idNguoiGui);
      res
        .status(200)
        .json(
          new Response(200, { accepted: true }, "thêm qua hệ bạn bè thành công")
        );
    } else {
      throw new Error(RESPONE_INFOR_NOT_TRUE);
    }
  } catch (error) {
    switch (error.message) {
      case NOT_SEND_SENDER_ID:
        res
          .status(400)
          .json(new Response(400, [], NOT_SEND_SENDER_ID, 300, 300));
        return;

      case NOT_HAVE_REQUEST_ADD_FRIEND:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_REQUEST_ADD_FRIEND, 300, 300));
        return;

      case RESPONE_INFOR_NOT_TRUE:
        res
          .status(400)
          .json(new Response(400, [], RESPONE_INFOR_NOT_TRUE, 300, 300));
        return;
      default:
        console.log(error);
    }
  }
  // res.status(200).send('ok');
};

// xóa bạn bè
const unFriendById = async (req, res) => {
  const friend_id = parseInt(req.body.friend_id);
  const ma_nguoi_dung = parseInt(req.auth_decoded.ma_nguoi_dung);
  const deleteProcess = await laBanBeModel
    .deleteFriendShip(ma_nguoi_dung, friend_id)
    .then((data) => {
      data.payload.insertId = parseInt(data.payload.insertId);
      return data.payload;
    });

  await Promise.all([
    await theodoiHelper.unFollowUser(ma_nguoi_dung, friend_id),
    await theodoiHelper.unFollowUser(friend_id, ma_nguoi_dung),
  ]);
  res
    .status(200)
    .json(
      new Response(
        200,
        deleteProcess,
        `hủy bạn bè với ${friend_id} thành công `
      )
    );
};
const getRequestAddFriendList = async (req, res) => {
  const user_id = req.auth_decoded.ma_nguoi_dung;
  const addFriendRequests = await loiMoiKetBanModel.getAllPendingRequest(
    user_id
  );
  if (addFriendRequests.length <= 0) {
    res
      .status(200)
      .json(
        new Response(200, addFriendRequests, "không có lời mời kết bạn nào")
      );
    return;
  }
  const sender_ids = addFriendRequests.map((request) => request.ma_nguoi_gui);
  const users_infor = await userHelper.getUserPublicInforByListIds(sender_ids);
  const requestAndUserInfor = addFriendRequests.map((request, index) => {
    return { ...request, thong_tin_nguoi_gui: users_infor[index] };
  });
  res
    .status(200)
    .json(
      new Response(200, requestAndUserInfor, "lấy lời mời kết bạn thành công")
    );
};

const getFriendList = async (req, res) => {
  const user_id = req.auth_decoded.ma_nguoi_dung;
  const friendList = await laBanBeModel
    .getAllFriendShipOfUser(user_id)
    .then((data) => data.payload);
  if (friendList.length <= 0) {
    res.status(200).json(new Response(200, [], "không có bạn bè nào"));
    return;
  }
  const friend_ids = friendList.map((friend) => friend.ma_nguoi_dung_2);
  const friends_infor = await userHelper.getUserPublicInforByListIds(
    friend_ids
  );
  await Promise.all(
    friends_infor.map(async (user) => {
      console.log(user.ma_nguoi_dung);
      const isOnline = await userOnlineModel.isUserOnline(user.ma_nguoi_dung);
      user.isOnline = isOnline == true ? true : false;
    })
  );
  res.json(new Response(200, friends_infor, "lấy danh sách bạn bè thành công"));
};
module.exports = {
  requestAddFriend,
  responeAddFriend,
  unFriendById,
  getRequestAddFriendList,
  getFriendList,
};
