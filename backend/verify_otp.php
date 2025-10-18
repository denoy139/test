<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fulfillin";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

$otp_input = $_POST['otp'] ?? '';

if (isset($_SESSION['otp']) && isset($_SESSION['email'])) {
  if ($otp_input == $_SESSION['otp']) {
    $email = $_SESSION['email'];

    $stmt = $conn->prepare("UPDATE users SET verified = 1 WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->close();

    unset($_SESSION['otp']);
    echo "verified";
  } else {
    echo "invalid";
  }
} else {
  echo "expired";
}
$conn->close();
?>