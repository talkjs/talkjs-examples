<?php

$key = 'YOUR_SECRET_KEY ';
$userID = 'YOUR_USER_ID';

// to lowercase hexits
hash_hmac('sha256', $userID, $key);

?>
