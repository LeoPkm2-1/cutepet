/**
 * index - description
 *   0   - normal user
 *   1   - shop
 *   2   - admin
 */

const { sqlQuery } = require("./index");
const { Response } = require("./../utils/index");

const getFullRoleByIndex = (index_role) => {
  index_role = parseInt(index_role);
  switch (index_role) {
    case 0:
      return {
        indexRole: 0,
        roleDescription: "nguoi_dung_binh_thuong",
      };
    case 1:
      return {
        indexRole: 1,
        roleDescription: "cua_hang",
      };
    case 2:
      return {
        indexRole: 2,
        roleDescription: "admin",
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
    case 0:
      return "nguoi_dung_binh_thuong";

    case 1:
      return "cua_hang";

    case 2:
      return "admin";

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
};
