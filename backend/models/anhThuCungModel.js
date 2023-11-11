// const { sqlQuery } = require('./index');
const { Response } = require("./../utils/index");
const { sqlQuery } = require("../utils");
const AnhModel = require("./anhModel");

const AddAnhThuCungByMaAnh = async (ma_anh, ma_thu_cung) => {
  const sqlStmt =
    "insert into AnhDaiDien_ThuCung(ma_anh,ma_thu_cung,is_active) values(?,?,?)";
  return await sqlQuery(sqlStmt, [ma_anh, ma_thu_cung, true])
    .then((data) => {
      // console.log('ahihi');
      return new Response(
        200,
        {
          ma_anh: ma_anh,
          ma_thu_cung: ma_thu_cung,
        },
        `ảnh mã: ${ma_anh} đã thêm cho thú cưng mã: ${ma_thu_cung}`
      );
    })
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const AddAnhThuCungByURL = async (url_anh, ma_thu_cung) => {
  let insertImageInfor = await AnhModel.AddImage(url_anh);
  const ma_anh = (insertImageInfor.payload.insertId = Number(
    insertImageInfor.payload.insertId
  ));

  return await AddAnhThuCungByMaAnh(ma_anh, ma_thu_cung);
};

const capNhatAnhDaiDienThuCung = async (url_anh, ma_thu_cung) => {
  const sqlStmt =
    "update AnhDaiDien_ThuCung set is_active = 0 where ma_thu_cung = ?";
  return await sqlQuery(sqlStmt, [ma_thu_cung])
    .then((data) => {
      return new Response(200, data, ``);
    })
    .then(async () => {
      return await AddAnhThuCungByURL(url_anh, ma_thu_cung);
    })
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getAnhDaiDienHienTai = async (ma_thu_cung, containURL = true) => {
  const sqlStmt = containURL
    ? `select A.ma_anh,A.url,A.ngay_cap_nhat,ATC.ma_thu_cung,ATC.is_active
			from AnhDaiDien_ThuCung as ATC, Anh as A 
			where is_active= true and ma_thu_cung =? and ATC.ma_anh=A.ma_anh`
    : `select * from AnhDaiDien_ThuCung where ma_thu_cung = ? AND is_active = true`;
  return await sqlQuery(sqlStmt, [ma_thu_cung])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getDSAnhDaiDienThuCung = async (ma_thu_cung, isOrder = -1) => {
  let sqlStmt = `select ATC.*,A.url,A.ngay_cap_nhat from AnhDaiDien_ThuCung as ATC , Anh as A 	where ma_thu_cung = ? AND ATC.ma_anh = A.ma_anh	ORDER BY is_active DESC,ATC.ma_anh DESC`;
  // 'select * from AnhDaiDien_ThuCung where ma_thu_cung = ? ORDER BY is_active DESC,ma_anh DESC';
  if (isOrder == 0) {
    sqlStmt = `select ATC.*,A.url,A.ngay_cap_nhat from AnhDaiDien_ThuCung as ATC , Anh as A	where ma_thu_cung = ? AND ATC.ma_anh = A.ma_anh`;

    // 'select * from AnhDaiDien_ThuCung where ma_thu_cung = ? ';
  } else if (isOrder > 0) {
    sqlStmt = `select ATC.*,A.url,A.ngay_cap_nhat from AnhDaiDien_ThuCung as ATC , Anh as A  where ma_thu_cung = ? AND ATC.ma_anh = A.ma_anh ORDER BY is_active ASC,ATC.ma_anh ASC`;

    // 'select * from AnhDaiDien_ThuCung where ma_thu_cung = ? ORDER BY is_active ASC,ma_anh ASC';
  }
  return await sqlQuery(sqlStmt, [ma_thu_cung])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const deleteAllAnhDaiDienThuCung = async (ma_thu_cung) => {
  const sqlStmt = `delete from AnhDaiDien_ThuCung where ma_thu_cung = ?`;
  return await sqlQuery(sqlStmt, [ma_thu_cung])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, "", err.sqlMessage, err.errno, err.code));
};

// (async function () {
//   const data = await deleteAllAnhDaiDienThuCung(2);
//   console.log(data);
// })()

// (async function () {
//   const data = await getDSAnhDaiDienThuCung(3);
//   console.log(data);
// })();

// (async function () {
// 	const data = await capNhatAnhDaiDienThuCung('leo test xin chào',2);
// 	console.log(data);
// })()

module.exports = {
  AddAnhThuCungByURL,
  AddAnhThuCungByMaAnh,
  getAnhDaiDienHienTai,
  getDSAnhDaiDienThuCung,
  capNhatAnhDaiDienThuCung,
  deleteAllAnhDaiDienThuCung,
};
