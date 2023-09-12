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
<<<<<<< HEAD

// định tuyến cho bài biết
router.use('/post', postRoutes); 
=======
router.use('/post',requireLogined,postRoutes)
>>>>>>> 480b2941782e58795db1e4c0784ffea293895900
module.exports = router;
