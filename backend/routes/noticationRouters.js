const express = require('express');
const router = express.Router();
const notificationController = require('./../controllers/notificationController');
const notiMid = require('./../middlewares/nofificationMid');
router.get('/getAllNotification', (req, res) => {
	res.send('ahihi');
});

router.post(
	'/getNotificationStartFrom',
	notiMid.preProcessGetNotiStartFrom,
	notificationController.getNotiByIndexAndRange
);
// có chữ Z ở cuối cùng của string date là múi giờ +0, nếu không có là múi giờ local
// nếu muốn biểu thị múi giờ bất kỳ thì thay vì thêm vào Z để tạo múi giờ ko ta +<><>:<><> để biểu thị múi giờ bất kỳ
// vd :2023-10-16T13:34:12.735+08:00 là 13:34:12 ngày 16-10-2023 ở múi giờ +8
router.post(
	'/getNotificationBefore',
	notiMid.preProcessGetNotiUntil,
	notificationController.getNotiBefore
);

module.exports = router;
