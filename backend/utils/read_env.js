const path = require('path');
require('dotenv').config({
	path: __dirname + '/../.env',
});
const readENV = (env_key) => {
	return process.env[env_key];
};

module.exports = { readENV };
