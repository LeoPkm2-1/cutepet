const userModel = require("../models/userModel");
const userOnlineModel = require("../models/UserOnline/userOnlineModel");
const { checkPassword, readENV, Response } = require("./../utils");
const userHelper = require("./../utils/userHelper");
const laBanBeModel = require("./../models/laBanBeModel");
const socketHelper = require("./../utils/socketHelper");

const {
  genJWT,
  deleteProperties,
  checkUsernameAndPass,
  // storeToken,
} = require("./../utils/loginHelper");

const handlLogin = async (req, res) => {
  const INFOR_NOT_MATCH_MES = "thông tin đăng nhập không đúng";
  const { tai_khoan: userIndentifier } = req.body;
  const { mat_khau: drawPass } = req.body;
  // console.log("userIndentifier", userIndentifier);
  try {
    const { match, userInfor } = await checkUsernameAndPass(
      userIndentifier,
      drawPass
    );

    if (!match) {
      throw new Error(INFOR_NOT_MATCH_MES);
    }
    let user = deleteProperties(userInfor, "mat_khau", "is_admin", "token");
    const lastTimeJWT = parseInt(readENV("JWT_LAST_TIME"));
    const token = genJWT(user, lastTimeJWT);
    // don't need to store jwt tokkent to db
    // const storeStatus = await storeToken(token, user.ma_nguoi_dung);
    // if (storeStatus.status === 200) {
    const userPublicInfor = await userHelper.getUserPublicInforByUserId(
      user.ma_nguoi_dung
    );
    res
      .status(200)
      .send(
        new Response(
          200,
          [{ ...userPublicInfor, token }],
          "Đăng nhập thành công"
        )
      );
    // } else {
    //   res
    //     .status(400)
    //     .json(
    //       new Response(
    //         400,
    //         [],
    //         storeStatus.message,
    //         storeStatus.errno,
    //         storeStatus.errcode
    //       )
    //     );
    // }
  } catch (error) {
    switch (error.message) {
      case INFOR_NOT_MATCH_MES:
        res
          .status(400)
          .json(new Response(400, [], INFOR_NOT_MATCH_MES, 300, 300));
        return;

      default:
        console.log(error);
        throw error;
    }
  }
};

// const checkUsernameAndPass = async (username_email, drawPassword) => {
//   let response = isEmailForm(username_email)
//     ? await userModel.getUserByEmail(username_email)
//     : await userModel.getUserByUsername(username_email);
//   if (response.status != 200) throw new Error(response.message);

//   const userExisted = true ? response.payload.length > 0 : false;

//   if (userExisted) {
//     const hashedPass = response.payload[0].mat_khau;
//     const match = await checkPassword(drawPassword, hashedPass);
//     const data = match
//       ? { match, userInfor: response.payload[0] }
//       : { match, userInfor: {} };
//     return data;
//   }
//   return { match: false, userInfor: {} };
// };

// const isEmailForm = (username) => {
//   return username.includes("@");
// };

const markUserOnline = async (user_id, socketToSend) => {
  // update the number of devices that user online
  await userOnlineModel.setOnlineStatusForUser(user_id, true);
  const onlineStatus = await userOnlineModel
    .getOnlineStatusOfUser(user_id)
    .then((data) => data.payload);
  // user have online on other device before so don't send notification
  if (onlineStatus.isOnline && onlineStatus.numOfDevices > 1) return;
  // get friend list of user who are online at current
  const friendListIds = await laBanBeModel
    .getAllFriendIdsOfUser(user_id)
    .then((data) => data.payload.map((friend) => friend.friend_id));
  const friendOnlineIdList = await userOnlineModel
    .getOnlineUsersByListIds(friendListIds)
    .then((data) => data.payload.map((userOnline) => userOnline.userId));

  // just send to notify online if and only if user have friend online
  if (friendOnlineIdList.length > 0) {
    // send notification to friends who are online at current
    const socketNameOfFriends = friendOnlineIdList.map((id) =>
      socketHelper.getPrivateRoomNameOfUser(id)
    );
    const socketOfFriends = socketNameOfFriends.reduce(
      (acc, room_name) => acc.to(room_name),
      socketToSend
    );
    socketOfFriends.emit("USER_IS_ONLINE", { user_id: user_id });
  }
};

module.exports = { handlLogin, markUserOnline };
