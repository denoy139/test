<?php
// Koneksi ke database
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "form_leads";

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
$pesan = $_POST['message'] ?? '';

// Validasi
if (!empty($nama) && !empty($email)) {
  $stmt = $conn->prepare("INSERT INTO kontak (nama, email, company, pesan) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $nama, $email, $company, $pesan);

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