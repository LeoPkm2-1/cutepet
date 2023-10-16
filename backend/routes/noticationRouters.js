const express = require('express');
const router = express.Router();
const notificationController = require('./../controllers/notificationController')

router.get('/getAllNotification', (req, res) => {
	res.send('ahihi');
});

router.post('/getNotificationStartFrom',notificationController.getNotiByIndexAndRange)

module.exports = router;
