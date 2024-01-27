<?php
include "connect.php";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$unique_id = $_POST['unique_id'];
$movie_name = $_POST['movie_name'];

$sql = "DELETE FROM watchlist WHERE unique_id = '$unique_id' AND movie_name = '$movie_name'";
if ($conn->query($sql) === TRUE) {
    echo "Data deleted successfully";
} else {
    echo "Error deleting data: " . $conn->error;
}

}

$conn->close();




?>