const { sqlQuery, nonSQLQuery } = require('./index');
const { Response } = require('./../utils/index');
const { ObjectId } = require('mongodb');

const addStatusPost = async (statusPost) => {
	async function executor(collection) {
		return await collection.insertOne(statusPost);
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getStatusPostById = async (id) => {
	async function executor(collection) {
		return await collection.find({ _id: new ObjectId(id) }).toArray();
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const addCommentStatusPost = async (comment_data) => {
	async function executor(collection) {
		return await collection.insertOne(comment_data);
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

module.exports = {
	addStatusPost,
	getStatusPostById,
	addCommentStatusPost
};
