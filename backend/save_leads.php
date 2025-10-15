<?php
// Koneksi ke database
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "fulfillin";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data dari form
$nama = $_POST['fullname'] ?? '';
$email = $_POST['email'] ?? '';
$company = $_POST['company'] ?? '';
$no_telp = $_POST['no_telp'] ?? '';

// Validasi
if (!empty($nama) && !empty($email)) {
  $stmt = $conn->prepare("INSERT INTO leads (company, nama, email, no_telp) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $company, $nama, $email, $no_telp);

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