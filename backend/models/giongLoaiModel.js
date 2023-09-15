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

const getThongTinLoaiByMaLoai = async (maLoai) => {
	const sqlStmt = 'select * from Loai where ma_loai = ?';
	return await sqlQuery(sqlStmt, [maLoai])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
const getThongTinGiongByMaGiong = async (maGiong) => {
	const sqlStmt = `select * from Giong where ma_giong =?`;
	return await sqlQuery(sqlStmt, [maGiong])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

const getThongTinGiongLoaiByMaGiong = async (maGiong) => {
	const sqlStmt = `select G.*,L.ten_loai from Giong as G , Loai as L where G.ma_loai = L.ma_loai AND ma_giong =?`;
	return await sqlQuery(sqlStmt, [maGiong])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};


async function isMaGiongExist(ma_giong) {
	ma_giong = parseInt(ma_giong);
	return await getGiong().then((data) => {
		if (data.status === 400) {
			throw new Error(data.message);
		}
		return data.payload
			.map((giong) => parseInt(giong.ma_giong))
			.includes(ma_giong);
	});
}

module.exports = {
	getLoai,
	getGiong,
	getGiongByMaLoai,
	getMaLoaiByMaGiong,
	isMaGiongExist,
	getThongTinLoaiByMaLoai,
	getThongTinGiongByMaGiong,
	getThongTinGiongLoaiByMaGiong,
};
