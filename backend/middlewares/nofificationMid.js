const { Response } = require('./../utils');
const utilHelper = require('./../utils/UtilsHelper');
const notificationModel = require('./../models/thongbao/notificationModel');
const notifiHelper = require('./../utils/thongbao');

function preProcessGetNotiStartFrom(req, res, next) {
	const VALID_PARAM = 'tham số không hợp lệ';
	let { index, num } = req.body;
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
		req.body.index = index;
		req.body.num = num;
	} catch (error) {
		res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
		return;
	}
	next();
}

function preProcessGetNotiUntil(req, res, next) {
	const VALID_PARAM = 'tham số không hợp lệ';
	let { before, num } = req.body;
	try {
		if (!utilHelper.isDateValid(new Date(before))) {
			throw new Error(VALID_PARAM);
		}
		if (typeof num != 'undefined' && Number.isNaN(parseInt(num))) {
			throw new Error(VALID_PARAM);
		}
		num = typeof num == 'undefined' ? undefined : parseInt(num);
		if (num <= 0) throw new Error(VALID_PARAM);
		req.body.before = new Date(before);
		req.body.num = num;
	} catch (error) {
		res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
		return;
	}
	next();
}

async function preProcessNotification(req, res, next) {
	const NOT_EXIST_NOTIFICATION = 'thông báo không tồn tại';
	const NOT_HAVE_RIGHT = 'bạn không có quyền';
	const notif_id = req.body.notif_id;
	try {
		const isExist = await notifiHelper.checkNotificationExistById(notif_id);
		if (!isExist) throw new Error(NOT_EXIST_NOTIFICATION);
		req.body.NOTIFICATION_INFOR = await notificationModel
			.getNotificationById(notif_id)
			.then((data) => data.payload);

		const user_id = req.auth_decoded.ma_nguoi_dung;
		const notif_owner_id = req.body.NOTIFICATION_INFOR.receiver_id;
		if (user_id != notif_owner_id) throw new Error(NOT_HAVE_RIGHT);
	} catch (error) {
		if (error.message == NOT_EXIST_NOTIFICATION) {
			res
				.status(400)
				.json(new Response(400, [], NOT_EXIST_NOTIFICATION, 300, 300));
			return;
		} else if (error.message == NOT_HAVE_RIGHT) {
			res.status(400).json(new Response(400, [], NOT_HAVE_RIGHT, 300, 300));
			return;
		}
	}
	next();
}

module.exports = {
	preProcessGetNotiStartFrom,
	preProcessGetNotiUntil,
	preProcessNotification,
};
