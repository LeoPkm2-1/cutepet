const { sqlQuery, nonSQLQuery } = require('../index');
const { ObjectId } = require('mongodb');
const { Response } = require('../../utils/index');

const addNotification = async (notification) => {
	async function executor(collection) {
		return await collection.insertOne(notification);
	}
	return await nonSQLQuery(executor, 'ThongBao')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getNotificationByIndexAndRange = async (user_index, index, range) => {
	index = parseInt(index);
	range = parseInt(range);
	async function executor(collection) {
		return await collection
			.find({ receiver_id: user_index })
			.limit(index + range)
			.sort({ createAt: -1 })
			.toArray();
	}
	return await nonSQLQuery(executor, 'ThongBao')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

module.exports = { addNotification, getNotificationByIndexAndRange };
