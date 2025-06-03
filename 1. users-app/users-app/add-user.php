<?php
$data = json_decode(file_get_contents('php://input'), true);
$users = json_decode(file_get_contents('users.json'), true);
$users[] = $data;
file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));
?>