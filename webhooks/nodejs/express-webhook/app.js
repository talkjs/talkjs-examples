require("dotenv").config()
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

// bodyParser trick to ensure we get access to the raw request body, taken from
// https://flaviocopes.com/express-get-raw-body/
app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
}));
app.use(express.urlencoded({
    extended: false
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Set your TalkJS appId in the .env file
// Your appId can be found on your TalkJS Dashboard: https://talkjs.com/dashboard/
const appId = process.env.APPID;

// Make the appId accessible in all views
app.use((req, res, next) => {
    app.locals.appId = appId;
    next();
})

// Import our routes for the chat and webhooks
var chatRoutes = require("./routes/chatRoutes");
var webhookRoutes = require("./routes/webhooks");

// Apply the routes for the appropriate paths
app.use("/chat", chatRoutes);
app.use("/talkjs", webhookRoutes);

module.exports = app;