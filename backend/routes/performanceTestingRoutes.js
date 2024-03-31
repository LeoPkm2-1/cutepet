const express = require("express");
const router = express.Router();
const { requireLoginedForNormUser, nonRequireLogined } = require("../middlewares/auth");

router.post("/log_user", requireLoginedForNormUser, (req, res) => {
  const user = req.auth_decoded;
  res.status(200).json(user);
});

module.exports = router;
