var express = require("express");
var router = express.Router();
const mediaControler = require("../controler/mediaControler");

router.get("/getAll", mediaControler.getAllMedia );
router.post("/addMedia", mediaControler.getAllMedia );


module.exports = router;
