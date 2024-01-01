const loiMoiKetBanModel = require("../models/loiMoiKetBanModel");
const laBanBeModel = require("../models/laBanBeModel");
const userHelper = require("./../utils/userHelper");
const { Response } = require("./../utils/index");
const userOnlineModel = require("./../models/UserOnline/userOnlineModel");
const theodoiHelper = require("../utils/theodoiHelper");
const suggestFriendModel = require("../models/goiYBanBe/suggestFriendModel");
const {
  notifyRequestAddFriend,
  notifyAcceptAddFriend,
} = require("../notificationHandler/friend");
const friendHelper = require("../utils/banbeHelper");
const loiMoiKetBanHelper = require("../utils/loiMoiKetBanHelper");
const petModel = require("../models/petModel");
const userModel = require("../models/userModel");
const petHelper = require("../utils/petHelper");

// gửi lời mời kết bạn
const requestAddFriend = async (req, res) => {
  const NOT_SELF_REQUIRE_ADD_FRIEND_MESS =
    "Người Gửi không thể gửi lời mời kết bạn đến chính mình";
  const NOT_SEND_REQUIRE_ID =
    "Bắt buộc phải nhập ID người muốn gửi lời mời kết bạn";
  const BAN_TO_SEND_REQUEST = "Không đủ điều kiện để gửi lời mời kết bạn";
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
      notifyRequestAddFriend(idNguoiGui, idNguoiNhan, new Date());
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
  const RESPONE_INFOR_NOT_TRUE = `thông tin phản hồi lời mời kết bạn không đúng`;

  try {
    const idNguoiGui = parseInt(req.body.senderID);
    const idNguoiPhanHoi = parseInt(req.auth_decoded.ma_nguoi_dung);

    const REJECT_MESSAGE = `người dùng ${idNguoiPhanHoi} đã từ chối lời mời kết bạn từ ${idNguoiGui}}`;
    const respone_infor = req.body.acceptOrReject
      ? req.body.acceptOrReject.toUpperCase()
      : "";

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
      // gửi thông báo khi dc chấp nhận bạn bè
      notifyAcceptAddFriend(idNguoiPhanHoi, idNguoiGui, new Date());
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
      case RESPONE_INFOR_NOT_TRUE:
        res
          .status(400)
          .json(new Response(400, [], RESPONE_INFOR_NOT_TRUE, 300, 300));
        return;
      default:
        console.log(error);
    }
  }
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
  const addFriendRequests = await loiMoiKetBanModel.getAllPendingRequestToUser(
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
      // console.log(user.ma_nguoi_dung);
      const isOnline = await userOnlineModel.isUserOnline(user.ma_nguoi_dung);
      user.isOnline = isOnline == true ? true : false;
    })
  );
  res.json(new Response(200, friends_infor, "lấy danh sách bạn bè thành công"));
};

// bỏ theo dõi bạn bè
const unfollowFriend = async (req, res) => {
  const friend_id = parseInt(req.body.friend_id);
  const ma_nguoi_dung = parseInt(req.auth_decoded.ma_nguoi_dung);
  const data = await theodoiHelper
    .unFollowUser(ma_nguoi_dung, friend_id)
    .then((data) => data.payload);
  console.log(data);
  res
    .status(200)
    .json(
      new Response(
        200,
        [],
        `người dùng ${ma_nguoi_dung} đã bỏ theo dõi người dùng ${friend_id}`
      )
    );
};

const removeRequestAddFriend = async (req, res) => {
  // res.send("ahihi");
  const recipient_id = req.body.requestID;
  const sender_id = req.auth_decoded.ma_nguoi_dung;
  const deleteProcess = await loiMoiKetBanModel
    .deletePendingRequest(sender_id, recipient_id)
    .then((data) => data.payload)
    .then((data) => {
      data.insertId = parseInt(data.insertId);
      return data;
    });
  // console.log(deleteProcess);
  res.status(200).json(new Response(200, deleteProcess, "OK"));
};

const commonMaGiongOfTwoDanhSachGiong = (danhSachGiong_1, danhSachGiong_2) => {
  danhSachGiong_1 = danhSachGiong_1.map((magiong) => parseInt(magiong));
  danhSachGiong_2 = danhSachGiong_2.map((magiong) => parseInt(magiong));
  return danhSachGiong_1.filter((element) => danhSachGiong_2.includes(element));
};

