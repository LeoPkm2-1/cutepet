const { sqlQuery, nonSQLQuery } = require('../index');
const { ObjectId } = require('mongodb');
const { Response } = require('../../utils/index');
const followStructure = require('./followStructure');

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

// (async function () {
// 	const data = await getOneFollowInforOfUserAndObjByType(
// 		'652a3df102428495e9738d70',
// 		5,
// 		'FOLOW_STATUS_POST'
// 	);
// 	console.log(data);
// })();

module.exports = {
	userFollowStatusPost,
	userUnFollowStatusPost,
	getOneFollowInforOfUserAndObjByType,
};
