// Add additional webhook logic here
exports.messageSent = (req, res) => {
    let event = req.body;
    console.log(`Message sent from "${event.data.message.senderId}" \nText: "${event.data.message.text}"\n`);
    // console.log(event)
    res.sendStatus(200);
}

exports.messageRead = (req, res) => {
    let event = req.body;
    console.log(`User "${event.data.recipient.id}" read a message from "${event.data.message.senderId}" \nText: "${event.data.message.text}"\n`);
    res.sendStatus(200);
}

exports.userCreated = (req, res) => {
    let event = req.body;
    console.log(`User created: ${event.data.user.id}`);
    res.sendStatus(200);
}

exports.defaultHandler = (req, res) => {
    let event = req.body;
    console.log(`Event "${event.type}" triggered\n`);
    res.sendStatus(200);
}

