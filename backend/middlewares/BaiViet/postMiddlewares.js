const { Response } = require('../../utils');
const statusPostModel = require('../../models/BaiViet/StatusPostModel');
const postHelper = require('../../utils/postHelper');

async function preProcessAddPost(req, res, next) {
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
async function checkPostExistMid(req, res, next) {
	let post_id = undefined;
	if (req.method === 'GET') {
		post_id = req.query.post_id;
	} else if (req.method === 'POST') {
		post_id = req.body.post_id;
	}
	const data = await statusPostModel.getPostById(post_id);
	if (data.payload.length <= 0) {
		res
			.status(400)
			.json(new Response(400, 'Bài viết không tồn tại', 300, 300, 300));
		return;
	}
	req.body.STATUS_POST_INFOR = data.payload[0];
	next();
}
// middleware kiểm tra sự tồn tại của cmt của status post. Nếu tồn tại thì gọi next() nếu không thì trả về http respone phản hồi bình luận không tồn tại
async function checkCmtPostExistMid(req, res, next) {
	let cmt_id = undefined;
	if (req.method === 'GET') {
		cmt_id = req.query.cmt_id;
	} else if (req.method === 'POST') {
		cmt_id = req.body.cmt_id;
	}
	// const { cmt_id } = req.body;
	const data = await statusPostModel.getCommentPostById(cmt_id);
	if (data.payload.length <= 0) {
		res
			.status(400)
			.json(new Response(400, 'Bình luật không tồn tại', 300, 300, 300));
		return;
	}
	req.body.CMT_POST_INFOR = data.payload[0];
	next();
}

// midlleware kiểm tra sự tồn tại của reply của status post
async function checkReplyPostExistMid(req, res, next) {
	const reply_id = req.method == 'GET' ? req.query.reply_id : req.body.reply_id;
	const data = await statusPostModel.getReplyCommentById(reply_id);
	if (data.payload.length <= 0) {
		res
			.status(400)
			.json(new Response(400, 'Phản hồi không tồn tại', 300, 300, 300));
		return;
	}
	req.body.REPLY_POST_INFOR = data.payload[0];
	next();
}

async function preProcessUpdateReplyPost(req, res, next) {
	const content = req.body.content;
	const oldReplyInfor = req.body.REPLY_POST_INFOR;
	if (req.auth_decoded.ma_nguoi_dung != oldReplyInfor.replyBy) {
		res
			.status(400)
			.json(
				new Response(
					400,
					'Bạn không có quyền chỉnh sửa phản hồi này',
					300,
					300,
					300
				)
			);
		return;
	} else if (
		typeof content === 'undefined' ||
		content === null ||
		content == ''
	) {
		res
			.status(400)
			.json(
				new Response(
					400,
					'Nội dung thay đổi của phản hồi không hợp lệ',
					300,
					300,
					300
				)
			);
		return;
	}
	next();
}

async function preProcessUpdateCmtPost(req, res, next) {
	const content = req.body.content;
	const oldCmtInfor = req.body.CMT_POST_INFOR;
	if (req.auth_decoded.ma_nguoi_dung != oldCmtInfor.commentBy) {
		res
			.status(400)
			.json(
				new Response(
					400,
					'Bạn không có quyền chỉnh sửa bình luận này',
					300,
					300,
					300
				)
			);
		return;
	} else if (
		typeof content === 'undefined' ||
		content === null ||
		content == ''
	) {
		res
			.status(400)
			.json(
				new Response(
					400,
					'Nội dung thay đổi của bình luận không hợp lệ',
					300,
					300,
					300
				)
			);
		return;
	}
	next();
}

// middleware tiền xử lý khi toggle like bài viết chia sẻ trạng thái, giả sử KHI bài viết đã TỒN TẠI
async function preProcessLikePost(req, res, next) {
	const { post_id } = req.body;
	const userId = req.auth_decoded.ma_nguoi_dung;
	const hasLiked = await postHelper.hasUserLikeTheStatusPost(userId, post_id);
	req.body.action = hasLiked ? 'REMOVE_LIKE' : 'LIKE';
	next();
	return;
}

async function preProcessLikeCmtPost(req, res, next) {
	const { cmt_id } = req.body;
	const userId = req.auth_decoded.ma_nguoi_dung;
	const hasLiked = await postHelper.hasUserLikeTheCmtStatusPost(userId, cmt_id);
	req.body.action = hasLiked ? 'REMOVE_LIKE' : 'LIKE';
	next();
	return;
}

async function preProcessCmtPost(req, res, next) {
	const comment = req.body.comment;
	if (typeof comment != 'string' || comment == '') {
		res
			.status(400)
			.json(new Response(400, [], 'Bình luận không được để trống', 300, 300));
	}
	next();
}
async function preProcessRelyCmtPost(req, res, next) {
	const reply = req.body.reply;
	if (typeof reply != 'string' || reply == '') {
		res
			.status(400)
			.json(
				new Response(
					400,
					[],
					'Phản hội Bình luận không được để trống',
					300,
					300
				)
			);
	}
	next();
}

async function preProcessGetCmtPost(req, res, next) {
	const VALID_PARAM = 'tham số không hợp lệ';
	let { post_id, index, num } = req.query;
	try {
		index = parseInt(index);
		if (Number.isNaN(index) || index < 0) {
			throw new Error(VALID_PARAM);
		}
		if (typeof num != 'undefined' && Number.isNaN(parseInt(num))) {
			throw new Error(VALID_PARAM);
		}

		num = typeof num == 'undefined' ? undefined : parseInt(num);
		if (num <= 0) throw new Error(VALID_PARAM);
		req.query.index = index;
		req.query.num = num;
	} catch (error) {
		res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
		return;
	}
	// console.log('after:', req.query);
	next();
}

async function preProcessGetReplyOfCmtPost(req, res, next) {
	const VALID_PARAM = 'tham số không hợp lệ';
	let { cmt_id, index, num } = req.query;
	try {
		index = parseInt(index);
		if (Number.isNaN(index) || index < 0) {
			throw new Error(VALID_PARAM);
		}
		if (typeof num != 'undefined' && Number.isNaN(parseInt(num))) {
			throw new Error(VALID_PARAM);
		}
		num = typeof num == 'undefined' ? undefined : parseInt(num);
		if (num <= 0) throw new Error(VALID_PARAM);
		req.query.index = index;
		req.query.num = num;
	} catch (error) {
		res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
		return;
	}
	next();
}

async function preProcessDeleteReplyOFCmt(req, res, next) {
	const replyBeforeDelete = req.body.REPLY_POST_INFOR;
	if (req.auth_decoded.ma_nguoi_dung != replyBeforeDelete.replyBy) {
		res
			.status(400)
			.json(
				new Response(400, [], 'Bạn không có quyền xóa phản hồi này', 300, 300)
			);
		return;
	}
	next();
}

module.exports = {
	preProcessAddPost,
	preProcessLikePost,
	checkPostExistMid,
	preProcessCmtPost,
	checkCmtPostExistMid,
	checkReplyPostExistMid,
	preProcessLikeCmtPost,
	preProcessRelyCmtPost,
	preProcessGetCmtPost,
	preProcessGetReplyOfCmtPost,
	preProcessUpdateReplyPost,
	preProcessUpdateCmtPost,
	preProcessDeleteReplyOFCmt,
};
