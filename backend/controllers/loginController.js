const userModel = require('../models/userModel');
const { checkPassword, readENV, Response } = require('./../utils');
const {
	genJWT,
	deleteProperties,
	storeToken,
} = require('./../utils/loginHelper');

const handlLogin = async (req, res) => {
	const INFOR_NOT_MATCH_MES = 'thông tin đăng nhập không đúng';
	const { tai_khoan: userIndentifier } = req.body;
	const { mat_khau: drawPass } = req.body;
	try {
		const { match, userInfor } = await checkUsernameAndPass(
			userIndentifier,
			drawPass
		);

		if (!match) {
			throw new Error(INFOR_NOT_MATCH_MES);
		}
		let user = deleteProperties(userInfor, 'mat_khau', 'is_admin', 'token');
		const lastTimeJWT = parseInt(readENV('JWT_LAST_TIME'));
		const token = genJWT(user, lastTimeJWT);
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
	} catch (error) {
		switch (error.message) {
			case INFOR_NOT_MATCH_MES:
				res.status(400).json(
					new Response(400, [], INFOR_NOT_MATCH_MES, 300, 300)
				);
				return;

			default:
				console.log(error);
				throw error;
		}
	}
};

const checkUsernameAndPass = async (username_email, drawPassword) => {
	console.log({username_email,drawPassword});
	let response = isEmailForm(username_email)
		? await userModel.getUserByEmail(username_email)
		: await userModel.getUserByUsername(username_email);
	if (response.status != 200) throw new Error(response.message);

	const userExisted = true ? response.payload.length > 0 : false;

	if (userExisted) {
		const hashedPass = response.payload[0].mat_khau;
		const match = await checkPassword(drawPassword, hashedPass);
		const data = match
			? { match, userInfor: response.payload[0] }
			: { match, userInfor: {} };
		return data;
	}
	return { match: false, userInfor: {} };
};

const isEmailForm = (username) => {
	return username.includes('@');
};

module.exports = { handlLogin };
