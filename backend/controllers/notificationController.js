const { Response } = require('./../utils/index');
const notificationModel = require('./../models/thongbao/notificationModel');
const getAllNotification = async (req, res) => {};
const getNotiByIndexAndRange = async (req, res) => {
	const user_id = req.auth_decoded.ma_nguoi_dung;
	let { index, num } = req.body;
	index = parseInt(index);
	num = parseInt(num);
	const notifications = await notificationModel
		.getNotificationByIndexAndRange(user_id, index, num)
		.then((data) => data.payload);
	const neededNotifications = notifications.slice(index, index + num);
	res.status(200).json(new Response(200, neededNotifications, ''));
};

module.exports = {
	getAllNotification,
	getNotiByIndexAndRange,
};
