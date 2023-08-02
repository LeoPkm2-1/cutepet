const { sqlQuery } = require('./index');
const { Response } = require('./../utils/index');

const getLoai = async () => {
	const sqlStmt = 'select * from Loai';
	return await sqlQuery(sqlStmt, [])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
const getGiong = async () => {
	const sqlStmt = 'select * from Giong';
	return await sqlQuery(sqlStmt, [])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
const getGiongByMaLoai = async (maLoai) => {
	const sqlStmt = 'select * from Giong where ma_loai = ?';
	return await sqlQuery(sqlStmt, [maLoai])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

const getMaLoaiByMaGiong = async (maGiong) => {
	const sqlStmt = `select ma_loai from Giong where ma_giong = ?`;
	return await sqlQuery(sqlStmt, [maGiong])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
module.exports = {
	getLoai,
	getGiong,
	getGiongByMaLoai,
	getMaLoaiByMaGiong,
};
