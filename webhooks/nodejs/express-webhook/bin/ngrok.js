var ngrok = require("ngrok");
var clipboardy = require("clipboardy");
var util = require("../util/helpers");

//Start Ngrok
(async function () {
    try {
        var port = util.normalizePort(process.env.PORT || "3000");
        const url = await ngrok.connect(port);
        const webhookUrl = `${url}/talkjs/webhook/`



        console.log(`Chat example: ${url}/chat?me=Sebastian&other=Alice`);
        console.log(`Dual Chat example: ${url}/chat/dual`);
        console.log(`Inspector URL: http://127.0.0.1:4040 \n`);
        console.log(`Webhook URL: ${webhookUrl}`);

        clipboardy.writeSync(webhookUrl);
    } catch(e) {
        console.error(e);
    }
})();