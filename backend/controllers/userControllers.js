const userModel = require('../models/userModel');
const userHelper = require('./../utils/userHelper');
const { validate_email } = require('./../utils/validate_email');
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
	const USER_EXIST_MESS = 'người dùng đã tồn tại';
	const INVALID_EMAIL_MESS = 'email không hợp lệ';
	const EMAIL_EXISTED_MESS = 'email đã tồn tại';
	try {
		const userInfor = req.body;
		const username = userInfor.tai_khoan;
		const email = userInfor.email;
		// kiểm tra sự tồn tại của tài khoản
		let user = await userModel.getUserByUsername(username);
		let existed = true ? user.payload.length > 0 : false;
		if (existed) {
			// tài khoản đã tồn tại
			throw new Error(USER_EXIST_MESS);
		}
		// kiểm tra sự tồn tại của email
		user = await userModel.getUserByEmail(email);
		existed = true ? user.payload.length > 0 : false;
		if (existed) {
			// email đã tồn tại
			throw new Error(EMAIL_EXISTED_MESS);
		}
		// kiểm tra email valid
		const mailvalidate = await validate_email(email);
		if (!mailvalidate.valid) {
			// email ko hợp lệ
			throw new Error(INVALID_EMAIL_MESS);
		}
		// tài khoản dc chấp nhận
		const hashedPass = await getHash(userInfor['mat_khau']);
		const userInforHashed = {
			...userInfor,
			mat_khau: hashedPass,
			email: email,
		};
		let result = await userModel.addUser(userInforHashed);
		if (result.status != 200) {
			res.status(500).json(
				new Response(500, [], result.message, 300, 300)
			);
			return;
		}
		res.status(result.status).json(
			new Response(200, [], 'thêm người dùng thành công')
		);
	} catch (error) {
		switch (error.message) {
			case USER_EXIST_MESS:
				res.status(400).json(new Response(400, [], USER_EXIST_MESS));
				return;
			case INVALID_EMAIL_MESS:
				res.status(400).json(new Response(400, [], INVALID_EMAIL_MESS));
				return;
			case EMAIL_EXISTED_MESS:
				res.status(400).json(new Response(400, [], EMAIL_EXISTED_MESS));
				return;
			default:
				break;
		}
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
