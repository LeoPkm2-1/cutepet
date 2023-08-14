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

const getUserById = async (userId) => {
	const sqlStmt = 'select * from NguoiDung where ma_nguoi_dung =? ';
	const params = [userId];
	return await sqlQuery(sqlStmt, params)
		.then((data) => {
			return new Response(200, data, '');
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
		return await collection.deleteMany(
			{
				thoi_han: {
					$lt: new Date(),
				},
			}
			// {
			// 	$expr: {
			// 		$function: {
			// 			body: function (thoi_han) {
			// 				return new Date(thoi_han) < new Date();
			// 			},
			// 			args: ['$thoi_han'],
			// 			lang: 'js',
			// 		},
			// 	},
			// }
			// {
			// 	$where: function () {
			// 		return new Date(this.thoi_han) < new Date();
			// 	},
			// }
		);
	}
	return await nonSQLQuery(executor, 'NguoiDungChuaChinhThuc');
};

// (async function () {
// 	const data = await deleteAllExpireNonActiveUser();
// 	console.log(data);
// })();

// (async function () {
// 	const data = await addNonActiveUser({ ten: 'leo', lop1: 10 });
// 	console.log(data);
// })();

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

const sendRequestAddFriend = async (sender_id, recipient_id) => {
	const sqlStmt =
		'insert into LoiMoiKetBan (ma_nguoi_gui,ma_nguoi_nhan) values (?,?); ';
	return await sqlQuery(sqlStmt, [sender_id, recipient_id])
		.then((data) => {
			return new Response(200, data, '');
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

const isSendRequestAddFriend = async (sender_id, recipient_id) => {
	const sqlStmt =
		'select Count(*) as number from LoiMoiKetBan where (ma_nguoi_gui,ma_nguoi_nhan) = (?,?)';
	return await sqlQuery(sqlStmt, [sender_id, recipient_id])
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
	addUser,
	deleteUserToken,
	sendRequestAddFriend,
	isFriend,
	isSendRequestAddFriend,
	getUserNonActiveByUsername,
	getUserNonActiveByEmail,
	addNonActiveUser,
	deleteAllExpireNonActiveUser,
};
