const { Response } = require('./../utils/index');
const notificationModel = require('./../models/thongbao/notificationModel');

const getAllNotification = async (req, res) => {};

const getNotiByIndexAndRange = async (req, res) => {
	const user_id = req.auth_decoded.ma_nguoi_dung;
	const { index, num } = req.body;
	const notifications = await notificationModel
		.getNotificationByIndexAndRange(user_id, index, num)
		.then((data) => data.payload);
	const neededNotifications = notifications.slice(index, index + num);
	res.status(200).json(new Response(200, neededNotifications, ''));
};

const getNotiBefore = async (req, res) => {
	const user_id = req.auth_decoded.ma_nguoi_dung;
	const { before, num } = req.body;
	const notifications = await notificationModel
		.getNotificationBeforeTime(user_id, before, num)
		.then((data) => data.payload);
		console.log(notifications);
	res.status(200).json(new Response(200, notifications, ''));
};

const markAsRead = async (req, res) => {
	const notif_id = req.body.notif_id;
	await notificationModel.updateNotificationhasReadField(notif_id, true);
	const notif_after_update = await notificationModel
		.getNotificationById(notif_id)
		.then((data) => data.payload);
	console.log(notif_after_update);
	res
		.status(200)
		.json(new Response(200, notif_after_update, 'đánh dấu đã đọc thành công'));
};

const markAllAsRead = async (req, res) => {
	const user_id = req.auth_decoded.ma_nguoi_dung;
	const data = await notificationModel.markAllUnReadNotifToRead(user_id);
	res.status(200).json(new Response(200, data, 'cập nhật thành công'));
};
module.exports = {
	getAllNotification,
	getNotiByIndexAndRange,
	getNotiBefore,
	markAsRead,
	markAllAsRead,
};
