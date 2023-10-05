const userModel = require('../models/userModel');
const loiMoiKetBanModel = require('../models/loiMoiKetBanModel');
const anhNguoiDungModel = require('../models/anhNguoiDungModel');
const laBanBeModel = require('../models/laBanBeModel');
const userHelper = require('./../utils/userHelper');
const { Response } = require('./../utils/index');

// gọi để model để lấy thông tin người dùng trong bảng người dùng
const getUserByUserName = async (req, res) => {
	const username = req.params.username;
	const user = await userModel
		.getUserByUsername(username)
		.then((data) => data.payload[0]);
	res.status(200).json(new Response(200, user, ''));
};

// trả về thông tin người dụng dạng đầy đủ
const userPublicInforByUserName = async (req, res) => {
	const username = req.params.username;
	const userPubInfor = await userHelper.getUserPublicInforByUserName(username);
	res.status(200).json(new Response(200, userPubInfor, ''));
};

// gửi lời mời kết bạn
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
		// người gửi và người nhận không dc trùng nhau
		if (idNguoiGui === idNguoiNhan) {
			throw new Error(NOT_SELF_REQUIRE_ADD_FRIEND_MESS);
		}
		const condition = await userHelper.conditionToSendAddFriendRequest(
			idNguoiGui,
			idNguoiNhan
		);
		if (!condition) {
			throw new Error(BAN_TO_SEND_REQUEST);
		}
		const data = await loiMoiKetBanModel.sendRequestAddFriend(
			idNguoiGui,
			idNguoiNhan
		);
		if (data.status == 200) {
			res.status(200).json(new Response(200, [], 'Gửi lời mời thành công'));
		} else {
			console.log(data.message);
			res
				.status(400)
				.json(new Response(400, [], data.message, data.errno, data.errcode));
		}
	} catch (error) {
		switch (error.message) {
			case NOT_SEND_REQUIRE_ID:
				res
					.status(400)
					.json(new Response(400, [], NOT_SEND_REQUIRE_ID, 300, 300));
				return;
			case NOT_SELF_REQUIRE_ADD_FRIEND_MESS:
				res
					.status(400)
					.json(
						new Response(400, [], NOT_SELF_REQUIRE_ADD_FRIEND_MESS, 300, 300)
					);
				return;
			case BAN_TO_SEND_REQUEST:
				res
					.status(400)
					.json(new Response(400, [], BAN_TO_SEND_REQUEST, 300, 300));
			default:
				break;
		}
	}
};

const responeAddFriend = async (req, res) => {
	const NOT_SEND_SENDER_ID = `phải nhập id của người gửi yêu cầu kết bạn`;
	const RESPONE_INFOR_NOT_TRUE = `thông tin phản hồi lời mời kết bạn không đúng`;
	let NOT_HAVE_REQUEST_ADD_FRIEND = '';
	try {
		const idNguoiGui = parseInt(req.body.senderID);
		const idNguoiPhanHoi = parseInt(req.auth_decoded.ma_nguoi_dung);
		NOT_HAVE_REQUEST_ADD_FRIEND = `không tồn tại lời mời kết bạn từ ${idNguoiGui} đến ${idNguoiPhanHoi}`;
		const REJECT_MESSAGE = `người dùng ${idNguoiPhanHoi} đã từ chối lời mời kết bạn từ ${idNguoiGui}}`;
		const respone_infor = req.body.acceptOrReject
			? req.body.acceptOrReject.toUpperCase()
			: '';
		// Ngươi dùng phải nhập id friend muốn kết bạn
		if (Number.isNaN(idNguoiGui)) {
			throw new Error(NOT_SEND_SENDER_ID);
		}
		const isHaveRequest = await loiMoiKetBanModel
			.havePendingRequestAddFriend(idNguoiGui, idNguoiPhanHoi)
			.then((data) => data.payload);
		if (!isHaveRequest) {
			throw new Error(NOT_HAVE_REQUEST_ADD_FRIEND);
		}
		if (respone_infor == 'REJECT') {
			await loiMoiKetBanModel.updatePendingRequestToReject(
				idNguoiGui,
				idNguoiPhanHoi
			);
			res.status(200).json(new Response(200, [], REJECT_MESSAGE));
			return;
		} else if (respone_infor == 'ACCEPT') {
			await loiMoiKetBanModel.deleteRequestAddFriend(
				idNguoiGui,
				idNguoiPhanHoi
			);
			// accept
			await laBanBeModel.insertFriendShip(idNguoiGui, idNguoiPhanHoi);
			res
				.status(200)
				.json(new Response(200, [], 'thêm qua hệ bạn bè thành công'));
		} else {
			throw new Error(RESPONE_INFOR_NOT_TRUE);
		}
	} catch (error) {
		switch (error.message) {
			case NOT_SEND_SENDER_ID:
				res
					.status(400)
					.json(new Response(400, [], NOT_SEND_SENDER_ID, 300, 300));
				return;

			case NOT_HAVE_REQUEST_ADD_FRIEND:
				res
					.status(400)
					.json(new Response(400, [], NOT_HAVE_REQUEST_ADD_FRIEND, 300, 300));
				return;

			case RESPONE_INFOR_NOT_TRUE:
				res
					.status(400)
					.json(new Response(400, [], RESPONE_INFOR_NOT_TRUE, 300, 300));
				return;
			default:
				console.log(error);
		}
	}
	// res.status(200).send('ok');
};

const unFriendById = async (req, res) => {
	const friend_id = req.body.friend_id;
	const ma_nguoi_dung = req.auth_decoded.ma_nguoi_dung;
	const deleteProcess = await laBanBeModel
		.deleteFriendShip(ma_nguoi_dung, friend_id)
		.then((data) => {
			data.payload.insertId=parseInt(data.payload.insertId);
			return data.payload
		});
	res
		.status(200)
		.json(
			new Response(
				200,
				deleteProcess,
				`hủy bạn bè với ${friend_id} thành công `
			)
		);
};

module.exports = {
	getUserByUserName,
	requestAddFriend,
	userPublicInforByUserName,
	responeAddFriend,
	unFriendById,
};
