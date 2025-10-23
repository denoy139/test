<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fulfillin";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

$otp_input = $_POST['otp'] ?? '';

if (!isset($_SESSION['otp']) || !isset($_SESSION['email']) || !isset($_SESSION['user_id_temp'])) {
  echo "expired";
  exit;
}

// Cek expiry
if (time() > ($_SESSION['otp_expires'] ?? 0)) {
  unset($_SESSION['otp']);
  unset($_SESSION['otp_expires']);
  echo "expired";
  exit;
}

if ($otp_input == $_SESSION['otp']) {
  $email = $_SESSION['email'];
  // tandai verified = 1
  $stmt = $conn->prepare("UPDATE users SET verified = 1 WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->close();

  unset($_SESSION['otp']);
  unset($_SESSION['otp_expires']);
  // NOTE: Jangan unset user_id_temp/email jika mau tetap menunggu aktivasi admin.
  echo "verified";
} else {
  echo "invalid";
}
$conn->close();
?>