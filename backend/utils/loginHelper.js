const { readENV } = require("./read_env.js");
const jwt = require("jsonwebtoken");
function deleteProperties(obj, ...properties) {
	properties.map((propertyName) => delete obj[propertyName]);
	return obj;
}
function genJWT(obj, lasttime = 5 * 60) {
	const secretKey = readENV("JWT_KEY");
	const token = jwt.sign(obj, secretKey, {
		expiresIn: lasttime,
		algorithm: "HS512",
	});
	return token;
}

function vertifyJWT(JWT) {
	const secretKey = readENV("JWT_KEY");
	try {
		const decoded = jwt.verify(JWT, secretKey);
		return [true, decoded];
	} catch (error) {
		console.log(error);
		return [false, error.message];
	}
}

module.exports = { genJWT, deleteProperties, vertifyJWT };
