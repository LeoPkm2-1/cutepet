const mariadb = require('mariadb');
const { config_SQL_DB } = require('./config_SQL_DB');

const db = mariadb.createPool(config_SQL_DB);

async function sqlQuery(sqlStmt, params = []) {
	let conn = false;
	try {
		conn = await db.getConnection();
		if (conn) {
			let result = await conn.query(sqlStmt, params).then((data) => data);
			return result;
		}
	} catch (error) {
		throw error;
	} finally {
		// console.log("close db connect");
		if (conn) conn.end();
	}
}
module.exports = { sqlQuery };
