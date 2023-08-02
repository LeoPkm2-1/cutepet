const { sqlQuery } = require("./index");
const { Response } = require("./../utils/index");

const getPetByID = async (petID) => {
	const sqlStmt = "select * from ThuCung where ma_thu_cung = ?";
	return await sqlQuery(sqlStmt, petID)
		.then((data) => {
			return new Response(200, data, "");
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
const getPetByNamAndUserID = async (petname, userId) => {
	const sqlStmt =
		"select * from ThuCung where ma_nguoi_chu=? and ten_thu_cung=?";
	return await sqlQuery(sqlStmt, [userId, petname]).then((data) => {
		return new Response(200, data, "");
	});
};

module.exports = {
	getPetByID,
};
