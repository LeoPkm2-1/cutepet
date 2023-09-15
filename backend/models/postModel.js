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

const addLikeStatusPost = async (post_id, user_id) => {
	async function executor(collection) {
		return await collection.insertOne({
			postId: post_id,
			userLike: user_id,
			likeAt: new Date(),
		});
	}
	return await nonSQLQuery(executor, 'LikeBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const addLikeCmtStatusPost = async (cmt_id, user_id) => {
	async function executor(collection) {
		return await collection.insertOne({
			cmtId: cmt_id,
			userLike: user_id,
			likeAt: new Date(),
		});
	}
	return await nonSQLQuery(executor, 'LikeBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

// (async () => {
// 	const data = await addLikeCmtStatusPost('6501d6b7a7499cde4c143603', 2);
// 	console.log(data);
// })();

const removeLikeStatusPost = async (post_id, user_id) => {
	async function executor(collection) {
		return await collection.deleteOne({
			postId: post_id,
			userLike: user_id,
		});
	}
	return await nonSQLQuery(executor, 'LikeBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const removeLikeCmtStatusPost = async (cmt_id, user_id) => {
	async function executor(collection) {
		return await collection.deleteOne({
			cmtId: cmt_id,
			userLike: user_id,
		});
	}
	return await nonSQLQuery(executor, 'LikeBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getLikeThePostInfor = async (user_id, post_id) => {
	async function executor(collection) {
		return await collection
			.find({ userLike: user_id, postId: post_id })
			.toArray();
	}
	return await nonSQLQuery(executor, 'LikeBaiVietTrangThai')
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

const addReplyCommentStatusPost = async (reply_data) => {
	async function executor(collection) {
		return await collection.insertOne(reply_data);
	}
	return await nonSQLQuery(executor, 'RelyBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const updateNumOfLikeStatusPost = async (post_id, numOfLike) => {
	async function executor(collection) {
		return await collection.updateOne(
			{ _id: new ObjectId(post_id) },
			{ $set: { numOfLike: numOfLike } }
		);
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const updateNumOfLikeCmtStatusPost = async (cmt_id, numOfLike) => {
	async function executor(collection) {
		return await collection.updateOne(
			{ _id: new ObjectId(cmt_id) },
			{ $set: { numOfLike: numOfLike } }
		);
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

// (async () => {
// 	const data = await updateNumOfLikeCmtStatusPost('6501d6b7a7499cde4c143603',0)
// 	console.log(data);
// })();

const updateNumOfCommentStatusPost = async (post_id, numOfComment) => {
	async function executor(collection) {
		return await collection.updateOne(
			{ _id: new ObjectId(post_id) },
			{ $set: { numOfComment: numOfComment } }
		);
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getCommentStatusPostById = async (cmt_id) => {
	async function executor(collection) {
		return await collection.find({ _id: new ObjectId(cmt_id) }).toArray();
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getLikeCmtStatusPostInfor = async (user_id, cmt_id) => {
	async function executor(collection) {
		return await collection
			.find({ userLike: user_id, cmtId: cmt_id })
			.toArray();
	}
	return await nonSQLQuery(executor, 'LikeBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

// (async () => {
// 	const data = await getLikeCmtStatusPostInfor(7,'6501d6b7a7499cde4c143603');
// 	console.log('ahihi',data);
// })()

const updateNumOfCommentCmtStatusPost = async (cmt_id, numOfReply) => {
	async function executor(collection) {
		return await collection.updateOne(
			{ _id: new ObjectId(cmt_id) },
			{ $set: { numOfReply: numOfReply } }
		);
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getReplyCommentStatusPostById = async (replyId) => {
	async function executor(collection) {
		return await collection.find({ _id: new ObjectId(replyId) }).toArray();
	}
	return await nonSQLQuery(executor, 'RelyBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getReplyCommentStatusPostByStatusId = async (cmt_id) => {
	async function executor(collection) {
		return await collection.find({ cmtId: cmt_id }).toArray();
	}
	return await nonSQLQuery(executor, 'RelyBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getCommentStatusPostByPostId = async (postId) => {
	async function executor(collection) {
		return await collection.find({ postId: postId }).toArray();
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

(async function () {
	const data = await getCommentStatusPostByPostId('64fd4517b00c4d6c5dc9a9ed');
	console.log(data);
})();

module.exports = {
	addStatusPost,
	getStatusPostById,
	addCommentStatusPost,
	addLikeStatusPost,
	getLikeThePostInfor,
	removeLikeStatusPost,
	removeLikeCmtStatusPost,
	updateNumOfLikeStatusPost,
	updateNumOfLikeCmtStatusPost,
	updateNumOfCommentStatusPost,
	updateNumOfCommentCmtStatusPost,
	getCommentStatusPostById,
	getLikeCmtStatusPostInfor,
	addLikeCmtStatusPost,
	addReplyCommentStatusPost,
	getReplyCommentStatusPostById,
	getReplyCommentStatusPostByStatusId,
	getCommentStatusPostByPostId,
};
