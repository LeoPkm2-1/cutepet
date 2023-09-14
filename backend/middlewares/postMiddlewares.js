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

// middleware kiểm tra sự tồi tại của bài viết chia sẽ trạng thái. Nếu tồn tại thì gọi next() nếu không thì trả về http respone phản hồi bài viết không tồn tại
async function checkStatusPostExistMid(req,res,next) {
	const { post_id } = req.body;
	const data = await postModel.getStatusPostById(post_id);
	if (data.payload.length <= 0) {
		res.status(400).json(
			new Response(400, 'Bài viết không tồn tại', 300, 300, 300)
		);
		return;
	}
	req.body.STATUS_POST_INFOR = data.payload[0];
	next();
	
}
// middleware kiểm tra sự tồn tại của cmt của status post. Nếu tồn tại thì gọi next() nếu không thì trả về http respone phản hồi bình luận không tồn tại
async function checkCmtStatusPostExistMid(req,res,next) {
	const { cmt_id } = req.body;
	const data = await postModel.getCommentStatusPostById(cmt_id);
	if (data.payload.length <= 0) {
		res.status(400).json(
			new Response(400, 'Bình luật không tồn tại', 300, 300, 300)
		);
		return;
	}
	req.body.CMT_POST_INFOR = data.payload[0];
	next();
	
}

// middleware tiền xử lý khi toggle like bài viết chia sẻ trạng thái, giả sử KHI bài viết đã TỒN TẠI
async function preProcessLikeStatusPost(req, res, next) {
	const { post_id } = req.body;
	const userId = req.auth_decoded.ma_nguoi_dung;
	const hasLiked  = await postHelper.hasUserLikeTheStatusPost(userId,post_id)
	req.body.action = hasLiked?'REMOVE_LIKE':'LIKE';
	next();
	return;
}

async function preProcessLikeCmtStatusPost(req, res, next) {
	const { cmt_id } = req.body;
	const userId = req.auth_decoded.ma_nguoi_dung;
	const hasLiked  = await postHelper.hasUserLikeTheCmtStatusPost(userId,cmt_id)
	req.body.action = hasLiked?'REMOVE_LIKE':'LIKE';
	next();
	return;
}

async function preProcessCmtStatusPost(req,res,next) {
	const comment = req.body.comment;
	if(typeof comment!='string'||comment=='' ){
		res.status(400).json(new Response(400, [], 'Bình luận không được để trống', 300, 300))
	}
	next();
}
async function preProcessRelyCmtStatusPost(req,res,next){
	const reply = req.body.reply;
	if(typeof reply!='string'||reply=='' ){
		res.status(400).json(new Response(400, [], 'Phản hội Bình luận không được để trống', 300, 300))
	}
	next();
}

module.exports = {
	preProcessAddStatusPost,
	preProcessLikeStatusPost,
	checkStatusPostExistMid,
	preProcessCmtStatusPost,
	checkCmtStatusPostExistMid,
	preProcessLikeCmtStatusPost,
	preProcessRelyCmtStatusPost
};
