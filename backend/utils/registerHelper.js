const uuid = require('uuid');
const Mailgen = require('mailgen');
const { sendMail } = require('./mail_sender');
const userModel = require('./../models/userModel');
const { readENV } = require('./read_env');

async function usernameSuitableForRegister(username) {
	let existed = await userModel
		.getUserByUsername(username)
		.then((data) => data.payload.length > 0);
	if (existed) return false;

	existed = await userModel
		.getUserNonActiveByUsername(username)
		.then((data) => {
			if (data.length === 0) return false;
			const [user] = data;
			if (user.thoi_han >= new Date()) return true;
			return false;
		});
	if (existed) return false;
	return true;
}

async function emailSuitableForRegister(email) {
	let existed = await userModel
		.getUserByEmail(email)
		.then((data) => data.payload.length > 0);
	if (existed) return false;
	existed = await userModel.getUserNonActiveByEmail(email).then((data) => {
		if (data.length === 0) return false;
		const [user] = data;
		if (user.thoi_han >= new Date()) return true;
		return false;
	});

	if (existed) return false;
	return true;
}

async function getNonActiveUserByValidActiveCode(active_code) {
	let user = await userModel.getUserNonActiveByActiveCode(active_code);
	// console.log('user:', user);
	if (user.length === 0) return {};
	user = user[0];
	if (user.thoi_han < new Date()) return {};
	return user;
}

function genVertificationString() {
	const uniqueString = uuid.v4();
	return uniqueString;
}

function genDueTime() {
	const period = parseInt(readENV('ACTIVE_CODE_TIME'));
	let current = new Date();
	// console.log(current.toLocaleString());
	current.setSeconds(current.getSeconds() + period);
	// console.log(current.toLocaleString());
	return current;
}

async function sendActiveAccountMail({
	nameOfUser,
	emailAddress,
	active_code,
}) {
	const mailGenerator = new Mailgen({
		theme: 'salted',
		product: {
			name: '🦴 CutePet 🦴 ',
			link: 'https://cutepet.com.js/',
			logo: 'https://petcube.com/blog/content/images/2018/04/boo-the-dog-3.jpg',
		},
	});
	const linkAddress = `http://localhost:3001/user/confirmRegister/${active_code}`;
	const email = {
		body: {
			name: `${nameOfUser} (${emailAddress})`,
			intro: 'Chào mừng bạn đã đến với 🦴 CutePet 🦴',
			action: {
				instructions:
					'Để hoàn thành đăng ky vui lòng xác nhận bằng cách bấm vào nút bên dưới',
				button: {
					color: '#22BC66',
					text: 'Xác nhận đăng ký',
					link: `${linkAddress}`,
				},
			},
			outro: [
				`Nếu Nút xác nhận không hoạt động vui lòng bấm vào liên kết này: ${linkAddress}`,
				'Nếu có bất kỳ thắc mắc nào xin hãy liên lạc với chúng tui qua: abc@gmail.com',
			],
		},
	};
	// Generate an HTML email with the provided contents
	const emailBody = mailGenerator.generate(email);

	return await sendMail(`${emailAddress}`, {
		subject: 'xác thực đăng ký tài khoản CutePet 🐾', // Subject line
		html: emailBody,
	});
}

module.exports = {
	emailSuitableForRegister,
	usernameSuitableForRegister,
	genVertificationString,
	genDueTime,
	sendActiveAccountMail,
	getNonActiveUserByValidActiveCode,
};