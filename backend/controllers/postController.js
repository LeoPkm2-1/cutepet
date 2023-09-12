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

const addCommentController = async (req, res) => {
	const comment = req.body.comment;
	const post_id = req.body.post_id;
	const commentBy = req.auth_decoded.ma_nguoi_dung;
    const commentAt = new Date();
};

module.exports = {
	addStatusPostController,
};
