<?php
$host = "localhost";
$user = "intranet";
$pass = "admin";
$dbname = "arquivo";
$port = 5432;
try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $pass);
   //echo "Connection to PostgreSQL database successful!";
} catch (PDOException $err) {
   //echo "Error: Connection to PostgreSQL database failed. Error message: " . $err->getMessage();
}
