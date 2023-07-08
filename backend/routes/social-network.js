var express = require("express");
var router = express.Router();

router.get("/all", function (req, res, next) {
  res.send("all" );
});
router.post("/", function (req, res, next) {
  res.send("logout");

  //nhận dữ liệu từ edit để cập nhật vào db
});
router.get("/info", function (req, res) {
  var id = req.params.id;
  res.send("info");
});

module.exports = router;
