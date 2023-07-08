let { readENV } = require('./read_env');
// let mysql = require('mysql');

// const connect_infor = {
// 	host: readENV('SQL_DB_HOST'),
// 	user: readENV('SQL_DB_USERNAME'),
// 	password: readENV('SQL_DB_PASSWORD'),
// 	database: readENV('SQL_DB_NAME'),
// };

// let connection = mysql.createConnection(connect_infor);

// module.exports = connection;

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: readENV('SQL_DB_HOST'),
	user: readENV('SQL_DB_USERNAME'),
	password: readENV('SQL_DB_PASSWORD'),
	connectionLimit: 5,
});

async function sqlQuery(querystmt, data = []) {
	let conn;
	try {
		conn = await pool.getConnection();
		const result = await conn.query(querystmt, data);
		return result;
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
	}
}
module.exports = sqlQuery;
