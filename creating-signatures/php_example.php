<?php

$key = 'the shared secret key here';
$message = 'the message to hash here';

// to lowercase hexits
hash_hmac('sha256', $message, $key);

// to base64
base64_encode(hash_hmac('sha256', $message, $key, true));

?>
