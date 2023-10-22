const notificationModel= require('./../models/thongbao/notificationModel')
async function checkNotificationExistById(notifications_id) {
	const notification = await notificationModel
		.getNotificationById(notifications_id)
		.then((data) => data.payload);
	if (notification == null) return false;
	return true;
}

module.exports = {
  checkNotificationExistById
}
