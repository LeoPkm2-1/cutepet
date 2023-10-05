const userModel = require('../models/userModel');
const { Response } = require('./../utils');

const AddByUserIdMid = async (req, res, next) => {
	const ma_nguoi_dung  = req.body.requestID;
	const { tai_khoan } = await userModel.getUsernameByUserId(ma_nguoi_dung);
	if (typeof tai_khoan == 'undefined') {
		res
			.status(400)
			.json(new Response(400, [], 'thông tin người dùng không chính xác', 300, 300));
		return;
	}
	req.body.requestUserName = tai_khoan;
	next();
};
const AddByUserNameMid = async (req, res, next) => {
	const tai_khoan = req.body.requestUserName;
	const { ma_nguoi_dung } = await userModel.getUserIdByUsername(tai_khoan);
	if (typeof ma_nguoi_dung == 'undefined') {
		res
			.status(400)
			.json(new Response(400, [], 'thông tin người dùng không chính xác', 300, 300));
		return;
	}
	req.body.requestID = ma_nguoi_dung;
	next();
};

module.exports = {
	AddByUserNameMid,
	AddByUserIdMid,
};
