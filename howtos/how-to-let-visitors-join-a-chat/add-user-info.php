<?php

//SecretKey and AppId can both be found inside your TalkJS dashboard. https://talkjs.com/dashboard/
$secretKey = "";
$appId = "";

//Encodes the user userId and email as token and sends it with the rest of the data to the API.
//Saving the user and sending a system message to the conversation.
try {   
    $email = $_GET["email"];
    $id = $_COOKIE["talkjs-user-id"];
    setcookie("talkjs-user-email", $email, 0, "/", "");

    $user = [
        "id" => $id,
        "name" => $email ? strtok($email, '@') : "Visitor",
        "email" => [ $email ],
        "configuration" => "visitor"
    ];
    $userPath = 'users/' . $user["id"];

    $conversationId = "conv-" . $user["id"];
    //This is the system message the chat will receive once their email is set. This can be edited to your needs or omitted entirely.
    $sysMsg = [[
        "text" => "Great! We'll notify you on $email about new messages.",
        "type" => "SystemMessage"
    ]];
    $sysMsgPath = 'conversations/' . $conversationId . '/messages';

    $sysMsgHandle = _apiRequest('POST', $sysMsgPath, $sysMsg, $secretKey, $appId);
    $userHandle = _apiRequest('PUT', $userPath, $user, $secretKey, $appId);
    _curlExecParallel([$sysMsgHandle, $userHandle]);
} catch (Exception $e) {
    _respondWithError($e);
}

//IMPORTANT: The following functions are required for API calls and do not need to be edited
function _respondWithError($error) {
    $data = ["error" => $error];
    http_response_code(500);
    header("Content-Type: application/json;charset=utf-8");
    echo $data;
    return true;
}

function _curlExecParallel(array $handles) {
    $mh = curl_multi_init();
    foreach($handles as $handle) {
        curl_multi_add_handle($mh,$handle);
    }

    $running=null;
    do {
        curl_multi_exec($mh,$running);
    } while ($running > 0);

    foreach($handles as $handle) {
        curl_multi_remove_handle($mh, $handle);
        curl_close($handle);
    }
    curl_multi_close($mh);
}

// returns a prepared curl handle; either curl_exec it or use curl_multi_*
function _apiRequest($verb, $path, $data, $secretKey, $appId) {

    $url = 'https://api.talkjs.com' . '/' . 'v1' . '/' . $appId . '/' . $path;;
    $payload = json_encode($data);
    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $secretKey
    ];
    error_log("$verb $url: ". $payload);
    error_log("headers: ". json_encode($headers));
    echo $url;
    echo $payload;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $verb);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    return $ch;
}
?>