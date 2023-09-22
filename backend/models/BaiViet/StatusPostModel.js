const { sqlQuery, nonSQLQuery } = require('../index');
const { Response } = require('../../utils/index');
const { ObjectId } = require('mongodb');

const addPost = async (statusPost) => {
	async function executor(collection) {
		return await collection.insertOne(statusPost);
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getPostById = async (id) => {
	async function executor(collection) {
		return await collection.find({ _id: new ObjectId(id) }).toArray();
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const addLikePost = async (post_id, user_id) => {
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

const addLikeCmtPost = async (cmt_id, user_id) => {
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
// 	const data = await addLikeCmtPost('6501d6b7a7499cde4c143603', 2);
// 	console.log(data);
// })();

const removeLikePost = async (post_id, user_id) => {
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

const removeLikeCmtPost = async (cmt_id, user_id) => {
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

const addComment = async (comment_data) => {
	async function executor(collection) {
		return await collection.insertOne(comment_data);
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const addReplyComment = async (reply_data) => {
	async function executor(collection) {
		return await collection.insertOne(reply_data);
	}
	return await nonSQLQuery(executor, 'RelyBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const updateNumOfLikePost = async (post_id, numOfLike) => {
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

const updateNumOfLikeCmtPost = async (cmt_id, numOfLike) => {
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

const updateNumOfCommentPost = async (post_id, numOfComment) => {
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

const getCommentPostById = async (cmt_id) => {
	async function executor(collection) {
		return await collection.find({ _id: new ObjectId(cmt_id) }).toArray();
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getLikeCmtPostInfor = async (user_id, cmt_id) => {
	async function executor(collection) {
		return await collection
			.find({ userLike: user_id, cmtId: cmt_id })
			.toArray();
	}
	return await nonSQLQuery(executor, 'LikeBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const updateNumOfCommentCmtPost = async (cmt_id, numOfReply) => {
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

const getReplyCommentById = async (replyId) => {
	async function executor(collection) {
		return await collection.find({ _id: new ObjectId(replyId) }).toArray();
	}
	return await nonSQLQuery(executor, 'RelyBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getAllReplyCommentByCmtId = async (cmt_id) => {
	async function executor(collection) {
		return await collection
			.find({ cmtId: cmt_id })
			.sort({ replyAt: -1 })
			.toArray();
	}
	return await nonSQLQuery(executor, 'RelyBinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getAllCmtByPostId = async (postId) => {
	async function executor(collection) {
		return await collection
			.find({ postId: postId })
			.sort({ commentAt: -1 })
			.toArray();
	}
	return await nonSQLQuery(executor, 'BinhLuanBaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

const getAllPost = async () => {
	async function executor(collection) {
		return await collection.find().sort({ createAt: -1 }).toArray();
	}
	return await nonSQLQuery(executor, 'BaiVietTrangThai')
		.then((data) => new Response(200, data, ''))
		.catch((err) => new Response(400, err, '', 300, 300));
};

module.exports = {
	addPost,
	getPostById,
	addComment,
	addLikePost,
	getLikeThePostInfor,
	removeLikePost,
	removeLikeCmtPost,
	updateNumOfLikePost,
	updateNumOfLikeCmtPost,
	updateNumOfCommentPost,
	updateNumOfCommentCmtPost,
	getCommentPostById,
	getLikeCmtPostInfor,
	addLikeCmtPost,
	addReplyComment,
	getReplyCommentById,
	getAllReplyCommentByCmtId,
	getAllCmtByPostId,
	getAllPost,
};
