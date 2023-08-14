const userModel = require('./../models/userModel');
const { validate_email } = require('./../utils/validate_email');
const { getHash } = require('./../utils');
const { Response } = require('./../utils/index');

const {
	emailSuitableForRegister,
	usernameSuitableForRegister,
	genVertificationString,
	genDueTime,
	sendActiveAccountMail,
} = require('./../utils/registerHelper');

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
		await userModel.deleteAllExpireNonActiveUser();
		const nameSuitable = await usernameSuitableForRegister(username);
		if (!nameSuitable) {
			// tài khoản đã tồn tại
			throw new Error(USER_EXIST_MESS);
		}
		// kiểm tra sự tồn tại của email
		const emailSuitable = await emailSuitableForRegister(email);
		if (!emailSuitable) {
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

		const active_code = genVertificationString();
		// const thoi_han = genDueTime().toLocaleString(undefined, {
		// 	timeZoneName: 'short',
		// 	hourCycle: 'h23',
		// });
		const thoi_han = genDueTime();
		const nonActiveUserInfor = {
			...userInfor,
			mat_khau: hashedPass,
			email: email,
			active_code,
			thoi_han,
		};

		await userModel.addNonActiveUser(nonActiveUserInfor);
		await sendActiveAccountMail({
			nameOfUser: userInfor.ten,
			emailAddress: email,
			active_code,
		});
		await res
			.status(200)
			.json(
				new Response(
					200,
					[],
					'Vui lòng xác thực đăng nhập bằng email đã đăng ký để hoàn tất'
				)
			);
		return;
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
				throw error;
		}
	}
};

module.exports = { handleRegister };
