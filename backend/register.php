<?php
session_start();

// === Konfigurasi Database ===
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fulfillin";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

// Ambil data
$email = $_POST['email'] ?? '';
$store_name = $_POST['store_name'] ?? '';
$phone = $_POST['phone'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$store_name || !$phone || !$password) {
  echo "error: data tidak lengkap";
  exit;
}

// Cek email sudah ada
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
  echo "email_exists";
  exit;
}
$check->close();

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user dengan verified=0, active=0
$stmt = $conn->prepare("INSERT INTO users (email, store_name, phone, password, verified, active) VALUES (?, ?, ?, ?, 0, 0)");
$stmt->bind_param("ssss", $email, $store_name, $phone, $hashed_password);
$ok = $stmt->execute();
if (!$ok) {
  echo "error: gagal menyimpan user";
  exit;
}
$user_id = $stmt->insert_id;
$stmt->close();

// Generate OTP (untuk verifikasi email)
$otp = rand(100000, 999999);
$_SESSION['otp'] = $otp;
$_SESSION['otp_expires'] = time() + 300; // 5 menit
$_SESSION['email'] = $email;
$_SESSION['user_id_temp'] = $user_id;

// Kirim email OTP ke user (PHPMailer)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require __DIR__ . '/../vendor/autoload.php';

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'fulfillinverify@gmail.com'; // GANTI
  $mail->Password = 'rdprnqmvswlgtqsl'; // GANTI: app password
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

} catch (Exception $e) {
  error_log("Mailer Error (user OTP): {$mail->ErrorInfo}");
  // jangan hentikan pendaftaran — user masih dibuat, tapi beri tahu frontend
  echo "error: gagal mengirim OTP ke email";
  exit;
}

// Opsional: Kirim notifikasi ke admin supaya tim tahu ada pendaftaran baru
try {
  $adminMail = new PHPMailer(true);
  $adminMail->isSMTP();
  $adminMail->Host = 'smtp.gmail.com';
  $adminMail->SMTPAuth = true;
  $adminMail->Username = 'fulfillinverify@gmail.com'; // GANTI atau pakai email lain
  $adminMail->Password = 'rdprnqmvswlgtqsl'; // GANTI
  $adminMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $adminMail->Port = 587;

  $adminMail->setFrom('fulfillinverify@gmail.com', 'Fulfillin');
  // ganti dengan email tim/admin Fulfillin
  $adminMail->addAddress('fulfillment.adm@gmail.com'); 
  $adminMail->isHTML(true);
  $adminMail->Subject = 'Pendaftaran Baru - Aktivasi Dibutuhkan';
  // NOTE: link aktivasi di bawah harus dilindungi (contoh di sini hanya ilustrasi)
  $activateLink = "https://yourdomain.com/admin/activate_user.php?id={$user_id}";
  $adminMail->Body = "
    <h4>Ada pendaftaran baru</h4>
    <p>Email: {$email}<br>Toko: {$store_name}<br>Phone: {$phone}</p>
    <p>Untuk mengaktifkan akun, buka: <a href='{$activateLink}'>Aktifkan User</a></p>
  ";
  $adminMail->send();
} catch (Exception $e) {
  error_log("Mailer Error (admin notif): {$adminMail->ErrorInfo}");
  // tidak fatal
}

// Sukses pendaftaran — frontend akan membuka modal OTP
echo "success";
$conn->close();
?>