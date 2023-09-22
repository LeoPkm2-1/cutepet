const StatusPostModel = require('../../models/BaiViet/StatusPostModel');
const userHelper = require('../../utils/userHelper');
const { Response } = require('../../utils/index');

const addPostController = async (req, res) => {
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
	const addProcess = await StatusPostModel.addPost(postStatus);
	if (addProcess.status != 200) {
		res.status(400).json(new Response(400, [], 'đã có lỗi xảy ra', 300, 300));
		return;
	}
	const insertedPost = await StatusPostModel.getPostById(
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
	const commentProcess = await StatusPostModel.addComment(comment_data);
	// console.log('commentProcess',commentProcess);
	if (commentProcess.status != 200) {
		res.status(400).json(new Response(400, [], 'đã có lỗi xảy ra', 300, 300));
		return;
	}
	await StatusPostModel.updateNumOfCommentPost(post_id, numOfComment + 1);
	const insertedComment = await StatusPostModel.getCommentPostById(
		commentProcess.payload.insertedId.toString()
	);
	// console.log('insertedComment',insertedComment);
	res
		.status(200)
		.json(new Response(200, insertedComment.payload[0], 'thêm thành công'));
	return;
};

const toggleLikePostController = async (req, res) => {
	const ERROR_HAPPEN_MESSAGE = 'đã có lỗi xảy ra';
	try {
		const { post_id, action } = req.body;
		const userLike = req.auth_decoded.ma_nguoi_dung;
		const numOfLike = req.body.STATUS_POST_INFOR.numOfLike;
		if (action == 'LIKE') {
			const likeProcess = await StatusPostModel.addLikePost(post_id, userLike);
			if (likeProcess.status != 200) throw new Error(ERROR_HAPPEN_MESSAGE);

			const likeInfor = await StatusPostModel.getLikeThePostInfor(
				userLike,
				post_id
			).then((data) => data.payload[0]);
			// update num of like
			await StatusPostModel.updateNumOfLikePost(post_id, numOfLike + 1);
			res.status(200).json(new Response(200, likeInfor, 'like thành công'));
			return;
		} else {
			const removeLikeProcess = await StatusPostModel.removeLikePost(
				post_id,
				userLike
			);
			if (removeLikeProcess.status != 200)
				throw new Error(ERROR_HAPPEN_MESSAGE);
			// update num of like
			await StatusPostModel.updateNumOfLikePost(post_id, numOfLike - 1);
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

const toggleLikeCmtController = async (req, res) => {
	const ERROR_HAPPEN_MESSAGE = 'đã có lỗi xảy ra';
	try {
		const { cmt_id, action } = req.body;
		const userLike = req.auth_decoded.ma_nguoi_dung;
		const numOfLike = req.body.CMT_POST_INFOR.numOfLike;
		// console.log('hehe',req.body.CMT_POST_INFOR);
		if (action == 'LIKE') {
			const likeProcess = await StatusPostModel.addLikeCmtPost(
				cmt_id,
				userLike
			);
			if (likeProcess.status != 200) throw new Error(ERROR_HAPPEN_MESSAGE);

			const likeInfor = await StatusPostModel.getLikeCmtPostInfor(
				userLike,
				cmt_id
			).then((data) => data.payload[0]);
			await StatusPostModel.updateNumOfLikeCmtPost(cmt_id, numOfLike + 1);
			res.status(200).json(new Response(200, likeInfor, 'like thành công'));

			return;
		} else {
			const removeLikeProcess = await StatusPostModel.removeLikeCmtPost(
				cmt_id,
				userLike
			);
			if (removeLikeProcess.status != 200)
				throw new Error(ERROR_HAPPEN_MESSAGE);
			// update the num of like;
			await StatusPostModel.updateNumOfLikeCmtPost(cmt_id, numOfLike - 1);
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

const replyCmtController = async (req, res) => {
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
	const replyProcess = await StatusPostModel.addReplyComment(reply_data);
	if (replyProcess.status != 200) {
		res.status(400).json(new Response(400, [], 'đã có lỗi xảy ra', 300, 300));
		return;
	}
	await StatusPostModel.updateNumOfCommentCmtPost(cmt_id, numOfReply + 1);
	const insertedReply = await StatusPostModel.getReplyCommentById(
		replyProcess.payload.insertedId.toString()
	);
	res
		.status(200)
		.json(new Response(200, insertedReply.payload[0], 'reply thành công'));
	return;
};

const getAllCmtController = async (req, res) => {
	const post_id = req.query.post_id;
	const comments = await StatusPostModel.getAllCmtByPostId(post_id)
		.then((data) => data.payload)
		.catch((err) => []);
	const data = {
		comments,
		numOfComments: comments.length,
		numOfRemain: 0,
	};
	res.status(200).json(new Response(200, data, 'lấy dữ liệu thành công'));
};

const getCmtStartFromController = async (req, res) => {
	const { post_id, index, num } = req.query;
	const AllComments = await StatusPostModel.getAllCmtByPostId(post_id)
		.then((data) => data.payload)
		.catch((err) => []);
	if (AllComments.length <= 0) {
		res.status(200).json(
			new Response(
				200,
				{
					comments: [],
					numOfComments: 0,
					numOfRemain: 0,
				},
				''
			)
		);
		return;
	}
	if (typeof num == 'undefined') {
		const comments = AllComments.slice(index);
		const data = {
			comments,
			numOfComments: comments.length,
			numOfRemain: 0,
		};

		res.status(200).json(new Response(200, data, 'lấy dữ liệu thành công'));
		return;
	} else {
		const comments = AllComments.slice(index, index + num);
		const data = {
			comments,
			numOfComments: comments.length,
			numOfRemain:
				AllComments.length <= index + num
					? 0
					: AllComments.length - (index + num),
		};
		res.status(200).json(new Response(200, data, 'lấy dữ liệu thành công'));
		return;
	}
};

const getAllReplyController = async (req, res) => {
	const cmt_id = req.query.cmt_id;
	const replies = await StatusPostModel.getAllReplyCommentByCmtId(cmt_id)
		.then((data) => data.payload)
		.catch((err) => []);
	const data = {
		replies,
		numOfReplies: replies.length,
		numOfRemain: 0,
	};
	res.status(200).json(new Response(200, data, 'lấy phản hồi thành công'));
};

const getReplyStartFromController = async (req, res) => {
	const { cmt_id, index, num } = req.query;
	const AllReplies = await StatusPostModel.getAllReplyCommentByCmtId(cmt_id)
		.then((data) => data.payload)
		.catch((err) => []);
	if (AllReplies.length <= 0) {
		res.status(200).json(
			new Response(200, {
				replies: [],
				numOfReplies: 0,
				numOfRemain: 0,
			})
		);
		return;
	}
	if (typeof num == 'undefined') {
		const replies = AllReplies.slice(index);
		const data = {
			replies,
			numOfReplies: replies.length,
			numOfRemain: 0,
		};
		res.status(200).json(new Response(200, data, 'lấy phản hồi thành công'));
		return;
	} else {
		const replies = AllReplies.slice(index, index + num);
		const data = {
			replies,
			numOfReplies: replies.length,
			numOfRemain:
				AllReplies.length <= index + num
					? 0
					: AllReplies.length - (index + num),
		};
		res.status(200).json(new Response(200, data, 'lấy dữ liệu thành công'));
		return;
	}
};

const getPostController = async (req,res)=>{
	const {post_id} = req.query;
	const postData =await StatusPostModel.getPostById(post_id).then(data=>data.payload);
	const owner_infor = await userHelper.getUserPublicInforByUserId(postData[0].owner_id);
	const data = {
		...postData[0],
		owner_infor
	}
	res.status(200).json(new Response(200,data,'lấy dữ liệu thành công'));


}

const getPostStartFromController= async (req,res)=>{
	const {index,num} = await req.query;
	const AllPost = await StatusPostModel.getAllPost()
	.then((data) => data.payload)
	.catch((err) => []);
	if(AllPost.length <= 0 ||AllPost.length<=index ){
		const data = {
			posts:[],
			numOfPosts: posts.length,
			numOfRemain: 0,
		};
		res.status(200).json(
			new Response(200, data,'lấy dữ liệu thành công')
		);
		return;
	}
	if (typeof num == 'undefined') {
		const posts = AllPost.slice(index);
		const data = {
			posts,
			numOfPosts: posts.length,
			numOfRemain: 0,
		};
		res.status(200).json(new Response(200, data, 'lấy dự liệu thành công'));
		return;
	} else {
		const posts = AllPost.slice(index, index + num);
		const data ={
			posts,
			numOfPosts:posts.length,
			numOfRemain:
			AllPost.length <= index + num
			? 0
			: AllPost.length - (index + num),
		}
		res.status(200).json(new Response(200, data, 'lấy dữ liệu thành công'));
		return;
	}
}

module.exports = {
	addPostController,
	toggleLikePostController,
	addCommentController,
	toggleLikeCmtController,
	replyCmtController,
	getAllCmtController,
	getCmtStartFromController,
	getAllReplyController,
	getReplyStartFromController,
	getPostController,
	getPostStartFromController,
};