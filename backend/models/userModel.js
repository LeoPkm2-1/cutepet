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
	// console.log(userName, "2");
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

module.exports = {
	// getAllUsers,
	getUserByUsername,
};
