const userModel = require("./../models/userModel");
const loiMoiKetBanModel = require("../models/loiMoiKetBanModel");
const anhNguoiDungModel = require("../models/anhNguoiDungModel");
const banbeHelper = require("./banbeHelper");
const UtilsHelper = require("./UtilsHelper");

// return true if person 1 is friend of person 2
async function isFriend(person_id_1, person_id_2) {
  const data = await userModel.isFriend(person_id_1, person_id_2);
  if (data.status == 200) {
    return data.payload;
  }
  throw new Error(data.message);
}

async function isSendRequestAddFriend(sender_id, recipient_id) {
  const data = await loiMoiKetBanModel.havePendingRequestAddFriend(
    sender_id,
    recipient_id
  );
  if (data.status == 200) {
    return data.payload;
  }
  throw new Error(data.message);
}

// return true if sender have send request add friend to recipient
async function conditionToSendAddFriendRequest(sender_id, recipient_id) {
  try {
    const fiend = await isFriend(sender_id, recipient_id);
    if (fiend) return false;
    const haveSent_1 = await isSendRequestAddFriend(sender_id, recipient_id);
    if (haveSent_1) return false;
    const haveSent_2 = await isSendRequestAddFriend(recipient_id, sender_id);
    if (haveSent_2) return false;
    return true;
  } catch (error) {
    throw new Error(data.message);
  }
}
async function getUserPublicInforByUserName(
  username,
  checkIsFriendWith = undefined
) {
  const userInfor = await userModel
    .getUserByUsername(username)
    .then((data) => data.payload[0]);
  if (typeof userInfor === "undefined") return {};
  // remove sensitive infor
  delete userInfor.mat_khau;
  delete userInfor.token;
  delete userInfor.is_admin;
  // infor of avatar
  const anh = await anhNguoiDungModel
    .getAnhDaiDienHienTai(userInfor.ma_nguoi_dung)
    .then((data) =>
      data.payload.length > 0
        ? data.payload[0]
        : {
            ma_anh: null,
            url: "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2FUser-avatar.svg.png?alt=media&token=8fc5e517-78a1-4f12-84fa-2f18245f1dc9",
            ngay_cap_nhat: null,
            ma_nguoi_dung: `${userInfor.ma_nguoi_dung}`,
            is_active: null,
          }
    );
  // not check is friend with ....
  if (typeof checkIsFriendWith == "undefined") {
    const userPubInfor = { ...userInfor, anh };
    return userPubInfor;
  }
  //  check is friend with ....
  const isFriendWith = await banbeHelper.haveFriendShipBetween(
    checkIsFriendWith,
    userInfor.ma_nguoi_dung
  );
  const userPubInfor = {
    ...userInfor,
    anh,
    checkFriend: {
      userCheckFriend: checkIsFriendWith,
      isFriend: isFriendWith,
    },
  };
  return userPubInfor;
}

async function getUserPublicInforByUserId(
  user_id,
  checkIsFriendWith = undefined
) {
  let username = await userId2Username(user_id);
  username = username ? username : "";
  return await getUserPublicInforByUserName(username, checkIsFriendWith);
}

async function getUserPublicInforByListIds(
  listIds,
  checkIsFriendWith = undefined
) {
  return Promise.all(
    listIds.map(
      async (id) => await getUserPublicInforByUserId(id, checkIsFriendWith)
    )
  );
}

async function userId2Username(user_id) {
  return await userModel
    .getUsernameByUserId(user_id)
    .then((data) => data.tai_khoan);
}

async function Username2UserId(user_name) {
  return await userModel
    .getUserIdByUsername(user_name)
    .then((data) => data.ma_nguoi_dung);
}

function extractListIdFromListUser(listUser, idFieldName = "ma_nguoi_dung") {
  return UtilsHelper.extracValuesOfFieldFromListObjs(listUser, idFieldName);
}

function getSomeUserIdInRangeOf10(numOfRandomNumbers = 1) {
  const randomNumbers = [];

  while (randomNumbers.length < numOfRandomNumbers) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}

function randomGetUserIdInlistId(listId, numOfRandomNumbers = 0) {
  if (numOfRandomNumbers <= 0 || listId.length == 0) {
    return [];
  }
  numOfRandomNumbers =
    numOfRandomNumbers > listId.length ? listId.length : numOfRandomNumbers;
  const chosenValues = [];

  while (chosenValues.length < numOfRandomNumbers) {
    const randomIndex = Math.floor(Math.random() * listId.length);
    const randomValue = listId[randomIndex];

    if (!chosenValues.includes(randomValue)) {
      chosenValues.push(randomValue);
    }
  }

  return chosenValues;
}

// const data = getSomeUserIdInRangeOf10(3);
// console.log(data);

module.exports = {
  isFriend,
  isSendRequestAddFriend,
  conditionToSendAddFriendRequest,
  getUserPublicInforByUserName,
  userId2Username,
  Username2UserId,
  getUserPublicInforByUserId,
  getUserPublicInforByListIds,
  extractListIdFromListUser,
  getSomeUserIdInRangeOf10,
  randomGetUserIdInlistId,
};
