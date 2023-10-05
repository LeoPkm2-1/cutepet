const userModel = require('../models/userModel');
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

module.exports = {
	getUserByUserName,
	userPublicInforByUserName,
};
