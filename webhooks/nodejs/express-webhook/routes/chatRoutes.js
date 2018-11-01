var express = require("express");
var router = express.Router();
var chatController = require("../controllers/chatController");



// URL: <app>/chat
router.get('/', chatController.index)

// Demo to show off the real-time nature of TalkJS a basic group chat example
// URL: <app>/chat/dual
router.get("/dual", chatController.dual);


module.exports = router;