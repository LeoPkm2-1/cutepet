require('dotenv').config();
const readENV = (env_key) => {
	return process.env[env_key];
};

module.exports = { readENV };
