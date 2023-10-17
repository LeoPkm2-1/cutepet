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
	res.status(200).json(new Response(200, notifications, ''));
};
module.exports = {
	getAllNotification,
	getNotiByIndexAndRange,
	getNotiBefore,
};
