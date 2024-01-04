const express = require("express");
const router = express.Router();
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");

router.post("/log_user", requireLogined, (req, res) => {
  const user = req.auth_decoded;
  res.status(200).json(user);
});

module.exports = router;