const handleFriendsOfFriendToSuggest = async (req, res) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  // console.log({user_id});
  let { USER_SUGGEST_ID } = req.body;
  const { UN_SUGGESTED_FRIEND_IDS, NUM_OF_USER_SUGGEST, DANH_SACH_MA_GIONG } =
    req.body;
  const listFriendIdsOfFriends = await laBanBeModel
    .getFriendOfFriendForUser(user_id, UN_SUGGESTED_FRIEND_IDS)
    .then((data) => data.payload.map((idObj) => idObj.friend_of_friend_id));
  req.body.USER_SUGGEST_ID = [...listFriendIdsOfFriends, ...USER_SUGGEST_ID];
  req.body.TABLE_SCORES_FOR_SUGGEST = await Promise.all(
    req.body.USER_SUGGEST_ID.map(async (suggest_user_id) => {
      const numOfCommonFriend =
        await laBanBeModel.getNumberOfCommonFriendOfTwoDisTinctUsers(
          user_id,
          suggest_user_id
        );
      const danhSachGiong = await petHelper.getAllGiongOfPetsOwnedByUser(
        suggest_user_id
      );
      danh_sach_giong_chung = commonMaGiongOfTwoDanhSachGiong(
        danhSachGiong,
        DANH_SACH_MA_GIONG
      );
      return {
        user_suggested_id: suggest_user_id,
        num_of_common_friend: numOfCommonFriend,
        danh_sach_giong: danhSachGiong,
        giong_chung: danh_sach_giong_chung,
        score: 0,
      };
    })
  );
  // calculate score
  req.body.TABLE_SCORES_FOR_SUGGEST.map((suggest_user) => {
    suggest_user.score =
      suggest_user.num_of_common_friend * 15 +
      suggest_user.giong_chung.length * 20;
  });
  req.body.TABLE_SCORES_FOR_SUGGEST.sort((a, b) => b.score - a.score);
};

const getListSuggestedFriendController = async (req, res) => {
  const NUM_OF_USER_SUGGEST = 10;
  req.body.NUM_OF_USER_SUGGEST = NUM_OF_USER_SUGGEST;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const { DANH_SACH_MA_GIONG, UN_SUGGESTED_FRIEND_IDS } = req.body;
  // DANH_SACH_MA_GIONG = [403];
  const userid_list_match_pet = await petModel
    .getListUserIdsHaveGiongOfPetMatchListOfGiong_2(
      DANH_SACH_MA_GIONG,
      UN_SUGGESTED_FRIEND_IDS,
      NUM_OF_USER_SUGGEST
    )
    .then((data) => data.payload);
  let user_suggest_id = [];
  if (userid_list_match_pet.length < NUM_OF_USER_SUGGEST) {
    let random_user_id = await userModel
      .getUserIdThatNoteContainUsers(
        [...userid_list_match_pet, ...UN_SUGGESTED_FRIEND_IDS],
        // NUM_OF_USER_SUGGEST - userid_list_match_pet.length
        NUM_OF_USER_SUGGEST
      )
      .then((data) => data.payload);
    random_user_id = userHelper.randomGetUserIdInlistId(
      random_user_id,
      NUM_OF_USER_SUGGEST - userid_list_match_pet.length
    );
    // console.log({random_user_id});
    user_suggest_id = [...userid_list_match_pet, ...random_user_id];
  } else {
    user_suggest_id = userid_list_match_pet;
  }
  req.body.USER_SUGGEST_ID = user_suggest_id;
  req.body.UN_SUGGESTED_FRIEND_IDS = [
    ...user_suggest_id,
    ...UN_SUGGESTED_FRIEND_IDS,
  ];

  await handleFriendsOfFriendToSuggest(req, res);
  const suggestedUserIdSortByScore = req.body.TABLE_SCORES_FOR_SUGGEST.map(
    (user) => user.user_suggested_id
  );
  // console.log({ suggestedUserIdSortByScore });
  const userSuggestInfor = await userHelper.getUserPublicInforByListIds(
    suggestedUserIdSortByScore
  );
  res.status(200).json(new Response(200, userSuggestInfor, ""));
  return;
};

