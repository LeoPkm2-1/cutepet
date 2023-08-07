const { validate } = require('deep-email-validator');

async function validate_email(email_address) {
	let check = await validate(email_address);
	return check;
}

// (async function () {
// 	const data = await validate_email('badaocvgun1y@gmail.com');
// 	console.log(data);
// })();
module.exports = { validate_email };
