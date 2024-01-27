<?php 
include "connect.php";


if(isset($_POST["email"]) && isset($_POST["password2"])){
  
  $email = $_POST["email"];
  $password = $_POST["password2"];
  $sql = "SELECT * FROM users WHERE email = '$email' AND password2 = '$password'";
  $result = $conn->query($sql);
    
  $user = $result->fetch_assoc();
  echo json_encode($user);
}

if (isset($_POST["unique_id"])) {
  $unique_id = $_POST["unique_id"];
  
  $usersQuery = "SELECT * FROM users WHERE unique_id = '$unique_id'";
  $usersResult = $conn->query($usersQuery);
  $user = $usersResult->fetch_assoc();
  
  $watchlistQuery = "SELECT * FROM watchlist WHERE unique_id = '$unique_id'";
  $watchlistResult = $conn->query($watchlistQuery);
  
  $usersData = json_encode($user);
  $watchlistData = array();
  
  while ($row = $watchlistResult->fetch_assoc()) {
      $watchlistData[] = $row;
  }
  
  $watchlistData = json_encode($watchlistData);
  
  // Combine the user and watchlist data into a single JSON object
  $combinedData = array(
      "user" => $usersData,
      "watchlist" => $watchlistData
  );
  
  echo json_encode($combinedData);
}

if (isset($_POST["searchUser"])) {
  $searchUser = $_POST["searchUser"];
  $sql = "SELECT * FROM users WHERE name = '$searchUser'";
  $result = $conn->query($sql);
  $users = array();
  while($userData = $result->fetch_assoc()){
    $users[] = $userData;
  }
  $users = json_encode($users);

echo $users;
  
}

if (isset($_POST["visit_unique_id"])) {
  $unique_id = $_POST["visit_unique_id"];
  
  $usersQuery = "SELECT * FROM users WHERE unique_id = '$unique_id'";
  $usersResult = $conn->query($usersQuery);
  $user = $usersResult->fetch_assoc();
  
  $watchlistQuery = "SELECT * FROM watchlist WHERE unique_id = '$unique_id'";
  $watchlistResult = $conn->query($watchlistQuery);
  
  $usersData = json_encode($user);
  $watchlistData = array();
  
  while ($row = $watchlistResult->fetch_assoc()) {
      $watchlistData[] = $row;
  }
  
  $watchlistData = json_encode($watchlistData);
  
  // Combine the user and watchlist data into a single JSON object
  $combinedData = array(
      "user" => $usersData,
      "watchlist" => $watchlistData
  );
  
  echo json_encode($combinedData);
}


  
$conn->close();



?>