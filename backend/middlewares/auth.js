const { vertifyJWT } = require("./../utils/loginHelper");
const userModel = require("./../models/userModel");
const { Response } = require("./../utils");
const userRoleModel = require("../models/userRoleModel");

const NOT_HAVING_AUTH_INFOR = "not having authentication infor";
const NOT_VERTIFIED = "NOT VERTIFIED";
// const TOKEN_NOT_MATCH = "TOKEN NOT MATCH";
const REDIRECT_TO_LOGIN_MESS = "chuyển hướng tới trang đăng nhập";
const MUST_LOGOUT = "cần đăng xuất ra trước";

const getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
};

const requireLoginedForNormUser = async (req, res, next) => {
  try {
    const jwtToken = getToken(req);
    let [decodeStatus, decoded] = [true, []];
    if (!jwtToken) {
      decodeStatus = false;
      throw new Error(NOT_HAVING_AUTH_INFOR);
    }
    [decodeStatus, decoded] = vertifyJWT(jwtToken);
    // token is not valid
    if (decodeStatus === false) {
      throw new Error(NOT_VERTIFIED);
    } else {
      // const user = await userModel.getUserById(decoded.ma_nguoi_dung);
      //   if (user.payload[0].token !== jwtToken) {
      //     [decodeStatus, decoded] = [false, []];
      //     throw new Error(TOKEN_NOT_MATCH);
      //   }
      req.auth_decoded = {
        ...decoded,
      };
      next();
      return;
    }
  } catch (error) {
    console.log("err:", error);
    if (
      error.message === NOT_HAVING_AUTH_INFOR ||
      error.message === NOT_VERTIFIED
      //   || error.message === TOKEN_NOT_MATCH
    ) {
      res.status(301).json(new Response(301, [], REDIRECT_TO_LOGIN_MESS));
    } else {
      throw error;
    }
  }
};

const requireLoginedForShop = async (req, res, next) => {
  const IS_NOT_SHOP_MSG = "Không phải là cửa hàng không có quyền truy cập";
  try {
    const jwtToken = getToken(req);
    let [decodeStatus, decoded] = [true, []];
    if (!jwtToken) {
      decodeStatus = false;
      throw new Error(NOT_HAVING_AUTH_INFOR);
    }
    [decodeStatus, decoded] = vertifyJWT(jwtToken);
    // token is not valid
    if (decodeStatus === false) {
      throw new Error(NOT_VERTIFIED);
    } else {
      const roleIndex = await userRoleModel.getRoleIndexByUserId(
        decoded.ma_nguoi_dung
      );
      if (userRoleModel.getRoleNameByIndex(roleIndex) != "cua_hang") {
        throw new Error(IS_NOT_SHOP_MSG);
      }
      const vai_tro = userRoleModel.getFullRoleByIndex(roleIndex);
      req.auth_decoded = {
        ma_cua_hang: decoded.ma_nguoi_dung,
        ...decoded,
        vai_tro,
      };
      next();
      return;
    }
  } catch (error) {
    console.log("err:", error);
    if (
      error.message === NOT_HAVING_AUTH_INFOR ||
      error.message === NOT_VERTIFIED
      //   || error.message === TOKEN_NOT_MATCH
    ) {
      res.status(301).json(new Response(301, [], REDIRECT_TO_LOGIN_MESS));
    } else if (error.message === IS_NOT_SHOP_MSG) {
      res.status(400).json(new Response(400, [], IS_NOT_SHOP_MSG, 300, 300));
      return;
    } else {
      throw error;
    }
  }
};

const nonRequireLogined = async (req, res, next) => {
  try {
    const jwtToken = getToken(req);
    // console.log("\n\n\nnon require login:");
    // console.log(jwtToken);
    let [decodeStatus, decoded] = [false, []];
    if (jwtToken) {
      [decodeStatus, decoded] = vertifyJWT(jwtToken);
      if (decodeStatus) {
        // const user = await userModel.getUserById(decoded.ma_nguoi_dung);
        // if (user.payload[0].token === jwtToken) {
        //   throw new Error(MUST_LOGOUT);
        // }
        throw new Error(MUST_LOGOUT);
      }
    }
    next();
    return;
  } catch (error) {
    if (error.message === MUST_LOGOUT) {
      res.status(400).json(new Response(400, [], MUST_LOGOUT));
    }
  }
};

const socketAuthenMid = (socket, next) => {
  try {
    console.log("\n\n\nsocket authen middleware");
    const jwtToken = socket.handshake.headers.authen_token;
    let [decodeStatus, decoded] = [false, []];
    [decodeStatus, decoded] = vertifyJWT(jwtToken);
    // [decodeStatus, decoded] = [true, { ma_nguoi_dung: 1 }];
    if (!decodeStatus) {
      next(new Error(NOT_VERTIFIED));
      return;
    }
    // add user infor to socket
    socket.auth_decoded = { ...decoded, authen_token: jwtToken };
    next();
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  requireLoginedForNormUser,
  nonRequireLogined,
  socketAuthenMid,
  requireLoginedForShop,
};
