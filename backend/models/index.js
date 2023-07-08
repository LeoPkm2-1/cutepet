const mariadb = require("mariadb");
const { readENV } = require("./../utils");
const db = mariadb.createPool({
	host: readENV("SQL_DB_HOST"),
	user: readENV("SQL_DB_USERNAME"),
	password: readENV("SQL_DB_PASSWORD"),
	database: readENV("SQL_DB_NAME"),
	connectionLimit: 1,
});
async function sqlQuery(sqlStmt, params = []) {
	let conn = false;
	try {
		conn = await db.getConnection();
		if (conn) console.log("Open db connect");
		let result = await conn.query(sqlStmt, params).then((data) => data);
		return result;
	} catch (error) {
		throw error;
	} finally {
		console.log("close db connect");
		if (conn) conn.end();
	}
}
module.exports = { sqlQuery };
