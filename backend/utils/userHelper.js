const userModel = require('./../models/userModel');
const loiMoiKetBanModel = require('../models/loiMoiKetBanModel');
const anhNguoiDungModel = require('../models/anhNguoiDungModel')

// return true if person 1 is friend of person 2
async function isFriend(person_id_1, person_id_2) {
	const data = await userModel.isFriend(person_id_1, person_id_2);
	if (data.status == 200) {
		return data.payload;
	}
	throw new Error(data.message);
}

async function isSendRequestAddFriend(sender_id, recipient_id) {
	const data = await loiMoiKetBanModel.isSendRequestAddFriend(
		sender_id,
		recipient_id
	);
	if (data.status == 200) {
		return data.payload;
	}
	throw new Error(data.message);
}

// return true if sender have send request add friend to recipient 
async function conditionToSendAddFriendRequest(sender_id, recipient_id) {
	try {
		const fiend = await isFriend(sender_id, recipient_id);
		if(fiend) return false;
		const haveSent_1 = await isSendRequestAddFriend(
			sender_id,
			recipient_id
		);
		if(haveSent_1) return false;
		const haveSent_2 = await isSendRequestAddFriend(
			recipient_id,
			sender_id
		);
		if (haveSent_2) return false;
		return true;
	} catch (error) {
		throw new Error(data.message);
	}
}
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

module.exports = {
	isFriend,
	isSendRequestAddFriend,
	conditionToSendAddFriendRequest,
	getUserPublicInforByUserName,
};
