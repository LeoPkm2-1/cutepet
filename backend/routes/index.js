var express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const petRoutes = require("./petRoutes");
const giongLoaiRoutes = require("./giongLoaiRoutes");
const postRoutes = require("./postRouters/index");
const friendRoutes = require("./friendRoutes");
const notificationRoutes = require("./noticationRouters");
const profileRoutes = require("./profileRoutes");
const chatRoutes = require("./chatRoutes");
const performanceTestingRoutes = require("./performanceTestingRoutes");
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");
const { handlLogin } = require("./../controllers/loginController");
const { handleLogout } = require("./../controllers/logoutController");
const { handleRegister } = require("./../controllers/registerController");
const { registerMid } = require("../middlewares/registerMid");

// đăng nhập - dăng ký
// router.use(["/login", "/register"], nonRequireLogined);
router.post("/login", handlLogin);
router.post("/register", registerMid, handleRegister);
// đăng xuất
router.get("/logout", requireLogined, handleLogout);

// định tuyến cho người dùng
router.use("/user", userRoutes);
router.use("/pet", petRoutes);
router.use("/giongloai", giongLoaiRoutes);
router.use("/post", requireLogined, postRoutes);
router.use("/friend", requireLogined, friendRoutes);
router.use("/notification", requireLogined, notificationRoutes);
router.use("/profile", requireLogined, profileRoutes);
router.use("/chatting", requireLogined, chatRoutes);
router.use("/performance_testing_purpose", performanceTestingRoutes);
router.post("/test_api", (req, res) => {
  const temp = req.body.temp;
  res.status(200).json({ temp: temp + " 111" });
});
module.exports = router;
