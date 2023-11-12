const express = require('express');
const router = express.Router();
const { requireLogined, nonRequireLogined } = require('../middlewares/auth');
const userControler = require('../controllers/userControllers');
const {
	handleConfirmRegister,
} = require('./../controllers/registerController');

// router.get("/all", userControler.getAllUser);
router.post('/confirmRegister', handleConfirmRegister);
router.use(requireLogined);
// get user infor by username
router.get('/infor/:username', userControler.userPublicInforByUserName);
// search user by username or name
router.post('/searchPeople', userControler.searchPeopleController);
// router.post('/searchPeopleByName', userControler.searchPeopleByNameController);

module.exports = router;
