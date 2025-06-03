<?php
$data = json_decode(file_get_contents('php://input'), true);
$index = $data['index'];
$users = json_decode(file_get_contents('users.json'), true);
array_splice($users, $index, 1);
file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
?>