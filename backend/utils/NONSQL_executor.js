const { MongoClient } = require('mongodb');
const { NON_SQL_DB_ADDRESS, NON_SQL_DB_NAME } = require('./config_NON_SQL_DB');

const client = new MongoClient(NON_SQL_DB_ADDRESS);

async function nonSQLQuery(executor, collection_name, ...args) {
	try {
		await client.connect();
		// console.log('Connected successfully to MongoDB server');
		const db = await client.db(NON_SQL_DB_NAME);
		const collection = await db.collection(collection_name);
		const data = await executor(collection, ...args);
		await client.close();
		return data;
	} catch (error) {
		console.log(error);
	}
}

module.exports = { nonSQLQuery };
