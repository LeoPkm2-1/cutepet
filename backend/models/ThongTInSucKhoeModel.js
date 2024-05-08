const { Response } = require("../utils");
const { sqlQuery } = require("./index");

const addHealthIndex = async ({
  pet_id = null,
  weight = null,
  height = null,
} = {}) => {
  const sqlStmt = `INSERT INTO ThongTinSucKhoe (ma_thu_cung,can_nang,chieu_cao) VALUES(?,?,?)`;
  return await sqlQuery(sqlStmt, [pet_id, weight, height])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getListHealthIndexByPetid = async (pet_id, isOrder = -1) => {
  let sqlStmt = `select * from ThongTinSucKhoe where ma_thu_cung = ? ORDER BY thoi_gian DESC, ma_suc_khoe DESC`;
  if (isOrder == 0)
    sqlStmt = `select * from ThongTinSucKhoe where ma_thu_cung = ?`;
  else if (isOrder > 0)
    sqlStmt = `select * from ThongTinSucKhoe where ma_thu_cung = ? ORDER BY thoi_gian ASC, ma_suc_khoe ASC`;
  return await sqlQuery(sqlStmt, [pet_id])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getHealthIndexAtNowByPetid = async (pet_id) => {
  const sqlStmt = `select * from ThongTinSucKhoe where ma_thu_cung = ? ORDER BY thoi_gian DESC, ma_suc_khoe DESC LIMIT 1`;
  return await sqlQuery(sqlStmt, [pet_id])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const deleteHealthIndexByMaSucKhoe = async (ma_suc_khoe) => {
  const sqlStmt = `delete from ThongTinSucKhoe where ma_suc_khoe = ?`;
  return await sqlQuery(sqlStmt, [ma_suc_khoe])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, "", err.sqlMessage, err.errno, err.code));
};
const deleteHealthIndexOfPetByTime = async (petid, time) => {
  const sqlStmt = `delete from ThongTinSucKhoe where ma_thu_cung=? AND thoi_gian = ?`;
  return await sqlQuery(sqlStmt, [petid, time])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, "", err.sqlMessage, err.errno, err.code));
};

const deleteAllHealthIndexByPetId = async (petid) => {
  const sqlStmt = `delete from ThongTinSucKhoe where ma_thu_cung=?`;
  return await sqlQuery(sqlStmt, [petid])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

// (async function () {
// 	const data = await	deleteAllHealthIndexByPetId(36);
// 	console.log(data);
// })()

// (async function () {
// 	const data = await addHealthIndex({pet_id: 2, weight: 2, height: 1});
// 	console.log(data);
// })()

module.exports = {
  addHealthIndex,
  getListHealthIndexByPetid,
  deleteHealthIndexByMaSucKhoe,
  deleteHealthIndexOfPetByTime,
  getHealthIndexAtNowByPetid,
  deleteAllHealthIndexByPetId,
};
