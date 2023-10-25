const userModel = require("../models/userModel");
const userHelper = require("./../utils/userHelper");
const { Response } = require("./../utils/index");

// gọi để model để lấy thông tin người dùng trong bảng người dùng
const getUserByUserName = async (req, res) => {
  const username = req.params.username;
  const user = await userModel
    .getUserByUsername(username)
    .then((data) => data.payload[0]);
  res.status(200).json(new Response(200, user, ""));
};

// trả về thông tin người dụng dạng đầy đủ
const userPublicInforByUserName = async (req, res) => {
  const username = req.params.username;
  const userPubInfor = await userHelper.getUserPublicInforByUserName(username);
  res.status(200).json(new Response(200, userPubInfor, ""));
};

// searchPeopleByNameController
const searchPeopleController = async (req, res) => {
  let searchKey = req.body.searchKey;
  let index = req.body.index;
  let num = req.body.num;
  // console.log(searchKey);
  if (typeof searchKey != "string" || searchKey.trim() == "") {
    res
      .status(200)
      .json(new Response(200, [], "vui lòng nhập tên người dùng hợp lệ"));
    return;
  }
  searchKey = searchKey.trim();
  const lisUser = await userModel
    .searchUserBySearchKey(searchKey, index, num)
    .then((data) => data.payload);
  if (lisUser.length <= 0) {
    res.status(200).json(new Response(200, lisUser, ""));
    return;
  }
  const listIds = userHelper.extractListIdFromListUser(
    lisUser,
    "ma_nguoi_dung"
  );
  const listUserPubInfor = await userHelper
    .getUserPublicInforByListIds(
      listIds,
      parseInt(req.auth_decoded.ma_nguoi_dung)
    )
    .then((data) =>
      data.map((user) => {
        const newUser = {
          ...user,
          isFriend: user.checkFriend.isFriend,
        };
        delete newUser.checkFriend;
        return newUser;
      })
    );
  // console.log('\n\n\nlistUserPubInfor');
  // console.log(listUserPubInfor);
  res.status(200).json(new Response(200, listUserPubInfor, ""));
};

module.exports = {
  getUserByUserName,
  userPublicInforByUserName,
  searchPeopleController,
};
