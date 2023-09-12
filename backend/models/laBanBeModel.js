const { sqlQuery } = require('./index');
const { Response } = require('./../utils/index');

// thêm quan hệ bạn bè của người dùng 1 và người dùng 2 vào bảng là bạn bè
const insertFriendShip = async (idUser_1, idUser_2) => {
	const sqlStmt = `insert into LaBanBe(ma_nguoi_dung_1,ma_nguoi_dung_2) values (?,?),(?,?)`;
	return await sqlQuery(sqlStmt, [idUser_1, idUser_2, idUser_2, idUser_1])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			console.log(err);
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

module.exports = {
	insertFriendShip,
};
