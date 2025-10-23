<?php
session_start();

// === Konfigurasi Database ===
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fulfillin";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

// === Ambil Data Form ===
$email = $_POST['email'] ?? '';
$store_name = $_POST['store_name'] ?? '';
$phone = $_POST['phone'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$store_name || !$phone || !$password) {
  echo "error: data tidak lengkap";
  exit;
}

// === Cek Email Sudah Ada Belum ===
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
  echo "email_exists";
  exit;
}
$check->close();

// === Simpan User Belum Diverifikasi ===
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (email, store_name, phone, password, verified) VALUES (?, ?, ?, ?, 0)");
$stmt->bind_param("ssss", $email, $store_name, $phone, $hashed_password);
$stmt->execute();
$stmt->close();

// === Generate OTP ===
$otp = rand(100000, 999999);
$_SESSION['otp'] = $otp;
$_SESSION['email'] = $email;

// === PHPMailer ===
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ✅ PERBAIKAN PATH: naik 1 folder ke vendor
require __DIR__ . '/../vendor/autoload.php';

// === Kirim Email OTP ===
$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'fulfillinverify@gmail.com'; // GANTI
  $mail->Password = 'rdprnqmvswlgtqsl'; // GANTI dengan App Password Gmail
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;

  $mail->setFrom('fulfillinverify@gmail.com', 'Fulfillin');
  $mail->addAddress($email);
  $mail->isHTML(true);
  $mail->Subject = 'Kode Verifikasi Fulfillin Anda';
  $mail->Body = "
    <h3>Kode OTP Verifikasi Anda</h3>
    <p>Masukkan kode berikut untuk verifikasi email Anda:</p>
    <h2 style='color:#c8102e;'>$otp</h2>
    <p>Kode ini berlaku selama 5 menit.</p>
  ";

  $mail->send();
  echo "success";

} catch (Exception $e) {
  error_log("Mailer Error: {$mail->ErrorInfo}");
  echo "error: gagal mengirim OTP ke email";
}

$conn->close();
?>