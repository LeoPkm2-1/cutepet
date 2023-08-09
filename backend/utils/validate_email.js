const { validate } = require('deep-email-validator');

async function validate_email(email_address) {
	let check = await validate(email_address);
	return check;
}


module.exports = { validate_email };
