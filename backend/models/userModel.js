const { sqlQuery } = require("./index");
const { Response } = require("./../utils/index");

const getUserByUsername = async (userName) => {
	const sqlStmt = "select * from NguoiDung where tai_khoan =? ";
	const params = [userName];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			return new Response(200, data, "");
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

const getUserById = async (userId) => {
	const sqlStmt = "select * from NguoiDung where ma_nguoi_dung =? ";
	const params = [userId];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			return new Response(200, data, "");
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
			// {
			// 	status: 400,
			// 	errno: err.errno,
			// 	code: err.code,
			// 	message: err.sqlMessage,
			// };
		});
};

const addUser = async (user) => {
	const keys = Object.keys(user);
	const fields = keys.join();
	const sqlstmt = `insert into NguoiDung (` + fields + `) values (?)`;
	const values = keys.map((key) => user[key]);
	return await sqlQuery(sqlstmt, [values])
		.then((data) => {
			return new Response(200, [], data);
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
			// {
			// 	status: 400,
			// 	errno: err.errno,
			// 	code: err.code,
			// 	message: err.sqlMessage,
			// };
		});
};
const deleteUserToken = async (userid) => {
	const sqlstmt = "UPDATE NguoiDung SET token='' WHERE ma_nguoi_dung=?;";
	return await sqlQuery(sqlstmt, [userid])
		.then((data) => {
			return new Response(200, [], data);
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
module.exports = {
	getUserByUsername,
	getUserById,
	addUser,
	deleteUserToken,
};
