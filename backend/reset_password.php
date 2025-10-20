<?php
require 'config.php';
header('Content-Type: application/json');

if (!isset($_POST['token']) || !isset($_POST['password'])) {
  echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
  exit;
}

$token = $_POST['token'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

// cek token valid
$query = $conn->prepare("SELECT * FROM users WHERE reset_token = ? AND token_expire > NOW()");
$query->execute([$token]);
$user = $query->fetch();

if (!$user) {
  echo json_encode(['status' => 'error', 'message' => 'Token tidak valid atau sudah kadaluarsa']);
  exit;
}

// update password
$update = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, token_expire = NULL WHERE reset_token = ?");
$update->execute([$password, $token]);

echo json_encode(['status' => 'success', 'message' => 'Password berhasil diubah!']);
?>
