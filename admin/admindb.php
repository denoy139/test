<?php
include "../backend/auth_check.php";
allow_role(['admin']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Admin | Fulfillin</title>
  <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>
  <h1>Selamat Datang, Admin!</h1>
  <p>Anda dapat mengelola data gudang, pesanan, dan pengguna.</p>

  <nav>
    <ul>
      <li><a href="kelola_gudang.php">Kelola Gudang</a></li>
      <li><a href="kelola_pesanan.php">Kelola Pesanan</a></li>
      <li><a href="laporan.php">Laporan</a></li>
    </ul>
  </nav>

  <a href="../backend/logout.php">Logout</a>
</body>
</html>
