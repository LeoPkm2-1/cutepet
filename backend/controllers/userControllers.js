const userModel = require('../models/userModel');
const userHelper = require('./../utils/userHelper');
const { Response } = require('./../utils/index');

const { getHash } = require('./../utils');

const getUserByUserName = async (req, res) => {
	const username = req.params.username;
	const user = await userModel
		.getUserByUsername(username)
		.then((data) => data.payload[0]);
	res.status(200).json(new Response(200, user, ''));
};

// handl add new user to database
const addUser = async (req, res) => {
	const userInfor = req.body;
	const username = userInfor.tai_khoan;
	const user = await userModel.getUserByUsername(username);
	const userExisted = true ? user.payload.length > 0 : false;
	if (!userExisted) {
		// tài khoản dc chấp nhận
		const hashedPass = await getHash(userInfor['mat_khau']);
		const userInforHashed = { ...userInfor, mat_khau: hashedPass };
		let result = await userModel.addUser(userInforHashed);
		if (result.status === 200) {
			res.status(result.status).json(
				new Response(result.status, [], 'thêm người dùng thành công')
			);
		} else {
			res.status(500).json(
				new Response(
					500,
					result.payload,
					result.message,
					result.errno,
					result.errcode
				)
			);
		}
	} else {
		// tài khoản đã tồn tại
		res.status(400).json(new Response(400, [], 'người dùng đã tồn tại'));
	}
};

const requestAddFriend = async (req, res) => {
	const NOT_SELF_REQUIRE_ADD_FRIEND_MESS =
		'Người Gửi không thể gửi lời mời kết bạn đến chính mình';
	const NOT_SEND_REQUIRE_ID =
		'Bắt buộc phải nhập ID người muốn gửi lời mời kết bạn';
	const BAN_TO_SEND_REQUEST = 'không đủ điều kiện để gửi lời mời kết bạn';
	try {
		const idNguoiNhan = parseInt(req.body.requestID);
		const idNguoiGui = parseInt(req.auth_decoded.ma_nguoi_dung);
		// Ngươi dùng phải nhập id friend muốn kết bạn
		if (Number.isNaN(idNguoiNhan)) {
			throw new Error(NOT_SEND_REQUIRE_ID);
		}
		const condition = await userHelper.conditionToSendAddFriendRequest(
			idNguoiGui,
			idNguoiNhan
		);
		// console.log('eheheh:', condition);
		if (!condition) {
			throw new Error(BAN_TO_SEND_REQUEST);
		}
		// người gửi và người nhận không dc trùng nhau
		if (idNguoiGui === idNguoiNhan) {
			throw new Error(NOT_SELF_REQUIRE_ADD_FRIEND_MESS);
		}
		const data = await userModel.sendRequestAddFriend(
			idNguoiGui,
			idNguoiNhan
		);
		if (data.status == 200) {
			res.status(200).json(
				new Response(200, [], 'Gửi lời mời thành công')
			);
		} else {
			console.log(data.message);
			res.status(400).json(
				new Response(400, [], data.message, data.errno, data.errcode)
			);
		}
	} catch (error) {
		switch (error.message) {
			case NOT_SEND_REQUIRE_ID:
				res.status(400).json(
					new Response(400, [], NOT_SEND_REQUIRE_ID, 300, 300)
				);
				return;
			case NOT_SELF_REQUIRE_ADD_FRIEND_MESS:
				res.status(400).json(
					new Response(
						400,
						[],
						NOT_SELF_REQUIRE_ADD_FRIEND_MESS,
						300,
						300
					)
				);
				return;
			case BAN_TO_SEND_REQUEST:
				res.status(400).json(
					new Response(400, [], BAN_TO_SEND_REQUEST, 300, 300)
				);
			default:
				break;
		}
	}
};

module.exports = {
	getUserByUserName,
	addUser,
	requestAddFriend,
};
