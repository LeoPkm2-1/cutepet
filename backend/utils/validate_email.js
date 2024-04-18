const { validate } = require('deep-email-validator');

async function validate_email(email_address) {
	let check = await validate(email_address);
	return check;
}

// (async function () {
// 	const data = await validate_email('phat.mail:^eo2001k19@hcmut.edu.vn');
// 	console.log(data);
// })();
module.exports = { validate_email };
