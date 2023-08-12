const uuid = require('uuid');
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

genDueTime();

module.exports = {
	emailSuitableForRegister,
	usernameSuitableForRegister,
	genVertificationString,
	genDueTime,
};
