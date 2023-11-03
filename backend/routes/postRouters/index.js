var express = require("express");
const router = express.Router();
const statusPostRoutes = require("./statusRoutes");
const informativenessRoutes = require("./informativenessRoutes");
// statusPost router
router.use("/statusPost", statusPostRoutes);
// informative article
router.use("/informativeness", informativenessRoutes);
module.exports = router;
