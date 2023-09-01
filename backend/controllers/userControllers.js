const userModel = require('../models/userModel');
const anhNguoiDungModel = require('../models/anhNguoiDungModel');
const userHelper = require('./../utils/userHelper');
const { Response } = require('./../utils/index');

const getUserByUserName = async (req, res) => {
	const username = req.params.username;
	const user = await userModel
		.getUserByUsername(username)
		.then((data) => data.payload[0]);
	res.status(200).json(new Response(200, user, ''));
};

async function getUserPublicInforByUserName(username) {
	const userInfor = await userModel
		.getUserByUsername(username)
		.then((data) => data.payload[0]);
	// remove sensitive infor
	delete userInfor.mat_khau;
	delete userInfor.token;
	delete userInfor.is_admin;
	const anh = await anhNguoiDungModel
		.getAnhDaiDienHienTai(userInfor.ma_nguoi_dung)
		.then((data) =>
			data.payload.length > 0
				? data.payload[0]
				: {
						ma_anh: null,
						url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
						ngay_cap_nhat: null,
						ma_nguoi_dung: `${userInfor.ma_nguoi_dung}`,
						is_active: null,
				  }
		);
	const userPubInfor = { ...userInfor, anh };
	return userPubInfor;
}

const userPublicInforByUserName = async (req, res) => {
	const username = req.params.username;
	const userPubInfor = await getUserPublicInforByUserName(username);
	res.status(200).json(new Response(200, userPubInfor, ''));
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
	requestAddFriend,
	userPublicInforByUserName,
	getUserPublicInforByUserName,
};
