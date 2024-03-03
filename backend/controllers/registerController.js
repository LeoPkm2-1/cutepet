const userModel = require("./../models/userModel");
const { validate_email } = require("./../utils/validate_email");
const { getHash } = require("./../utils");
const { Response } = require("./../utils/index");
const UtilsHelper = require("./../utils/UtilsHelper");

const {
  emailSuitableForRegister,
  usernameSuitableForRegister,
  genVertificationString,
  genDueTime,
  sendActiveAccountMailForNormUser,
  sendActiveAccountMailForShop,
  getNonActiveUserByValidActiveCode,
  isEmailSyntaxValid,
} = require("./../utils/registerHelper");
const { getUserPublicInforByUserName } = require("../utils/userHelper");

// handl add new user to database
const handleRegister = async (req, res) => {
  const USER_EXIST_MESS = "người dùng đã tồn tại";
  const INVALID_EMAIL_MESS = "email không hợp lệ";
  const EMAIL_EXISTED_MESS = "email đã tồn tại";
  const INVALID_NAME_MESS = "tên chứa các ký tự không hợp lệ";
  try {
    const userInfor = req.body;
    const username = userInfor.tai_khoan;
    const email = userInfor.email.toLowerCase();

    if (!UtilsHelper.isValidVietnameseName(userInfor.ten)) {
      throw new Error(INVALID_NAME_MESS);
    }

    // kiểm tra sự tồn tại của tài khoản
    await userModel.deleteAllExpireNonActiveUser();
    const userNameSuitable = await usernameSuitableForRegister(username);
    if (!userNameSuitable) {
      // tài khoản đã tồn tại
      throw new Error(USER_EXIST_MESS);
    }
    // kiểm tra sự tồn tại của email
    const emailSuitable = await emailSuitableForRegister(email);
    if (!emailSuitable) {
      // email đã tồn tại
      throw new Error(EMAIL_EXISTED_MESS);
    }
    // // kiểm tra email valid
    // const mailvalidate = await validate_email(email);
    // if (!mailvalidate.valid) {
    // 	// email ko hợp lệ
    // 	console.log({mailvalidate});
    // 	throw new Error(INVALID_EMAIL_MESS);
    // }
    // kiểm tra cú pháp của email
    if (!isEmailSyntaxValid(email)) {
      throw new Error(INVALID_EMAIL_MESS);
    }
    // tài khoản dc chấp nhận
    const hashedPass = await getHash(userInfor["mat_khau"]);

    const active_code = genVertificationString();
    // const thoi_han = genDueTime().toLocaleString(undefined, {
    // 	timeZoneName: 'short',
    // 	hourCycle: 'h23',
    // });
    const thoi_han = genDueTime();
    const nonActiveUserInfor = {
      ...userInfor,
      mat_khau: hashedPass,
      email: email,
      user_type: 0, // người dùng bình thường
      active_code,
      thoi_han,
    };

    await userModel.addNonActiveUser(nonActiveUserInfor);
    const data = await sendActiveAccountMailForNormUser({
      nameOfUser: userInfor.ten,
      emailAddress: email,
      active_code,
    });

    await res
      .status(200)
      .json(
        new Response(
          200,
          active_code,
          "Vui lòng xác thực đăng ký bằng email đã cung cấp trước đó để hoàn tất"
        )
      );
    return;
  } catch (error) {
    switch (error.message) {
      case USER_EXIST_MESS:
        res.status(400).json(new Response(400, [], USER_EXIST_MESS));
        return;
      case INVALID_EMAIL_MESS:
        res.status(400).json(new Response(400, [], INVALID_EMAIL_MESS));
        return;
      case EMAIL_EXISTED_MESS:
        res.status(400).json(new Response(400, [], EMAIL_EXISTED_MESS));
        return;
      case INVALID_NAME_MESS:
        res
          .status(400)
          .json(new Response(400, [], INVALID_NAME_MESS, 300, 300));
        return;
      default:
        throw error;
    }
  }
};

