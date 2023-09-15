const postModel = require('../models/postModel');
const { Response } = require('./../utils/index');

const addStatusPostController = async (req, res) => {
	const { text, media } = req.body;
	const postStatus = {
		text,
		postType: 'status',
		media,
		createAt: new Date(),
		numOfLike: 0,
		numOfComment: 0,
		owner_id: req.auth_decoded.ma_nguoi_dung,
	};
	const addProcess = await postModel.addStatusPost(postStatus);
	if (addProcess.status != 200) {
		res.status(400).json(new Response(400, [], 'đã có lỗi xảy ra', 300, 300));
		return;
	}
	const insertedPost = await postModel.getStatusPostById(
		addProcess.payload.insertedId
	);
	res
		.status(200)
		.json(new Response(200, insertedPost.payload, 'thêm thành công'));
	return;
};

const addCommentController = async (req, res) => {
	const comment = req.body.comment;
	const post_id = req.body.post_id;
	const commentBy = req.auth_decoded.ma_nguoi_dung;
	const commentAt = new Date();
	const numOfLike = 0;
	const numOfReply = 0;
	const numOfComment = req.body.STATUS_POST_INFOR.numOfComment;

	const comment_data = {
		postId: post_id,
		comment,
		commentBy,
		commentAt,
		numOfLike,
		numOfReply,
	};
	const commentProcess = await postModel.addCommentStatusPost(comment_data);
	// console.log('commentProcess',commentProcess);
	if (commentProcess.status != 200) {
		res.status(400).json(new Response(400, [], 'đã có lỗi xảy ra', 300, 300));
		return;
	}
	await postModel.updateNumOfCommentStatusPost(post_id, numOfComment + 1);
	const insertedComment = await postModel.getCommentStatusPostById(
		commentProcess.payload.insertedId.toString()
	);
	// console.log('insertedComment',insertedComment);
	res
		.status(200)
		.json(new Response(200, insertedComment.payload[0], 'thêm thành công'));
	return;
};

const toggleLikeStatusController = async (req, res) => {
	const ERROR_HAPPEN_MESSAGE = 'đã có lỗi xảy ra';
	try {
		const { post_id, action } = req.body;
		const userLike = req.auth_decoded.ma_nguoi_dung;
		const numOfLike = req.body.STATUS_POST_INFOR.numOfLike;
		if (action == 'LIKE') {
			const likeProcess = await postModel.addLikeStatusPost(post_id, userLike);
			if (likeProcess.status != 200) throw new Error(ERROR_HAPPEN_MESSAGE);

			const likeInfor = await postModel
				.getLikeThePostInfor(userLike, post_id)
				.then((data) => data.payload[0]);
			// update num of like
			await postModel.updateNumOfLikeStatusPost(post_id, numOfLike + 1);
			res.status(200).json(new Response(200, likeInfor, 'like thành công'));
			return;
		} else {
			const removeLikeProcess = await postModel.removeLikeStatusPost(
				post_id,
				userLike
			);
			if (removeLikeProcess.status != 200)
				throw new Error(ERROR_HAPPEN_MESSAGE);
			// update num of like
			await postModel.updateNumOfLikeStatusPost(post_id, numOfLike - 1);
			res.status(200).json(
				new Response(
					200,
					{
						postId: post_id,
					},
					'hủy like thành công'
				)
			);
			return;
		}
	} catch (error) {
		switch (error.message) {
			case ERROR_HAPPEN_MESSAGE:
				res
					.status(400)
					.json(new Response(400, [], ERROR_HAPPEN_MESSAGE, 300, 300));
				return;

			default:
				break;
		}
	}
};

const toggleLikeCmtStatusController = async (req, res) => {
	const ERROR_HAPPEN_MESSAGE = 'đã có lỗi xảy ra';
	try {
		const { cmt_id, action } = req.body;
		const userLike = req.auth_decoded.ma_nguoi_dung;
		const numOfLike = req.body.CMT_POST_INFOR.numOfLike;
		// console.log('hehe',req.body.CMT_POST_INFOR);
		if (action == 'LIKE') {
			const likeProcess = await postModel.addLikeCmtStatusPost(
				cmt_id,
				userLike
			);
			if (likeProcess.status != 200) throw new Error(ERROR_HAPPEN_MESSAGE);

			const likeInfor = await postModel
				.getLikeCmtStatusPostInfor(userLike, cmt_id)
				.then((data) => data.payload[0]);
			await postModel.updateNumOfLikeCmtStatusPost(cmt_id, numOfLike + 1);
			res.status(200).json(new Response(200, likeInfor, 'like thành công'));

			return;
		} else {
			const removeLikeProcess = await postModel.removeLikeCmtStatusPost(
				cmt_id,
				userLike
			);
			if (removeLikeProcess.status != 200)
				throw new Error(ERROR_HAPPEN_MESSAGE);
			// update the num of like;
			await postModel.updateNumOfLikeCmtStatusPost(cmt_id, numOfLike - 1);
			res
				.status(200)
				.json(new Response(200, { cmtId: cmt_id }, 'hủy like thành công'));
			return;
		}
	} catch (error) {
		switch (error.message) {
			case ERROR_HAPPEN_MESSAGE:
				res
					.status(400)
					.json(new Response(400, [], ERROR_HAPPEN_MESSAGE, 300, 300));
				return;

			default:
				break;
		}
	}
};

const replyCmtStatusController = async (req, res) => {
	const reply = req.body.reply;
	const cmt_id = req.body.cmt_id;
	const replyBy = req.auth_decoded.ma_nguoi_dung;
	const replyAt = new Date();
	const numOfLike = 0;
	const numOfReply = req.body.CMT_POST_INFOR.numOfReply;

	const reply_data = {
		cmtId: cmt_id,
		reply,
		replyBy,
		replyAt,
		numOfLike,
	};
	const replyProcess = await postModel.addReplyCommentStatusPost(reply_data);
	if (replyProcess.status != 200) {
		res.status(400).json(new Response(400, [], 'đã có lỗi xảy ra', 300, 300));
		return;
	}
	await postModel.updateNumOfCommentCmtStatusPost(cmt_id, numOfReply + 1);
	const insertedReply = await postModel.getReplyCommentStatusPostById(
		replyProcess.payload.insertedId.toString()
	);
	res
		.status(200)
		.json(new Response(200, insertedReply.payload[0], 'reply thành công'));
	return;
};

module.exports = {
	addStatusPostController,
	toggleLikeStatusController,
	addCommentController,
	toggleLikeCmtStatusController,
	replyCmtStatusController,
};
