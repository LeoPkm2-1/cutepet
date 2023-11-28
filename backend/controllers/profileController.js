const userHelper = require("../utils/userHelper");
const anhNguoiDungModel = require("../models/anhNguoiDungModel");
const laBanBeModel = require("../models/laBanBeModel");
const petModel = require("../models/petModel");
const petHelper = require("../utils/petHelper");
const { Response } = require("../utils/index");
const StatusPostModel = require("../models/BaiViet/StatusPostModel");
const { haveFriendShipBetween } = require("../utils/banbeHelper");
const loiMoiKetBanModel = require("../models/loiMoiKetBanModel");
const statusPostHelper = require("../utils/BaiViet/statusPostHelper");

async function getRequestAddFriendStatusOfOnePersonToYou(person_id, your_id) {
  const isFriend = await haveFriendShipBetween(person_id, your_id);
  let result = null;
  if (isFriend) return null;
  const waittingYourRespone = await loiMoiKetBanModel
    .havePendingRequestAddFriend(person_id, your_id)
    .then((data) => data.payload);
  const hasSendRequestAddFriend = await loiMoiKetBanModel
    .havePendingRequestAddFriend(your_id, person_id)
    .then((data) => data.payload);

  if (waittingYourRespone) {
    result = "WAITTING_YOUR_RESPONE";
    return result;
  }

  if (hasSendRequestAddFriend) {
    result = "HAS_SEND_REQUEST_ADD_FRIEND";
    return result;
  }
  return result;
}

// (async function () {
//   const data = await getRequestAddFriendStatusOfOnePersonToYou(10, 2);
//   console.log(data);
// })();

async function myProfileController(req, res) {
  const userid = req.auth_decoded.ma_nguoi_dung;
  const userPublicInfor = await userHelper.getUserPublicInforByUserId(userid);
  const danh_sach_anh_dai_dien = await anhNguoiDungModel
    .getDSAnhDaiDienNguoiDung(userid)
    .then((data) => data.payload);
  const friendIdList = await laBanBeModel
    .getAllFriendIdsOfUser(userid)
    .then((data) => data.payload)
    .then((friendIdObjList) =>
      friendIdObjList.map((friendIdObj) => friendIdObj.friend_id)
    );
  const publicFriendInforList = await userHelper.getUserPublicInforByListIds(
    friendIdList
  );
  const listOfPetId = await petModel
    .getAllOwnsPetOf(userid)
    .then((data) => data.payload.map((pet) => pet.ma_thu_cung));
  const danh_sach_thu_cung = await petHelper.publicInforOfListPet(listOfPetId);

  res.status(200).json({
    thong_tin_profile_user: userPublicInfor,
    danh_sach_anh_dai_dien,
    danh_sach_ban_be: publicFriendInforList,
    danh_sach_thu_cung,
  });
}

async function userProfileController(req, res) {
  const myId = parseInt(req.auth_decoded.ma_nguoi_dung);
  const findingUserId = parseInt(req.body.user_id);

  if (myId == findingUserId) {
    await myProfileController(req, res);
    return;
  }

  const userPublicInfor = await userHelper.getUserPublicInforByUserId(
    findingUserId
  );
  // check user is in friendzone with query user
  const laBanBe = await haveFriendShipBetween(myId, findingUserId);
  // if query user is not a friend remove sensitive data in userPublicInfor
  if (!laBanBe) {
    userPublicInfor.email = "";
    userPublicInfor.so_dien_thoai = "";
    userPublicInfor.ngay_sinh = "";
  }
  const danh_sach_anh_dai_dien = await anhNguoiDungModel
    .getDSAnhDaiDienNguoiDung(findingUserId)
    .then((data) => data.payload);
  const friendIdList = await laBanBeModel
    .getAllFriendIdsOfUser(findingUserId)
    .then((data) => data.payload)
    .then((friendIdObjList) =>
      friendIdObjList.map((friendIdObj) => friendIdObj.friend_id)
    );
  const publicFriendInforList = await userHelper.getUserPublicInforByListIds(
    friendIdList
  );
  const listOfPetId = await petModel
    .getAllOwnsPetOf(findingUserId)
    .then((data) => data.payload.map((pet) => pet.ma_thu_cung));
  const danh_sach_thu_cung = await petHelper.publicInforOfListPet(listOfPetId);
  const thong_tin_ve_gui_loi_moi_ket_ban =
    await getRequestAddFriendStatusOfOnePersonToYou(findingUserId, myId);
  res.status(200).json({
    thong_tin_profile_user: userPublicInfor,
    la_ban_be: laBanBe,
    thong_tin_ve_gui_loi_moi_ket_ban: thong_tin_ve_gui_loi_moi_ket_ban,
    danh_sach_anh_dai_dien,
    danh_sach_ban_be: laBanBe ? publicFriendInforList : [],
    danh_sach_thu_cung,
  });
}

