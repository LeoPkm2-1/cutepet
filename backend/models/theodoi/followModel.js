const { sqlQuery, nonSQLQuery } = require('../index');
const { ObjectId } = require('mongodb');
const { Response } = require('../../utils/index');
const followStructure = require('./followStructure');

// general
const getOneFollowInforOfUserAndObjByType = async (
	followed_Obj_Id,
	follower_Id,
	type
) => {
	async function executor(collection) {
		return await collection.findOne({
			type,
			followed_Obj_Id,
			follower_Id,
		});
	}
	return await nonSQLQuery(executor, 'BangTheoDoi')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

// status post
const userFollowStatusPost = async (statusPost_Id, user_id) => {
	const statusPostFollow = new followStructure.FollowStatusPost(
		statusPost_Id,
		user_id
	);
	async function executor(collection) {
		return await collection.insertOne(statusPostFollow);
	}
	return await nonSQLQuery(executor, 'BangTheoDoi')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const userUnFollowStatusPost = async (statusPost_Id, user_id) => {
	async function executor(collection) {
		return await collection.deleteOne({
			type: followStructure.FollowStatusPost.get_type(),
			followed_Obj_Id: statusPost_Id,
			follower_Id: user_id,
		});
	}
	return await nonSQLQuery(executor, 'BangTheoDoi')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};







module.exports = {
	userFollowStatusPost,
	userUnFollowStatusPost,
	getOneFollowInforOfUserAndObjByType,
};
