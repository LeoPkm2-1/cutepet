const mariadb = require("mariadb");
const db = mariadb.createPool({
  host: "localhost",
  user: "admin",
  password: "123456",
  connectionLimit: 10,
  database: "cutepet_sql",
});
// db.getConnection()
//   .then((conn) => {
//     console.log("Ket noi db thanh cong");
//   })
//   .catch((err) => {
//     console.log("Ket noi db that bai");
//   });

async function queryStm(stm, params={}) {
  console.log("tạo kết nối");
  const conDb = await db.getConnection();
  return await conDb
    .query(stm,params)
    .then((data) => data)
    .catch((err) => err)
    .finally(() => {
      console.log("close kết nối");
      conDb.end();
    });
}

module.exports = queryStm;
