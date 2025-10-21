<?php
include "../backend/auth_check.php";
allow_role(['mitra']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Mitra Gudang | Fulfillin</title>
  <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>
  <h1>Selamat Datang, Mitra Gudang!</h1>
  <p>Anda dapat mengelola stok barang dan memantau pengiriman di gudang Anda.</p>

  <nav>
    <ul>
      <li><a href="stok_barang.php">Kelola Stok</a></li>
      <li><a href="pengiriman.php">Pengiriman</a></li>
      <li><a href="laporan.php">Laporan Gudang</a></li>
    </ul>
  </nav>

  <a href="../backend/logout.php">Logout</a>
</body>
</html>
