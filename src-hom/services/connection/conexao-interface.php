<?php
$host = 'localhost';
$user = 'root';
$pass = 'Ln!4343@Cid';
$dbname = 'cadastros';
$port = 3306;

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
