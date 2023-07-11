const mariadb = require("mariadb");
const { configDB } = require("./../utils");

const db = mariadb.createPool(configDB);

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