async function myTimelineBackwardController(req, res) {
  const userid = req.auth_decoded.ma_nguoi_dung;
  const { before, num } = req.body;
  const posts = await StatusPostModel.getAllPostOfUserBeforeTime(
    userid,
    before,
    num
  ).then((data) => data.payload);
  // insert owner infor for each post
  await statusPostHelper.InsertOwnerInforOfListPosts(posts);

  // insert infor to indicate that  has user liked each post?
  await statusPostHelper.insertUserLikePostInforOfListPosts(userid, posts);
  res.status(200).json(new Response(200, posts, ""));
}

// async function userTimelineBackwardController(req, res) {
//   const myid = req.auth_decoded.ma_nguoi_dung;
//   const findingUserId = req.body.user_id;
//   const { before, num } = req.body;
//   // check user is in friendzone with query user
//   const laBanBe = await haveFriendShipBetween(myid, findingUserId);
//   let listOfPost = [];
//   let timepoint = before;
//   do {
//     const posts = await StatusPostModel.getAllPostOfUserBeforeTime(
//       findingUserId,
//       timepoint,
//       num
//     ).then((data) => data.payload);
//     // don't have any more post
//     if (posts.length == 0) break;
//     // filter to find suitable visibility
//     const chunkPosts = posts.filter(
//       (post) =>
//         post.visibility == "PUBLIC" ||
//         (post.visibility == "JUST_FRIENDS" && laBanBe) ||
//         (post.visibility == "PRIVATE" && post.taggedUsers.includes(myid))
//     );
//     if (typeof listOfPost.at(-1) == "undefined")
//       listOfPost = listOfPost.concat(chunkPosts);
//     else listOfPost = listOfPost.concat(chunkPosts.slice(1));
//     console.log(listOfPost);
//     break;
//     //   timepoint = chunkPosts.at(-1).createAt;
//   } while (listOfPost.length < num);
//   // console.log(listOfPost);
//   // res.send(listOfPost.length);
//   res.status(200).json({ listOfPost, len: listOfPost.length });
// }

async function userTimelineBackwardController(req, res) {
  const reader_id = req.auth_decoded.ma_nguoi_dung;
  const findingUserId = req.body.user_id;
  if (reader_id == findingUserId) {
    await myTimelineBackwardController(req, res);
    return;
  } else {
    const { before, num } = req.body;
    // check user is in friendzone with query user
    const laBanBe = await haveFriendShipBetween(reader_id, findingUserId);
    let listOfPost = await StatusPostModel.getPostOfUserForReaderBeforeTime(
      findingUserId,
      reader_id,
      laBanBe,
      before,
      num
    ).then((data) => data.payload);
    // console.log("length:", listOfPost.length);
    // insert owner infor for each post
    await statusPostHelper.InsertOwnerInforOfListPosts(listOfPost);
    // insert infor to indicate that  has user liked each post?
    await statusPostHelper.insertUserLikePostInforOfListPosts(
      reader_id,
      listOfPost
    );
    res.status(200).json(new Response(200, listOfPost, ""));
    return;
  }
}

module.exports = {
  myProfileController,
  myTimelineBackwardController,
  userProfileController,
  userTimelineBackwardController,
};
