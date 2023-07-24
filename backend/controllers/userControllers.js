const userModel = require("../models/userModel");

const { getHash } = require("./../utils");

const getUserByUserName = async (req, res) => {
	const username = req.params.username;
	// console.log(username, "1");
	const user = await userModel.getUserByUsername(username).then((data) => data);
	res.json(user);
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
		console.log(hashedPass);
		const userInforHashed = { ...userInfor, mat_khau: hashedPass };
		let result = await userModel.addUser(userInforHashed);
		if (result.status === 200) {
			res.status(result.status).send("Thêm người dùng thành công");
		} else {
			res.status(500).json(result);
		}
	} else {
		// tài khoản đã tồn tại
		res.status(400).send(`username has already existed`);
	}
};

module.exports = {
	getUserByUserName,
	addUser,
};
