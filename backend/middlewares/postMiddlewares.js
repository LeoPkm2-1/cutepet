const { Response } = require('../utils');
const postModel = require('../models/postModel');
const postHelper = require('../utils/postHelper');
async function preProcessAddStatusPost(req, res, next) {
	const NOT_CONTENT_POST = `bài viết không được chấp nhận do không có nội dung`;
	const text = req.body.text;
	const media = req.body.media;
	let flag = 0;
	if (!text || Object.keys(text).length == 0 || text.length == 0) {
		flag += 1;
	}
	if (
		!media ||
		Object.keys(media).length == 0 ||
		media.length == 0 ||
		!('type' in media) ||
		!('data' in media)
	) {
		flag += 1;
	}

	if (flag == 2) {
		res.status(400).json(new Response(400, [], NOT_CONTENT_POST, 300, 300));
	}

	next();
}

async function preProcessLikeStatusPost(req, res, next) {
	const { post_id } = req.body;
	const data = await postModel.getStatusPostById(post_id);
	if (data.payload.length <= 0) {
		res.status(400).json(
			new Response(400, 'Bài viết không tồn tại', 300, 300, 300)
		);
		return;
	}
	const userId = req.auth_decoded.ma_nguoi_dung;
	const hasLiked  = await postHelper.hasUserLikeTheStatusPost(userId,post_id)
	req.body.action = hasLiked?'REMOVE_LIKE':'LIKE';
	next();
	return;
}

module.exports = {
	preProcessAddStatusPost,
	preProcessLikeStatusPost,
};
