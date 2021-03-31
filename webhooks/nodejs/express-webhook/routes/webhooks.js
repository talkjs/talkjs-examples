var express = require("express");
var crypto = require("crypto");
var router = express.Router();
var webhookController = require("../controllers/webhookController");

// Make sure to set a secret in the .env file
const secret = process.env.SECRET;


router.post("/webhook", (req, res) => {
    let event = req.body;

    if(!hasValidSignature(req)) {
        console.error("security error, signatures did not match!");
        return;   
    }

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
});

// as per https://talkjs.com/docs/Features/Security_Settings/Security_Recommendations.html#page_Webhook_Integrity
function hasValidSignature(req) {
    const eventSignature = req.header("X-TalkJS-Signature");
    const eventTimestamp = req.header("X-TalkJS-Timestamp");

    // note: `rawBody` is not a standard Express request field. It's set in app.js using body-parser.
    const requestBody = req.rawBody;

    const payload = Buffer.concat([
        Buffer.from(eventTimestamp + "."),
        requestBody
    ]);
    const payloadSignature = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex")
        .toUpperCase();

    return payloadSignature === eventSignature;    
}

module.exports = router;