<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fulfillin"; // ganti jika database berbeda

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}

$email = $_POST['email'] ?? '';
$store_name = $_POST['store_name'] ?? '';
$phone = $_POST['phone'] ?? '';
$password = $_POST['password'] ?? '';

if (!empty($email) && !empty($store_name) && !empty($phone) && !empty($password)) {
  // Enkripsi password
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // Simpan ke tabel user
  $stmt = $conn->prepare("INSERT INTO users (email, store_name, phone, password) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $email, $store_name, $phone, $hashed_password);

  if ($stmt->execute()) {
    echo "success";
  } else {
    echo "error: " . $conn->error;
  }

  $stmt->close();
} else {
  echo "error: data tidak lengkap";
}

$conn->close();
?>
