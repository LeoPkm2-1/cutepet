var express = require("express");
const router = express.Router();
const statusPostRoutes = require("./statusRoutes");
const articleRoutes = require("./articleRoutes");
// statusPost router
router.use("/statusPost", statusPostRoutes);
// informative article
router.use("/article", articleRoutes);
module.exports = router;