const getListOfAllUserrecievedRequestAddFriendFromMe = async (req, res) => {
  const my_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  let listUserHaveRecievedMyRequest = await loiMoiKetBanModel
    .getAllPendingRequestHaveSendOfUser(my_id)
    .then((data) =>
      data.map((request) => {
        delete request.ma_nguoi_gui;
        return request;
      })
    );
  listUserHaveRecievedMyRequest = await Promise.all(
    listUserHaveRecievedMyRequest.map(async (request) => {
      request.thong_tin_nguoi_nhan =
        await userHelper.getUserPublicInforByUserId(request.ma_nguoi_nhan);
      return request;
    })
  );
  res.status(200).json(new Response(200, listUserHaveRecievedMyRequest, ""));
  return;
};

const handleReturnListSuggestedFriend = async (req, res) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const { UN_SUGGESTED_FRIEND_IDS, DANH_SACH_MA_GIONG, NUM_OF_USER_SUGGEST } =
    req.body;
  const { returnSuggested } = req.body.ACTION;
  let user_suggest_id = [];
  if (returnSuggested == "RANDOM") {
    const userid_list_match_pet = await petModel
      .getListUserIdsHaveGiongOfPetMatchListOfGiong_2(
        DANH_SACH_MA_GIONG,
        UN_SUGGESTED_FRIEND_IDS,
        Math.round(NUM_OF_USER_SUGGEST * 0.6)
      )
      .then((data) => data.payload);
    const random_user_id_set = await userModel
      .getUserIdThatNoteContainUsers(
        [...userid_list_match_pet, ...UN_SUGGESTED_FRIEND_IDS],
        NUM_OF_USER_SUGGEST
      )
      .then((data) => data.payload);
    const random_user_id = userHelper.randomGetUserIdInlistId(
      random_user_id_set,
      NUM_OF_USER_SUGGEST - userid_list_match_pet.length
    );
    user_suggest_id = [...userid_list_match_pet, ...random_user_id];
  } else {
    const suggestRecord = await suggestFriendModel
      .getSuggestedFriendForUser(user_id)
      .then((data) => data.payload);
    user_suggest_id = [...suggestRecord.suggestedFriends];
  }
  const usersSuggestedInfor = await userHelper.getUserPublicInforByListIds(
    user_suggest_id
  );
  res.status(200).json(new Response(200, usersSuggestedInfor, ""));
  // return;
};
const getListSuggestedFriendController_v2 = async (req, res, next) => {
  const NUM_OF_USER_SUGGEST = 10;
  req.body.NUM_OF_USER_SUGGEST = NUM_OF_USER_SUGGEST;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const { UN_SUGGESTED_FRIEND_IDS, DANH_SACH_MA_GIONG, FRIEND_IDS } = req.body;
  // handle return list suggested friend
  handleReturnListSuggestedFriend(req, res);
  // handle update suggest record
  let user_suggest_id = [];
  // // user have same breed
  const userid_list_match_pet = await petModel
    .getListUserIdsHaveGiongOfPetMatchListOfGiong_2(
      DANH_SACH_MA_GIONG,
      UN_SUGGESTED_FRIEND_IDS,
      Math.round(NUM_OF_USER_SUGGEST * 0.6)
    )
    .then((data) => data.payload);
  // // random user
  const random_user_id_set = await userModel
    .getUserIdThatNoteContainUsers(
      [...userid_list_match_pet, ...UN_SUGGESTED_FRIEND_IDS],
      // NUM_OF_USER_SUGGEST - userid_list_match_pet.length
      NUM_OF_USER_SUGGEST
    )
    .then((data) => data.payload);
  const random_user_id = userHelper.randomGetUserIdInlistId(
    random_user_id_set,
    NUM_OF_USER_SUGGEST - userid_list_match_pet.length
  );
  user_suggest_id = [...userid_list_match_pet, ...random_user_id];
  req.body.USER_SUGGEST_ID = user_suggest_id;
  req.body.UN_SUGGESTED_FRIEND_IDS = [
    ...user_suggest_id,
    ...UN_SUGGESTED_FRIEND_IDS,
  ];
  // // friend of friend
  const listFriendIdsOfFriends = await laBanBeModel
    .getFriendOfFriendForUser(user_id, req.body.UN_SUGGESTED_FRIEND_IDS)
    .then((data) => data.payload.map((idObj) => idObj.friend_of_friend_id));
  req.body.USER_SUGGEST_ID = [
    ...req.body.USER_SUGGEST_ID,
    ...listFriendIdsOfFriends,
  ];
  req.body.UN_SUGGESTED_FRIEND_IDS = [
    ...req.body.UN_SUGGESTED_FRIEND_IDS,
    ...listFriendIdsOfFriends,
  ];
  next();
  // console.log({ listFriendIdsOfFriends });
  // console.log({ userid_list_match_pet });
  // console.log({ random_user_id });
  // console.log({ USER_SUGGEST_ID: req.body.USER_SUGGEST_ID });
  // console.log({ UN_SUGGESTED_FRIEND_IDS: req.body.UN_SUGGESTED_FRIEND_IDS });
};

