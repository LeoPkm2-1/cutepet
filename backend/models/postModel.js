const { sqlQuery, nonSQLQuery } = require('./index');
const { Response } = require('./../utils/index');
const addStatusPostData = async (postData) => {
	async function executor(collection) {
		return await collection.insertOne(postData);
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

module.exports = {
    addStatusPostData,
}