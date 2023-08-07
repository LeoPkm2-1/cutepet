const userModel = require('../models/userModel');
const { checkPassword, readENV, Response } = require('./../utils');
const {
	genJWT,
	deleteProperties,
	storeToken,
} = require('./../utils/loginHelper');

const handlLogin = async (req, res) => {
	const userLoginInfor = req.body;
	const username = userLoginInfor.tai_khoan;
	const drawPass = userLoginInfor.mat_khau;
	try {
		const match = await checkUsernameAndPass(username, drawPass);
		if (!match[0]) {
			// thông tin đăng nhập không đúng
			res.status(400).send('thông tin đăng nhập không đúng');
		} else {
			// let user = (await userModel.getUserByUsername(username)).payload[0];
			let user = match[1].payload[0];
			user = deleteProperties(user, 'mat_khau', 'is_admin', 'token');
			const lastTimeJWT = parseInt(readENV('JWT_LAST_TIME'));
			const token = genJWT(user, lastTimeJWT);
			// res.cookie("auth_", token, {
			// 	maxAge: 1000 * lastTimeJWT,
			// 	httpOnly: true,
			// 	encode: String,
			// });
			const storeStatus = await storeToken(token, user.ma_nguoi_dung);
			if (storeStatus.status === 200) {
				res.status(200).send(
					new Response(200, [{ token }], 'Đăng nhập thành công')
				);
			} else {
				res.status(400).json(
					new Response(
						400,
						[],
						storeStatus.message,
						storeStatus.errno,
						storeStatus.errcode
					)
				);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

const checkUsernameAndPass = async (username, drawPassword) => {
	let userQuery = [];
	if (isEmailForm(username)) {
		userQuery = await userModel.getUserByEmail(username);
	} else {
		userQuery = await userModel.getUserByUsername(username);
	}
	if (userQuery.status != 200) {
		throw new Error(userQuery.message);
	}
	const userExisted = true ? userQuery.payload.length > 0 : false;
	// console.log("toi tai", userQuery.payload[0]);
	if (userExisted) {
		const hashedPass = userQuery.payload[0].mat_khau;
		const match = await checkPassword(drawPassword, hashedPass);
		return [match, userQuery];
	} else {
		// user node existed
		return [false, []];
	}
};

const isEmailForm = (username) => {
	return username.includes('@');
};

module.exports = { handlLogin };
