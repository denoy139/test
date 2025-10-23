<?php
session_start();

// Pastikan admin login
if (!isset($_SESSION['role']) || !in_array($_SESSION['role'], ['admin','superadmin'])) {
  http_response_code(403);
  echo "Forbidden";
  exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fulfillin";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

$user_id = $_GET['id'] ?? null;
if (!$user_id) {
  echo "invalid_request";
  exit;
}

// Activate user
$stmt = $conn->prepare("UPDATE users SET active = 1 WHERE id = ?");
$stmt->bind_param("i", $user_id);
if ($stmt->execute()) {
  $stmt->close();
  // (opsional) kirim notifikasi email ke user bahwa akun telah diaktifkan
  echo "activated";
} else {
  echo "error";
}
$conn->close();
?>
