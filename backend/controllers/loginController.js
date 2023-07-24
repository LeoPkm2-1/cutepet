const userModel = require("../models/userModel");
const { checkPassword } = require("./../utils");
const { genJWT, deleteProperties } = require("./../utils/loginHelper");
const handlLogin = async (req, res) => {
	const userLoginInfor = req.body;
	const username = userLoginInfor.tai_khoan;
	const drawPass = userLoginInfor.mat_khau;
	try {
		const match = await checkUsernameAndPass(username, drawPass);
		if (!match) {
			// thông tin đăng nhập không đúng
			res.status(400).send("thông tin đăng nhập không đúng");
		} else {
			let user = (await userModel.getUserByUsername(username)).payload[0];
			user = deleteProperties(user, "mat_khau", "is_admin");
			const token = genJWT(user, 300);
			res.cookie("auth_", token, {
				maxAge: 1000 * 60 * 5,
				httpOnly: true,
				encode: String,
			});
			res.status(200).send("ok dang nhap thanh cong");
		}
	} catch (error) {
		console.log(error);
	}
};

const checkUsernameAndPass = async (username, drawPassword) => {
	const userQuery = await userModel.getUserByUsername(username);
	if (userQuery.status != 200) {
		throw new Error(userQuery.message);
	}
	const userExisted = true ? userQuery.payload.length > 0 : false;
	// console.log("toi tai", userQuery.payload[0]);
	if (userExisted) {
		const hashedPass = userQuery.payload[0].mat_khau;
		return await checkPassword(drawPassword, hashedPass);
	} else {
		// user node existed
		return false;
	}
};

module.exports = { handlLogin };
