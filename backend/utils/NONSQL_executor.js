const { MongoClient } = require('mongodb');
const { NON_SQL_DB_ADDRESS, NON_SQL_DB_NAME } = require('./config_NON_SQL_DB');

const client = new MongoClient(NON_SQL_DB_ADDRESS);

async function nonSQLQuery(collection_name, executor, ...args) {
	try {
		await client.connect();
		console.log('Connected successfully to MongoDB server');
		const db = client.db(NON_SQL_DB_NAME);
		const collection = db.collection(collection_name);
		const data = await executor(collection, ...args);
		client.close();
		return data;
	} catch (error) {
		console.log(error);
	}
}

module.exports = { nonSQLQuery };

// async function insertMany(collection) {
// 	const insertResult = await collection.insertMany([
// 		{ a: 1 },
// 		{ a: 2 },
// 		{ a: 3 },
// 	]);
// 	return insertResult;
// }
// (async function () {
// 	const d = await nonSQLQuery(
// 		'NguoiDungChuaChinhThuc',
// 		insertMany,
// 		1,
// 		2,
// 		3,
// 		4,
// 		5
// 	);
// 	console.log(d);
// })();
