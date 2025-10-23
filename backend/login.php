<?php
session_start();

// Koneksi database
$servername = "localhost";
$username = "root"; // sesuaikan
$password = "";     // sesuaikan
$dbname = "fulfillin";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

$email = $_POST['email'] ?? '';
$password_input = $_POST['password'] ?? '';

if (!$email || !$password_input) {
  echo "Data tidak lengkap";
  exit;
}

// Ambil data user + role + verified + active
$stmt = $conn->prepare("SELECT id, password, role, verified, active FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo "Email tidak terdaftar.";
  exit;
}

$user = $result->fetch_assoc();

// Cek password
if (!password_verify($password_input, $user['password'])) {
  echo "Password salah.";
  exit;
}

// Cek verifikasi email
if ($user['verified'] != 1) {
  echo "Akun belum terverifikasi. Silakan cek email untuk kode OTP.";
  exit;
}

// Cek aktivasi oleh tim Fulfillin
if ($user['active'] != 1) {
  echo "Akun belum diaktifkan oleh tim Fulfillin. Mohon tunggu konfirmasi dari tim.";
  exit;
}

// Semua OK -> login
$_SESSION['user_id'] = $user['id'];
$_SESSION['email'] = $email;
$_SESSION['role'] = $user['role'];

echo $user['role'];
$conn->close();
?>