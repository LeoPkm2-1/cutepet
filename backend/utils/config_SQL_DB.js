const { readENV } = require('./read_env.js');
const config_SQL_DB = {
	host: readENV('SQL_DB_HOST'),
	user: readENV('SQL_DB_USERNAME'),
	password: readENV('SQL_DB_PASSWORD'),
	database: readENV('SQL_DB_NAME'),
	connectionLimit: 1,
};
module.exports = { config_SQL_DB };
