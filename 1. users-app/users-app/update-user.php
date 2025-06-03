<?php
$data = json_decode(file_get_contents('php://input'), true);
$index = $data['index'];
$user = $data['user'];
$users = json_decode(file_get_contents('users.json'), true);
$users[$index] = $user;
file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
?>