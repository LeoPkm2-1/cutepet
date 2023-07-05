const mariadb = require("mariadb");
const db = mariadb.createPool({
  host: "localhost",
  user: "admin",
  password: "123456",
  connectionLimit: 10,
  database:"cutepet_sql"
});
db.getConnection()
  .then((conn) => {
    console.log("Ket noi db thanh cong");
  })
  .catch((err) => {
    console.log("Ket noi db that bai");
  });

module.exports = db; 