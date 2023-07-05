let mysql = require('mysql');
let { readENV } = require('./read_env');

const connect_infor = {
	host: readENV('SQL_DB_HOST'),
	user: readENV('SQL_DB_USERNAME'),
	password: readENV('SQL_DB_PASSWORD'),
	database: readENV('SQL_DB_NAME'),
};

let connection = mysql.createConnection(connect_infor);

module.exports = connection;
