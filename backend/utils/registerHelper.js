const userModel = require('./../models/userModel');

async function usernameSuitableForRegister(username) {
	let existed = await userModel
		.getUserByUsername(username)
		.then((data) => data.payload.length > 0);
	if (existed) return false;

	existed = await userModel
		.getUserNonActiveByUsername(username)
		.then((data) => {
			return data.length > 0;
		});
	if (existed) return false;
	return true;
}

// (async function () {
// 	const data = await usernameSuitableForRegister('ahihiac');
// 	console.log(data);
// })();
async function emailSuitableForRegister(email) {
	let existed = await userModel
		.getUserByEmail(email)
		.then((data) => data.payload.length > 0);
	if (existed) return false;
	existed = await userModel
		.getUserNonActiveByEmail(email)
		.then((data) => data.length > 0);

	if (existed) return false;
	return true;
}

// (async function () {
// 	const data = await emailSuitableForRegister('le2o@gmail.com');
// 	console.log(data);
// })();

module.exports = {
	emailSuitableForRegister,
	usernameSuitableForRegister,
};
