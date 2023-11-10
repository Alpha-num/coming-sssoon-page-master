<?php
// Get the raw POST data
$postData = file_get_contents("php://input");

// Decode the JSON data
$data = json_decode($postData);

// Get the email from the data
$email = $data->email;

// TODO: Perform validation on the email if needed

// Store the email in the database (replace 'your_database_name' with your actual database name)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Escape the email to prevent SQL injection
$email = $conn->real_escape_string($email);

// Perform the SQL query to insert the email into the database
$sql = "INSERT INTO email_subscribers (Email) VALUES ('$email')";

if ($conn->query($sql) === TRUE) {
    $response = array("status" => "success", "message" => "Email stored successfully");
} else {
    $response = array("status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error);
}

// Close the database connection
$conn->close();

// Return a JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>