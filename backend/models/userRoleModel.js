/**
 * index - description
 *   0   - normal user
 *   1   - shop
 *   2   - admin
 */

const getFullRoleByIndex = (index_role) => {
  index_role = parseInt(index_role);
  switch (index_role) {
    case 0:
      return {
        indexRole: 1,
        roleDescription: "nguoi_dung_binh_thuong",
      };
    case 1:
      return {
        indexRole: 2,
        roleDescription: "cua_hang",
      };
    case 2:
      return {
        indexRole: 3,
        roleDescription: "admin",
      };

    default:
      return {
        indexRole: null,
        roleDescription: null,
      };
  }
};

module.exports = {
  getFullRoleByIndex,
};
