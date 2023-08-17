// const { sqlQuery } = require('./index');
const { Response } = require('./../utils/index');
const { sqlQuery } = require('../utils');
const AnhModel = require('./anhModel');

const AddAnhThuCungByMaAnh = async (ma_anh, ma_thu_cung) => {
	const sqlStmt =
		'insert into AnhDaiDien_ThuCung(ma_anh,ma_thu_cung,is_active) values(?,?,?)';
	return await sqlQuery(sqlStmt, [ma_anh, ma_thu_cung, true])
		.then((data) => {
			// console.log('ahihi');
			return new Response(
				200,
				data,
				`ảnh mã: ${ma_anh} đã thêm cho thú cưng mã: ${ma_thu_cung}`
			);
		})
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
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
		'update AnhDaiDien_ThuCung set is_active = 0 where ma_thu_cung = ?';
	return await sqlQuery(sqlStmt, [ma_thu_cung])
		.then((data) => {
			return new Response(200, data, ``);
		})
		.then(async () => {
			return await AddAnhThuCungByURL(url_anh, ma_thu_cung);
		})
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

const getAnhDaiDienHienTai = async (ma_thu_cung) => {
	const sqlStmt =
		'select * from AnhDaiDien_ThuCung where ma_thu_cung = ? AND is_active = true';
	return await sqlQuery(sqlStmt, [ma_thu_cung])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

const getDSAnhDaiDienThuCung = async (ma_thu_cung, isOrder = -1) => {
	let sqlStmt =
		'select * from AnhDaiDien_ThuCung where ma_thu_cung = ? ORDER BY is_active DESC,ma_anh DESC';
	if (isOrder == 0) {
		sqlStmt = 'select * from AnhDaiDien_ThuCung where ma_thu_cung = ? ';
	} else if (isOrder > 0) {
		sqlStmt =
			'select * from AnhDaiDien_ThuCung where ma_thu_cung = ? ORDER BY is_active ASC,ma_anh ASC';
	}
	return await sqlQuery(sqlStmt, [ma_thu_cung])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

// (async function () {
// 	const data = await capNhatAnhDaiDienThuCung('test ne hihi.com.vn', 8);
// 	console.log(data);
// })();

module.exports = {
	AddAnhThuCungByURL,
	AddAnhThuCungByMaAnh,
	getAnhDaiDienHienTai,
	getDSAnhDaiDienThuCung,
	capNhatAnhDaiDienThuCung,
};
