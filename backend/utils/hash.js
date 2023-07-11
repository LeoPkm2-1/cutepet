const bcrypt = require("bcrypt");
const { readENV } = require("./read_env");
const saltRoundNum = parseInt(readENV("PASSWORD_SALT_ROUNDS"));
const getHash = async (password, saltRound = saltRoundNum) => {
	return await bcrypt
		.hash(password, saltRound)
		.then((hashedPassword) => hashedPassword);
};
const checkPassword = async (password, hashPass) => {
	return await bcrypt.compare(password, hashPass).then((result) => result);
};
module.exports = { checkPassword, getHash };
