const db = require("./index")
const getAll = async () => {
  let sql = `SELECT * FROM anh`;
  return await db.query(sql).then((data) => {
    console.log("thanhf coong", data);
    return data;
  });
};

module.exports = {
    getAll
};
