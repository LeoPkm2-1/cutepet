var express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const giongLoaiRoutes = require('./giongLoaiRoutes');
const postRoutes = require('./postRoutes');
const userControler = require('./../controllers/userControllers');
const { requireLogined, nonRequireLogined } = require('../middlewares/auth');
const { handlLogin } = require('./../controllers/loginController');
const { handleLogout } = require('./../controllers/logoutController');
const { handleRegister } = require('./../controllers/registerController');

// đăng nhập - dăng ký
router.use(['/login', '/register'], nonRequireLogined);
router.post('/login', handlLogin);
router.post('/register', handleRegister);
// đăng xuất
router.get('/logout', requireLogined, handleLogout);

// định tuyến cho người dùng
router.use('/user', userRoutes);
router.use('/pet', petRoutes);
router.use('/giongloai', giongLoaiRoutes);
router.use('/post',requireLogined,postRoutes)
module.exports = router;
