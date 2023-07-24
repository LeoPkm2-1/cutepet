var express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const userControler = require("./../controllers/userControllers");
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");
const { handlLogin } = require("./../controllers/loginController");
const { handleLogout } = require("./../controllers/logoutController");

// đăng nhập - dăng ký
router.use(["/login", "/register"], nonRequireLogined);
router.post("/login", handlLogin);
router.post("/register", userControler.addUser);
// đăng xuất
router.get("/logout", requireLogined, handleLogout);

// định tuyến cho người dùng
router.use("/user", userRoutes);
module.exports = router;
