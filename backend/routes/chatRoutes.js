const express = require("express");
const router = express.Router();
const chatController = require("./../controllers/chatController");
const chatMid = require("../middlewares/chatMid");

router.post("/test", (req, res) => {
  res.send("ahihi xin chào chatting nha");
});

router.post("/sendMessage", chatMid.sendMessageMid, chatController.sendMessage);
module.exports = router;
