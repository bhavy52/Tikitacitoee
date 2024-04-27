<?php
// Database connection details
$servername = "localhost"; // Change this to your MySQL server hostname
$username = "your_username"; // Change this to your MySQL username
$password = "your_password"; // Change this to your MySQL password
$dbname = "your_database_name"; // Change this to the name of your MySQL database

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
