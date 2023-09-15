const { Response } = require('./../utils/index');
const { sqlQuery } = require('../utils');
const AnhModel = require('./anhModel');

const AddAnhNguoiDungByMaAnh = async (ma_anh, ma_nguoi_dung) => {
	const sqlStmt =
		'insert into AnhDaiDien_NguoiDung(ma_anh,ma_nguoi_dung, is_active) values (?,?,?)';
	return await sqlQuery(sqlStmt, [ma_anh, ma_nguoi_dung, true])
		.then((data) => {
			console.log({ data });
			return new Response(200, data, '');
		})
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

const AddAnhNguoiDungByURL = async (url_anh, ma_nguoi_dung) => {
	let insertImageInfor = await AnhModel.AddImage(url_anh);
	const ma_anh = (insertImageInfor.payload.insertId = Number(
		insertImageInfor.payload.insertId
	));
	return await AddAnhNguoiDungByMaAnh(ma_anh, ma_nguoi_dung);
};

const CapNhatAnhDaiDienNguoiDung = async (url_anh, ma_nguoi_dung) => {
	const sqlStmt = `update AnhDaiDien_NguoiDung set is_active = 0 where ma_nguoi_dung = ?`;
	return await sqlQuery(sqlStmt, [ma_nguoi_dung])
		.then((data) => new Response(200, data, ''))
		.then(async (data) => {
			return await AddAnhNguoiDungByURL(url_anh, ma_nguoi_dung);
		})
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

const getAnhDaiDienHienTai = async (ma_nguoi_dung, containURL = true) => {
	const sqlStmt = containURL
		? `select A.ma_anh,A.url,A.ngay_cap_nhat,AN.ma_nguoi_dung,AN.is_active
        		from AnhDaiDien_NguoiDung as AN, Anh as A 
        		where is_active= true and ma_nguoi_dung =? and AN.ma_anh=A.ma_anh;`
		: 'select * from AnhDaiDien_NguoiDung where ma_nguoi_dung = ? AND is_active = true';
	return await sqlQuery(sqlStmt, [ma_nguoi_dung])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

const getDSAnhDaiDienThuCung = async (ma_nguoi_dung, isOrder = -1) => {
	let sqlStmt = `select ATC.*,A.url,A.ngay_cap_nhat from AnhDaiDien_NguoiDung as ATC , Anh as A  where ma_nguoi_dung = ? AND ATC.ma_anh = A.ma_anh	ORDER BY is_active DESC,ATC.ma_anh DESC`;
	if (isOrder == 0) {
		sqlStmt = `select ATC.*,A.url,A.ngay_cap_nhat from AnhDaiDien_NguoiDung as ATC , Anh as A  where ma_nguoi_dung = ? AND ATC.ma_anh = A.ma_anh`;
	} else if (isOrder > 0) {
		sqlStmt = `select ATC.*,A.url,A.ngay_cap_nhat from AnhDaiDien_NguoiDung as ATC , Anh as A  where ma_nguoi_dung = ? AND ATC.ma_anh = A.ma_anh	ORDER BY is_active ASC,ATC.ma_anh ASC`;
	}
	return await sqlQuery(sqlStmt, [ma_nguoi_dung])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};



module.exports = {
	AddAnhNguoiDungByMaAnh,
	AddAnhNguoiDungByURL,
	CapNhatAnhDaiDienNguoiDung,
	getAnhDaiDienHienTai,
	getDSAnhDaiDienThuCung,
};
