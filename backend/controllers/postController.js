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
		res.status(400).json(
			new Response(400, [], 'đã có lỗi xảy ra', 300, 300)
		);
		return;
	}
	const insertedPost = await postModel.getStatusPostById(
		addProcess.payload.insertedId
	);
	res.status(200).json(
		new Response(200, insertedPost.payload, 'thêm thành công')
	);
	return;
};

const toggleLikeStatusController = async (req, res) => {
	const { post_id, action } = req.body;

	const userLike = req.auth_decoded.ma_nguoi_dung;
	if (action == 'LIKE') {
		const likeProcess = await postModel.addLikeStatusPost(
			post_id,
			userLike
		);
		if (likeProcess.status != 200) {
			res.status(400).json(
				new Response(400, [], 'đã có lỗi xảy ra', 300, 300)
			);
			return;
		}
		const likeInfor = await postModel.getUserLikeThePostInfor(userLike,post_id).then(data=>data.payload[0])
		res.status(200).json(new Response(200, likeInfor, 'like thành công'));
		return;
	}else {
		const removeLikeProcess = await postModel.removeLikeStatusPost(post_id,userLike);
		if (removeLikeProcess.status != 200) {
			res.status(400).json(
				new Response(400, [], 'đã có lỗi xảy ra', 300, 300)
			);
			return;
		}
		res.status(200).json(new Response(200, {
			postId:post_id,
		}, 'hủy like thành công'));
		return;
	}
};

const addCommentController = async (req, res) => {
	const comment = req.body.comment;
	const post_id = req.body.post_id;
	const commentBy = req.auth_decoded.ma_nguoi_dung;
	const commentAt = new Date();
};

module.exports = {
	addStatusPostController,
	toggleLikeStatusController,
};
