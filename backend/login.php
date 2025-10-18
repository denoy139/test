<?php
session_start();

$servername = "localhost";
$username = "root";       // sesuaikan jika pakai hosting
$password = "";           // sesuaikan jika pakai hosting
$dbname = "fulfillin";    // pastikan database sudah dibuat

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

$email = $_POST['email'] ?? '';
$password_input = $_POST['password'] ?? '';

if (!$email || !$password_input) {
  echo "Data tidak lengkap";
  exit;
}

$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo "Email tidak terdaftar.";
  exit;
}

$user = $result->fetch_assoc();

if (password_verify($password_input, $user['password'])) {
  $_SESSION['user_id'] = $user['id'];
  $_SESSION['email'] = $email;
  echo "success";
} else {
  echo "Password salah.";
}

$conn->close();
?>
