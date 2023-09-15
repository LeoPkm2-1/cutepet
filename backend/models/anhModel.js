const { sqlQuery } = require('./index');
const { Response } = require('./../utils/index');

const getAnh = async (orderByTime = 0) => {
	let sqlStmt = '';
	if (orderByTime == 0) sqlStmt = 'select * from Anh';
	else if (orderByTime > 0)
		sqlStmt = 'select * from Anh ORDER BY ngay_cap_nhat ASC ';
	else sqlStmt = 'select * from Anh ORDER BY ngay_cap_nhat DESC ';
	return await sqlQuery(sqlStmt, [])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};
const getAnhByURL = async (url, orderByTime = 0) => {
	let sqlStmt = '';
	if (orderByTime == 0) sqlStmt = 'select * from Anh where url = ? ';
	else if (orderByTime > 0)
		sqlStmt = 'select * from Anh where url = ? ORDER BY ngay_cap_nhat ASC';
	else
		sqlStmt = 'select * from Anh where url = ? ORDER BY ngay_cap_nhat DESC';
	return await sqlQuery(sqlStmt, [url])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};
const getAnhByMaAnh = async (ma_anh, orderByTime = 0) => {
	let sqlStmt = '';
	if (orderByTime == 0) sqlStmt = 'select * from Anh where ma_anh = ?';
	else if (orderByTime > 0)
		sqlStmt =
			'select * from Anh where ma_anh = ? ORDER BY ngay_cap_nhat ASC';
	else
		sqlStmt =
			'select * from Anh where ma_anh = ? ORDER BY ngay_cap_nhat DESC';
	return await sqlQuery(sqlStmt, [ma_anh])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

const AddImage = async (Url_anh) => {
	const sqlStmt = 'insert into Anh(url) values(?)';
	return await sqlQuery(sqlStmt, [Url_anh])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

module.exports = {
	getAnh,
	getAnhByURL,
	getAnhByMaAnh,
	AddImage,
};

// (async function () {
// 	const data = await getAnhByMaAnh(1, -1);
// 	console.log(data);
// })();

// (async function () {
// 	const data = await AddImage('https://w7.goog.com/.png');
// 	console.log(data);
// })();
