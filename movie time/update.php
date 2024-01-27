<?php
include "connect.php"; 

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $unique_id = $_POST["unique_id"];

    if (isset($_POST["newEmail"])&&strlen($_POST["newEmail"])) {
        $newEmail = $_POST["newEmail"];
        $sql = "UPDATE users SET email='$newEmail' WHERE unique_id='$unique_id'";
        $result=$conn->query($sql);
    } if (isset($_POST["newName"])&&strlen($_POST["newName"])) {
        $newName = $_POST["newName"];
        $sql = "UPDATE users SET name='$newName' WHERE unique_id='$unique_id'";
        $result=$conn->query($sql);
    } if (isset($_POST["newPassword"])&&strlen($_POST["newPassword"])) {
        $newPassword = $_POST["newPassword"];
        $sql = "UPDATE users SET password='$newPassword' WHERE unique_id='$unique_id'";
        $result=$conn->query($sql);
    } if (isset($_POST["newBirthdate"])&&strlen($_POST["newBirthdate"])) {
        $newBirthdate = $_POST["newBirthdate"];
        $sql = "UPDATE users SET birthdate='$newBirthdate' WHERE unique_id='$unique_id'";
        $result=$conn->query($sql);
    } 
      if (isset($_POST["newPhone"])&&strlen($_POST["newPhone"])) {
        $newPhone= $_POST["newPhone"];
        $sql = "UPDATE users SET phone='$newPhone' WHERE unique_id='$unique_id'";
        $result=$conn->query($sql);
    }}
    else {
        echo "Invalid field name";
        exit;
    }

    


$conn->close();
?>
