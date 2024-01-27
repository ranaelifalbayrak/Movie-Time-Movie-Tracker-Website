<?php 
include 'connect.php';
$unique_id = uniqid("",true); 
$columns = "`id`, `" . implode("`, `", array_keys($_POST)) . "`, `unique_id`"; 
$values = "'', '" . implode("','", array_values($_POST)) . "', '$unique_id'"; 
$sql = "INSERT INTO `users` ($columns) VALUES ($values)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>