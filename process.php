<?php
require_once 'config.php'; // Include your database configuration file

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from the request
    $playerName = isset($_POST["player_name"]) ? $_POST["player_name"] : "Anonymous"; // Default player name if not provided in the request
    $turns = isset($_POST["turns"]) ? $_POST["turns"] : "";
    $winner = isset($_POST["winner"]) ? $_POST["winner"] : "";

    // Sanitize inputs (you may need more validation depending on your requirements)
    $playerName = mysqli_real_escape_string($conn, $playerName);
    $turns = mysqli_real_escape_string($conn, $turns);
    $winner = mysqli_real_escape_string($conn, $winner);

    // Insert data into the database
    $sql = "INSERT INTO game_results (player_name, turns, winner) VALUES ('$playerName', '$turns', '$winner')";
    
    if (mysqli_query($conn, $sql)) {
        echo "Data stored successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
} else {
    echo "Invalid request method.";
}

// Close database connection
mysqli_close($conn);
?>
