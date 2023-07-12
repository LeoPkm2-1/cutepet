const { sqlQuery } = require("./index");

// const getAllUsers = async () => {
// 	const sqlstmt = "select * from NguoiDung ;";
// 	let conn = null;
// 	try {
// 		conn = await db.getConnection();
// 		return await conn.query(sqlstmt).then((data) => {
// 			// console.log(data);
// 			return data;
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		throw new Error(error);
// 	} finally {
// 		console.log("end connnect ahihi");
// 		if (conn) return conn.end();
// 	}
// };

const getUserByUsername = async (userName) => {
	const sqlStmt = "select * from NguoiDung where tai_khoan =? ";
	const params = [userName];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			return {
				status: 200,
				payload: data,
			};
		})
		.catch((err) => {
			return {
				status: 400,
				errno: err.errno,
				code: err.code,
				message: err.sqlMessage,
			};
		});
};

const getUserById = async (userId) => {
	const sqlStmt = "select * from NguoiDung where ma_nguoi_dung =? ";
	const params = [userId];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			return {
				status: 200,
				payload: data,
			};
		})
		.catch((err) => {
			return {
				status: 400,
				errno: err.errno,
				code: err.code,
				message: err.sqlMessage,
			};
		});
};

const addUser = async (user) => {
	const keys = Object.keys(user);
	const fields = keys.join();
	const sqlstmt = `insert into NguoiDung (` + fields + `) values (?)`;
	const values = keys.map((key) => user[key]);
	return await sqlQuery(sqlstmt, [values])
		.then((data) => {
			return {
				status: 200,
				message: data,
				payload: [],
			};
		})
		.catch((err) => {
			return {
				status: 400,
				errno: err.errno,
				code: err.code,
				message: err.sqlMessage,
			};
		});
};

module.exports = {
	getUserByUsername,
	getUserById,
	addUser,
};
