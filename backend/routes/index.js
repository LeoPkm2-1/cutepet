var express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const petRoutes = require("./petRoutes");
const giongLoaiRoutes = require("./giongLoaiRoutes");
const postRoutes = require("./postRouters/index");
const friendRoutes = require("./friendRoutes");
const notificationRoutes = require("./noticationRouters");
const profileRoutes = require("./profileRoutes");
const shopRoutes = require("./shopRoutes");
const chatRoutes = require("./chatRoutes");
const performanceTestingRoutes = require("./performanceTestingRoutes");
const { requireLoginedForNormUser, nonRequireLogined } = require("../middlewares/auth");
const { handlLogin } = require("./../controllers/loginController");
const { handleLogout } = require("./../controllers/logoutController");
const {
  handleRegister,
  handleShopRegister,
  handleConfirmRegister,
} = require("./../controllers/registerController");
const {
  registerMid,
  shopRegistrationMid,
} = require("../middlewares/registerMid");

// đăng nhập - dăng ký
router.use(["/login", "/register", "/shopRegistration"], nonRequireLogined);
router.post("/login", handlLogin);
router.post("/register", registerMid, handleRegister);
router.post("/shopRegistration", shopRegistrationMid, handleShopRegister);
router.post("/confirmRegister", handleConfirmRegister);
// đăng xuất
router.get("/logout", requireLoginedForNormUser, handleLogout);

// định tuyến cho người dùng
router.use("/user", userRoutes);
router.use("/shop", shopRoutes);
router.use("/pet", petRoutes);
router.use("/giongloai", giongLoaiRoutes);
router.use("/post", requireLoginedForNormUser, postRoutes);
router.use("/friend", requireLoginedForNormUser, friendRoutes);
router.use("/notification", requireLoginedForNormUser, notificationRoutes);
router.use("/profile", requireLoginedForNormUser, profileRoutes);
router.use("/chatting", requireLoginedForNormUser, chatRoutes);
router.use("/performance_testing_purpose", performanceTestingRoutes);
router.post("/test_api", (req, res) => {
  const temp = req.body.temp;
  res.status(200).json({ temp: temp + " 111" });
});
module.exports = router;
