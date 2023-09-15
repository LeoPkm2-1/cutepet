const { sqlQuery, nonSQLQuery } = require('./index');
const { Response } = require('./../utils/index');

const getUserByUsername = async (userName) => {
	const sqlStmt =
		'select * from NguoiDung where tai_khoan = ? COLLATE utf8mb4_bin';
	const params = [userName];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
const getUserIdByUsername = async (userName)=>{
	const sqlStmt =
		'select ma_nguoi_dung from NguoiDung where tai_khoan = ? COLLATE utf8mb4_bin';
	const params = [userName];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			if(data.length>0)return data[0]
			return {ma_nguoi_dung:undefined};

		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
}

// (async function () {
// 	const data = await getUserIdByUsername('dng');
// 	console.log(data);
// })()

const getUserByEmail = async (email_address) => {
	const sqlStmt = `select * from NguoiDung where email = ? COLLATE utf8mb4_unicode_ci`;
	return await sqlQuery(sqlStmt, [email_address])
		.then((data) => new Response(200, data, ''))
		.catch(
			(err) => new Response(400, [], err.sqlMessage, err.errno, err.code)
		);
};

const getUserNonActiveByUsername = async (userName) => {
	async function executor(collection, name) {
		return await collection.find({ tai_khoan: name }).toArray();
	}
	return await nonSQLQuery(
		executor,
		'NguoiDungChuaChinhThuc',
		userName
	).catch((err) => {
		console.log(err);
		throw err;
	});
};

const getUserNonActiveByEmail = async (userEmail) => {
	async function executor(collection) {
		return await collection.find({ email: userEmail }).toArray();
	}
	return await nonSQLQuery(executor, 'NguoiDungChuaChinhThuc');
};

const getUserNonActiveByActiveCode = async (active_code) => {
	async function executor(collection) {
		return await collection.find({ active_code: active_code }).toArray();
	}
	return await nonSQLQuery(executor, 'NguoiDungChuaChinhThuc');
};

const getUserById = async (userId) => {
	const sqlStmt = 'select * from NguoiDung where ma_nguoi_dung =? ';
	const params = [userId];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
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
		});
};

const addNonActiveUser = async (nonActiveUser) => {
	async function executor(collection, param) {
		return await collection.insertOne(param);
	}
	return await nonSQLQuery(executor, 'NguoiDungChuaChinhThuc', nonActiveUser)
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const deleteAllExpireNonActiveUser = async () => {
	async function executor(collection) {
		return await collection.deleteMany({
			thoi_han: {
				$lt: new Date(),
			},
		});
	}
	return await nonSQLQuery(executor, 'NguoiDungChuaChinhThuc');
};

const deleteNonActiveUserByActiveCode = async (active_code) => {
	async function executor(collection) {
		return await collection.deleteMany({
			active_code: active_code,
		});
	}
	return await nonSQLQuery(executor, 'NguoiDungChuaChinhThuc');
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

const isFriend = async (person_id_1, person_id_2) => {
	const sqlStmt =
		'select Count(*) as number from LaBanBe where (ma_nguoi_dung_1,ma_nguoi_dung_2) = (?,?)';
	return await sqlQuery(sqlStmt, [person_id_1, person_id_2])
		.then((data) => {
			if (Number(data[0].number) >= 1) {
				return new Response(200, true, '');
			}
			return new Response(200, false, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

module.exports = {
	getUserByUsername,
	getUserByEmail,
	getUserById,
	getUserIdByUsername,
	addUser,
	deleteUserToken,
	isFriend,
	getUserNonActiveByUsername,
	getUserNonActiveByEmail,
	addNonActiveUser,
	deleteAllExpireNonActiveUser,
	getUserNonActiveByActiveCode,
	deleteNonActiveUserByActiveCode,
};
