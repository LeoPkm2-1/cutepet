const userHelper = require("../utils/userHelper");
const anhNguoiDungModel = require("../models/anhNguoiDungModel");
const laBanBeModel = require("../models/laBanBeModel");
const petModel = require("../models/petModel");
const petHelper = require("../utils/petHelper");
const { Response } = require("./../utils/index");
const StatusPostModel = require("../models/BaiViet/StatusPostModel");

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
    ...userPublicInfor,
    danh_sach_anh_dai_dien,
    danh_sach_ban_be: publicFriendInforList,
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
  res.status(200).json(new Response(200, posts, ""));
}

module.exports = { myProfileController, myTimelineBackwardController };
