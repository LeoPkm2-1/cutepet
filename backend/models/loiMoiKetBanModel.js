const { sqlQuery } = require('./index');
const { Response } = require('./../utils/index');

const sendRequestAddFriend = async (sender_id, recipient_id) => {
	const sqlStmt =
		'insert into LoiMoiKetBan (ma_nguoi_gui,ma_nguoi_nhan) values (?,?); ';
	return await sqlQuery(sqlStmt, [sender_id, recipient_id])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			console.log(err);
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

// return true if have request add friend for sender to receipt else false
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

const deleteRequestAddFriend = async (sender_id, recipient_id) => {
	const sqlStmt = `delete from LoiMoiKetBan where (ma_nguoi_gui,ma_nguoi_nhan) = (?,?) `;
	return await sqlQuery(sqlStmt, [sender_id, recipient_id])
		.then((data) => {
			return parseInt(data.affectedRows) > 0
				? new Response(200, data, 'OK')
				: new Response(200, data, 'NO ROW');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

// (async function () {
// 	const data = await deleteRequestAddFriend(8,10);
// 	console.log([data.affectedRows],data);
// })()

module.exports = {
	sendRequestAddFriend,
	isSendRequestAddFriend,
	deleteRequestAddFriend,
};
