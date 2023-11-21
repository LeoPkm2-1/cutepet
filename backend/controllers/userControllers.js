const userModel = require("../models/userModel");
const userHelper = require("./../utils/userHelper");
const loginHelper = require("./../utils/loginHelper");
const { getHash } = require("./../utils/hash");
const { Response } = require("./../utils/index");
const anhNguoiDungModel = require("../models/anhNguoiDungModel");

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

const insertRequestAddFriendStatusOfEachPersonToYou = async (listOfPeople) => {
  listOfPeople.forEach((element, index) => {
    if (element.isFriend == true) {
      element["requestAddFriendStatus"] = null;
    } else {
      element["requestAddFriendStatus"] = true;
    }
  });
  console.log(listOfPeople);
};

// Sample array of objects
let arrayOfObjects = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Doe" },
];

(async function () {
  await insertRequestAddFriendStatusOfEachPersonToYou(arrayOfObjects);
})();

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

const changePasswordController = async (req, res) => {
  const { old_pass, new_pass, confirm_pass } = req.body;
  const user = req.auth_decoded;

  const { match, userInfor } = (data = await loginHelper.checkUsernameAndPass(
    user.tai_khoan,
    old_pass
  ));
  // console.log(match);
  if (!match) {
    res.status(400).json(new Response(400, [], "Mật khẩu hiện tại không đúng"));
    return;
  }
  // console.log(user.tai_khoan);
  const newHassPass = await getHash(new_pass);
  await userModel.updateUserPasswordByUserName(user.tai_khoan, newHassPass);
  res.status(200).json(new Response(200, [], "Đổi mật khẩu thành công"));
};

const updateAvatarController = async (req, res) => {
  const { url_anh } = req.body;
  const userId = parseInt(req.auth_decoded.ma_nguoi_dung);
  // res.send(`${url_anh}`);
  const updateAvatarProcess = await anhNguoiDungModel
    .CapNhatAnhDaiDienNguoiDung(url_anh, userId)
    .then((data) => data.payload);
  updateAvatarProcess.insertId = Number(updateAvatarProcess.insertId);
  // console.log(updateAvatarProcess);
  res
    .status(200)
    .json(
      new Response(200, updateAvatarProcess, "cập nhật ảnh đại diện thành công")
    );
};

const updateBasicInforController = async (req, res) => {
  const { ten, ngay_sinh, so_dien_thoai, gioi_tinh } = req.body;
  const update_userId = parseInt(req.auth_decoded.ma_nguoi_dung);
  // console.log({ ten, ngay_sinh, so_dien_thoai, gioi_tinh });
  const process = await userModel
    .updateUserBasicInfor(update_userId, {
      ten,
      ngay_sinh:
        ngay_sinh != null
          ? `${ngay_sinh.getFullYear()}-${
              ngay_sinh.getMonth() + 1
            }-${ngay_sinh.getDate()}`
          : null,
      so_dien_thoai,
      gioi_tinh,
    })
    .then((data) => data.payload);
  process.insertId = Number(process.insertId);
  // console.log(process);
  // res.send("ahihi");
  res
    .status(200)
    .json(new Response(200, process, "cập nhật thông tin cá nhân thành công"));
};

const myProfile = async (params) => {};

module.exports = {
  getUserByUserName,
  userPublicInforByUserName,
  searchPeopleController,
  myProfile,
  changePasswordController,
  updateAvatarController,
  updateBasicInforController,
};
