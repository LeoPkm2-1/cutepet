const userModel = require('./../models/userModel');
const { validate_email } = require('./../utils/validate_email');
const { getHash } = require('./../utils');
const { Response } = require('./../utils/index');

// handl add new user to database
const handleRegister = async (req, res) => {
	const USER_EXIST_MESS = 'người dùng đã tồn tại';
	const INVALID_EMAIL_MESS = 'email không hợp lệ';
	const EMAIL_EXISTED_MESS = 'email đã tồn tại';
	try {
		const userInfor = req.body;
		const username = userInfor.tai_khoan;
		const email = userInfor.email.toLowerCase();

		// kiểm tra sự tồn tại của tài khoản
		let user = await userModel.getUserByUsername(username);
		let existed = true ? user.payload.length > 0 : false;
		if (existed) {
			// tài khoản đã tồn tại
			throw new Error(USER_EXIST_MESS);
		}
		// kiểm tra sự tồn tại của email
		user = await userModel.getUserByEmail(email);
		existed = true ? user.payload.length > 0 : false;
		if (existed) {
			// email đã tồn tại
			throw new Error(EMAIL_EXISTED_MESS);
		}
		// kiểm tra email valid
		const mailvalidate = await validate_email(email);
		if (!mailvalidate.valid) {
			// email ko hợp lệ
			throw new Error(INVALID_EMAIL_MESS);
		}
		// tài khoản dc chấp nhận
		const hashedPass = await getHash(userInfor['mat_khau']);
		const userInforHashed = {
			...userInfor,
			mat_khau: hashedPass,
			email: email,
		};
		// let result = await userModel.addUser(userInforHashed);
		// if (result.status != 200) {
		// 	res.status(500).json(
		// 		new Response(500, [], result.message, 300, 300)
		// 	);
		// 	return;
		// }
		// res.status(result.status).json(
		// 	new Response(200, [], 'thêm người dùng thành công')
		// );
	} catch (error) {
		switch (error.message) {
			case USER_EXIST_MESS:
				res.status(400).json(new Response(400, [], USER_EXIST_MESS));
				return;
			case INVALID_EMAIL_MESS:
				res.status(400).json(new Response(400, [], INVALID_EMAIL_MESS));
				return;
			case EMAIL_EXISTED_MESS:
				res.status(400).json(new Response(400, [], EMAIL_EXISTED_MESS));
				return;
			default:
				break;
		}
	}
};

module.exports = { handleRegister };
