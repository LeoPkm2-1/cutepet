/**
 * index - description
 *   0   - normal user
 *   1   - shop
 *   2   - admin
 */

const { sqlQuery } = require("./index");
const { Response } = require("./../utils/index");

const NORM_USER_ROLE_STRING = "nguoi_dung_binh_thuong";
const NORM_USER_ROLE_INDEX = 0;

const SHOP_ROLE_STRING = "cua_hang";
const SHOP_ROLE_INDEX = 1;

const ADMIN_ROLE_STRING = "admin";
const ADMIN_ROLE_INDEX = 2;

const getFullRoleByIndex = (index_role) => {
  index_role = parseInt(index_role);
  switch (index_role) {
    case NORM_USER_ROLE_INDEX:
      return {
        indexRole: NORM_USER_ROLE_INDEX,
        roleDescription: NORM_USER_ROLE_STRING,
      };
    case SHOP_ROLE_INDEX:
      return {
        indexRole: SHOP_ROLE_INDEX,
        roleDescription: SHOP_ROLE_STRING,
      };
    case ADMIN_ROLE_INDEX:
      return {
        indexRole: ADMIN_ROLE_INDEX,
        roleDescription: ADMIN_ROLE_STRING,
      };

    default:
      return {
        indexRole: null,
        roleDescription: null,
      };
  }
};

const getRoleNameByIndex = (index_role) => {
  index_role = parseInt(index_role);
  switch (index_role) {
    case NORM_USER_ROLE_INDEX:
      return NORM_USER_ROLE_STRING;

    case SHOP_ROLE_INDEX:
      return SHOP_ROLE_STRING;

    case ADMIN_ROLE_INDEX:
      return ADMIN_ROLE_STRING;

    default:
      return null;
  }
};

const getRoleIndexByUserId = async (user_id) => {
  user_id = parseInt(user_id);
  const sqlStmt = "select user_type from NguoiDung where ma_nguoi_dung = ?";
  return await sqlQuery(sqlStmt, [user_id])
    // .then((data) => new Response(200, data, ""))
    .then((data) => (data.length <= 0 ? null : data[0].user_type))
    .catch((err) => null);
};

// (async () => {
//   const data = await getRoleIndexByUserId(5031);
//   console.log(data);
// })();

module.exports = {
  getFullRoleByIndex,
  getRoleNameByIndex,
  getRoleIndexByUserId,
  NORM_USER_ROLE_STRING,
  SHOP_ROLE_STRING,
  ADMIN_ROLE_STRING,
  NORM_USER_ROLE_INDEX,
  SHOP_ROLE_INDEX,
  ADMIN_ROLE_INDEX,
};
