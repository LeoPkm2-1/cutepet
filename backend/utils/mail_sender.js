const nodemailer = require('nodemailer');
const { readENV, Response } = require('./index');

const EMAIL_USER = readENV('EMAIL_USER');

const EMAIL_CONFIG = {
	service: 'gmail',
	auth: {
		user: EMAIL_USER,
		pass: readENV('EMAIL_PASSWORD'),
	},
};

// {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   }
const transporter = nodemailer.createTransport(EMAIL_CONFIG);
async function sendMail(recipients, mailContent) {
	const recipients_parse = Array.isArray(recipients)
		? recipients.join(',')
		: recipients;
	const mailOptions = {
		from: `"🦴 CutePet 🦴 " <${EMAIL_USER}>`,
		to: recipients_parse,
		...mailContent,
	};
	return await transporter
		.sendMail(mailOptions)
		.then((info) => {
			return new Response(200, info, 'sent mail successfully');
		})
		.catch((error) => {
			console.log(error);
			return new Response(400, error, 'sent mail have error', 300, 300);
		});
}

// (async function () {
// 	const data = await sendMail('abc@gmail.com', {
// 		subject: 'Hello ✔', // Subject line
// 		text: 'Hello world?', // plain text body
// 		html: '<b>Hello world?</b>', // html body
// 	});
// 	console.log(data);
// })();

module.exports = { sendMail };
