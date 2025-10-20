<?php
require 'config.php';
require '../vendor/autoload.php'; // PHPMailer

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json');

if (!isset($_POST['email'])) {
  echo json_encode(['status' => 'error', 'message' => 'Email belum diisi']);
  exit;
}

$email = $_POST['email'];

// cek email
$query = $conn->prepare("SELECT * FROM users WHERE email = ?");
$query->execute([$email]);
$user = $query->fetch();

if (!$user) {
  echo json_encode(['status' => 'error', 'message' => 'Email tidak terdaftar']);
  exit;
}

// generate token
$token = bin2hex(random_bytes(50));
$update = $conn->prepare("UPDATE users SET reset_token = ?, token_expire = DATE_ADD(NOW(), INTERVAL 30 MINUTE) WHERE email = ?");
$update->execute([$token, $email]);

// kirim email
$mail = new PHPMailer(true);
try {
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'fulfillinverify@gmail.com';
  $mail->Password = 'rdprnqmvswlgtqsl';
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  $mail->setFrom('fulfillinverify@gmail.com', 'Fulfillin');
  $mail->addAddress($email);
  $mail->isHTML(true);
  $mail->Subject = 'Reset Password';
  $mail->Body = '
    Klik link berikut untuk reset password Anda:<br>
    <a href="http://localhost/fulfillin/reset.html?token=' . $token . '">
      Reset Password
    </a><br><br>
    Link berlaku selama 30 menit.';

  $mail->send();
  echo json_encode(['status' => 'success', 'message' => 'Email reset password telah dikirim!']);
} catch (Exception $e) {
  echo json_encode(['status' => 'error', 'message' => 'Gagal kirim email: '.$mail->ErrorInfo]);
}
?>
