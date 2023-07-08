var express = require("express");
var router = express.Router();
const userRoutes = require("./userRoutes");

// Router total
router.use("/user", userRoutes);
module.exports = router;
