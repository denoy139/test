<?php
include "../backend/auth_check.php";
allow_role(['member']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Pengguna | Fulfillin</title>
  <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>
  <h1>Selamat Datang, <?= htmlspecialchars($_SESSION['fullname'] ?? 'User'); ?>!</h1>
  <p>Anda dapat melihat status pesanan dan riwayat pengiriman.</p>

  <nav>
    <ul>
      <li><a href="pesanan_saya.php">Pesanan Saya</a></li>
      <li><a href="riwayat.php">Riwayat Pengiriman</a></li>
      <li><a href="profil.php">Profil</a></li>
    </ul>
  </nav>

  <a href="../backend/logout.php">Logout</a>
</body>
</html>