const handleConfirmRegister = async (req, res) => {
  const ACTIVE_CODE_NOT_VALID = "mã xác thực không đúng";
  const CONFIRM_SUCSECC_MESSAGE = "hoàn tất xác thực đăng ký";
  const active_code = req.body.active_code;
  // console.log({active_code});
  const user = await getNonActiveUserByValidActiveCode(active_code);
  // console.log( {user});
  if (Object.keys(user).length === 0) {
    res
      .status(400)
      .json(new Response(400, {}, ACTIVE_CODE_NOT_VALID, 300, 300));
    return;
  }
  const userAddedID = await userModel
    .addUser({
      ten: user.ten,
      tai_khoan: user.tai_khoan,
      mat_khau: user.mat_khau,
      email: user.email,
    })
    .then((data) => Number(data.message.insertId));
  await userModel.deleteNonActiveUserByActiveCode(active_code);
  const userAdded = await getUserPublicInforByUserName(user.tai_khoan);
  res.status(200).json(new Response(200, userAdded, CONFIRM_SUCSECC_MESSAGE));
};

const handleShopRegister = async (req, res) => {
  const USER_EXIST_MESS =
    "Tài khoản đã tồn tại, vui lòng sử dụng tài khoản khác để đăng ký";
  const INVALID_EMAIL_MESS = "Email không hợp lệ";
  const EMAIL_EXISTED_MESS = "Email đã tồn tại";
  const INVALID_NAME_MESS = "Tên cửa hàng chứa các ký tự không hợp lệ";
  try {
    let { ten_cua_hang, tai_khoan, mat_khau, email, dia_chi } = req.body;
    if (!UtilsHelper.isValidVietnameseName(ten_cua_hang))
      throw new Error(INVALID_NAME_MESS);

    // kiểm tra sự tồn tại của tài khoản
    await userModel.deleteAllExpireNonActiveUser();
    const userNameSuitable = await usernameSuitableForRegister(tai_khoan);
    if (!userNameSuitable) throw new Error(USER_EXIST_MESS);

    // kiểm tra sự tồn tại của email
    const emailSuitable = await emailSuitableForRegister(email);
    if (!emailSuitable) throw new Error(EMAIL_EXISTED_MESS);
    // kiểm tra cú pháp của email
    if (!isEmailSyntaxValid(email)) throw new Error(INVALID_EMAIL_MESS);

    // tài khoản dc chấp nhận
    const hashedPass = await getHash(mat_khau);

    const active_code = genVertificationString();
    const thoi_han = genDueTime();
    const nonActiveUserInfor = {
      ten: ten_cua_hang,
      tai_khoan: tai_khoan,
      mat_khau: hashedPass,
      email: email,
      user_type: 1, // cửa hàng
      active_code,
      thoi_han,
    };

    // thêm người dùng vào cột người dùng chờ xác thực
    await userModel.addNonActiveUser(nonActiveUserInfor);

    // gửi email xác thực đắng ký tài khoảng đến shop
    await sendActiveAccountMailForShop({
      nameOfShop: ten_cua_hang,
      emailAddress: email,
      active_code,
    });

    await res
      .status(200)
      .json(
        new Response(
          200,
          active_code,
          "Vui lòng xác thực đăng ký bằng email đã cung cấp trước đó để hoàn tất việc đăng ký tài khoản cho cửa hàng"
        )
      );
    return;
  } catch (error) {
    switch (error.message) {
      case INVALID_NAME_MESS:
        res
          .status(400)
          .json(new Response(400, [], INVALID_NAME_MESS, 300, 300));
        return;
      case USER_EXIST_MESS:
        res.status(400).json(new Response(400, [], USER_EXIST_MESS, 300, 300));
        return;
      case EMAIL_EXISTED_MESS:
        res
          .status(400)
          .json(new Response(400, [], EMAIL_EXISTED_MESS, 300, 300));
        return;
      case INVALID_EMAIL_MESS:
        res
          .status(400)
          .json(new Response(400, [], INVALID_EMAIL_MESS, 300, 300));
        return;
    }
  }
};

module.exports = { handleRegister, handleConfirmRegister, handleShopRegister };
