const { readENV } = require("./read_env.js");
const { sqlQuery } = require("./../models/index.js");
const userModel = require("./../models/userModel.js");
const { checkPassword, getHash } = require("./hash");
const jwt = require("jsonwebtoken");
function deleteProperties(obj, ...properties) {
  properties.map((propertyName) => delete obj[propertyName]);
  return obj;
}
function genJWT(obj, lasttime = 5 * 60) {
  const secretKey = readENV("JWT_KEY");
  const token = jwt.sign(obj, secretKey, {
    expiresIn: lasttime,
    algorithm: "HS512",
  });
  return token;
}

function vertifyJWT(JWT) {
  const secretKey = readENV("JWT_KEY");
  try {
    const decoded = jwt.verify(JWT, secretKey);
    return [true, decoded];
  } catch (error) {
    console.log(error);
    return [false, error.message];
  }
}

async function storeToken(token, userId) {
  const sqlStmt = " UPDATE NguoiDung SET token=? WHERE ma_nguoi_dung=?;";
  return await sqlQuery(sqlStmt, [token, userId])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
}

const isEmailForm = (username) => {
  return username.includes("@");
};

const checkUsernameAndPass = async (username_email, drawPassword) => {
  let response = isEmailForm(username_email)
    ? await userModel.getUserByEmail(username_email)
    : await userModel.getUserByUsername(username_email);
  if (response.status != 200) throw new Error(response.message);

  const userExisted = true ? response.payload.length > 0 : false;

  if (userExisted) {
    const hashedPass = response.payload[0].mat_khau;
    const match = await checkPassword(drawPassword, hashedPass);
    const data = match
      ? { match, userInfor: response.payload[0] }
      : { match, userInfor: {} };
    return data;
  }
  return { match: false, userInfor: {} };
};

module.exports = {
  genJWT,
  deleteProperties,
  vertifyJWT,
  storeToken,
  checkUsernameAndPass,
};
