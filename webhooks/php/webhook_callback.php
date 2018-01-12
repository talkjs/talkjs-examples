<?php
// Read more on https://talkjs.com/docs/Webhooks/Getting_Started.html
// Parse the request body as JSON

$input = file_get_contents("php://input");
$event = json_decode($input);

switch ($event->type) {
    case "message.sent":
        // save to the database etc.
        break;
    case "message.read":
        // update the message as read in your CRM/internal db etc.
        break;
    case "notification.triggered":
        // send a custom email somewhere
        break;
    default:
        // other events that you don't need falls here
        // save it or ignore it, according to your needs.
        break;
}
