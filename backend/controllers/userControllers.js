const userModel = require("../models/userModel");
const { Response } = require("./../utils/index");

const { getHash } = require("./../utils");

const getUserByUserName = async (req, res) => {
	const username = req.params.username;
	const user = await userModel
		.getUserByUsername(username)
		.then((data) => data.payload[0]);
	res.status(200).json(new Response(200, user, ""));
};

// handl add new user to database
const addUser = async (req, res) => {
	const userInfor = req.body;
	const username = userInfor.tai_khoan;
	const user = await userModel.getUserByUsername(username);
	const userExisted = true ? user.payload.length > 0 : false;
	if (!userExisted) {
		// tài khoản dc chấp nhận
		const hashedPass = await getHash(userInfor["mat_khau"]);
		const userInforHashed = { ...userInfor, mat_khau: hashedPass };
		let result = await userModel.addUser(userInforHashed);
		if (result.status === 200) {
			res.status(result.status).json(
				new Response(result.status, [], "thêm người dùng thành công")
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
		res.status(400).json(new Response(400, [], "người dùng đã tồn tại"));
	}
};

module.exports = {
	getUserByUserName,
	addUser,
};