const timeScoreBetweenSuggestedCandidateAndUser = async (
  user_id,
  suggest_user_id
) => {
  const commonFriendsId = await laBanBeModel
    .getCommonFriendIdsOfTwoDisTinctUsers(user_id, suggest_user_id)
    .then((data) =>
      data.payload.map((commonObjId) => commonObjId.common_friend_id)
    );
  if (commonFriendsId.length == 0) return 0;

  const timeDate = await Promise.all(
    commonFriendsId.map(async (commonId) => {
      const timeStartOfUserAndCommon = await laBanBeModel
        .startTimeOfFriendShipBetween(user_id, commonId)
        .then((data) => data.payload[0].ngay_bat_dau);

      const timeStartOfCommonAndCandidate = await laBanBeModel
        .startTimeOfFriendShipBetween(commonId, suggest_user_id)
        .then((data) => data.payload[0].ngay_bat_dau);

      const delta_1 = new Date() - timeStartOfUserAndCommon; // milliseconds
      const delta_2 = new Date() - timeStartOfCommonAndCandidate; // milliseconds
      timeScore = (delta_1 * 3 + delta_2) / (1000 * 60 * 60 * 24 * 7);
      // console.log(`${user_id} - ${commonId} - ${suggest_user_id}`);
      return timeScore;
    })
  );
  // console.log({ timeDate });
  return Math.max(...timeDate);
};

const scoringForSuggestedFriendController = async (req, res) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const {
    UN_SUGGESTED_FRIEND_IDS,
    NUM_OF_USER_SUGGEST,
    DANH_SACH_MA_GIONG,
    USER_SUGGEST_ID,
  } = req.body;
  // console.log({ DANH_SACH_MA_GIONG });
  req.body.TABLE_SCORES_FOR_SUGGEST = await Promise.all(
    req.body.USER_SUGGEST_ID.map(async (suggest_user_id) => {
      const numOfCommonFriend =
        await laBanBeModel.getNumberOfCommonFriendOfTwoDisTinctUsers(
          user_id,
          suggest_user_id
        );
      const danhSachGiong = await petHelper
        .getAllGiongOfPetsOwnedByUser(suggest_user_id)
        .then((data) => [...new Set(data)]);
      const danh_sach_giong_chung = commonMaGiongOfTwoDanhSachGiong(
        danhSachGiong,
        DANH_SACH_MA_GIONG
      );
      const commonFriendsId = await laBanBeModel
        .getCommonFriendIdsOfTwoDisTinctUsers(user_id, suggest_user_id)
        .then((data) =>
          data.payload.map((commonObjId) => commonObjId.common_friend_id)
        );
      const timeScoreBetweenUserAndCandidate =
        await timeScoreBetweenSuggestedCandidateAndUser(
          user_id,
          suggest_user_id
        );
      // console.log({ suggest_user_id, numOfCommonFriend, commonFriendsId });
      console.log({ user_id, suggest_user_id });
      console.log({ timeScoreBetweenUserAndCandidate });
      console.log("\n");

      return {
        user_suggested_id: suggest_user_id,
        num_of_common_friend: numOfCommonFriend,
        common_friends_id: commonFriendsId,
        danh_sach_giong: danhSachGiong,
        giong_chung: danh_sach_giong_chung,
        score: 0,
      };
    })
  );
  // console.log(req.body.TABLE_SCORES_FOR_SUGGEST);
};

module.exports = {
  requestAddFriend,
  responeAddFriend,
  unFriendById,
  getRequestAddFriendList,
  getFriendList,
  unfollowFriend,
  removeRequestAddFriend,
  getListSuggestedFriendController,
  getListOfAllUserrecievedRequestAddFriendFromMe,
  getListSuggestedFriendController_v2,
  scoringForSuggestedFriendController,
};
