var express = require("express");
var router = express.Router();
var webhookController = require("../controllers/webhookController");

router.post("/webhook", (req, res) => {
    let event = req.body;

    // Do something based on the Event type
    switch (event.type) {
        case "message.sent":
            webhookController.messageSent(req, res);
            break;

        case "message.read":
            webhookController.messageRead(req, res);
            break;

        case "user.created":
            webhookController.userCreated(req, res);
            break;

        default:
            webhookController.defaultHandler(req, res);
    }
})

module.exports = router;