<?php 
include 'connect.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

$unique_id = $_POST['unique_id'];
$movie_name = $_POST['movie_name'];
$movie_img = $_POST['movie_img'];

$sqlCheckDuplicate = "SELECT * FROM watchlist WHERE unique_id = '$unique_id' AND movie_name = '$movie_name' AND movie_img = '$movie_img'";
$result = $conn->query($sqlCheckDuplicate);
echo $result->num_rows;
if ($result->num_rows > 0) {
    echo "Row with the same values already exists. Data not inserted.";
} else {
    $sql = "INSERT INTO `watchlist`(`unique_id`, `movie_name`, `movie_img`) VALUES ('$unique_id','$movie_name','$movie_img')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

}

$conn->close();

?>