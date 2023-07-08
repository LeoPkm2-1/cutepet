const queryStm = require("./index");
// const db = require("./index")
const getAll = async () => {
  let sql = `SELECT * FROM anh`;
  let stmt = 'select * from anh where url=? ';
  let params = 3999;
  return await queryStm(stmt,params).then((data) => {
    console.log("thanhf coong", data);
    return data;
  }).catch((err) => {
    return err;
  });
};

module.exports = {
    getAll
};
