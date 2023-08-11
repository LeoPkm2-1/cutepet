const mariadb = require('mariadb');
const { config_SQL_DB } = require('./index');

const db = mariadb.createPool(config_SQL_DB);

async function sqlQuery(sqlStmt, params = []) {
	let conn = false;
	try {
		conn = await db.getConnection();
		if (conn) {
			// console.log("Open db connect");
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
