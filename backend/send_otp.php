<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php'; // perbaikan path

function send_otp_email($email, $otp) {
  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'fulfillinverify@gmail.com'; // GANTI
    $mail->Password = 'rdprnqmvswlgtqsl'; // GANTI
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('fulfillinverify@gmail.com', 'Fulfillin');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Kode Verifikasi OTP Fulfillin';
    $mail->Body = "<h3>Kode OTP kamu adalah: <b>$otp</b></h3><p>Kode ini berlaku selama 5 menit.</p>";

    $mail->send();
    return true;
  } catch (Exception $e) {
    error_log("Gagal kirim email: {$mail->ErrorInfo}");
    return false;
  }
}
?>
