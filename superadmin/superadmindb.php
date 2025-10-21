<?php
// Panggil proteksi otomatis
include "../backend/auth_check.php";

// Hanya role superadmin yang boleh mengakses
allow_role(['superadmin']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Super Admin | Fulfillin</title>
  <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>
  <h1>Selamat Datang, Super Admin!</h1>
  <p>Anda memiliki akses penuh untuk mengelola sistem Fulfillin.</p>

  <nav>
    <ul>
      <li><a href="kelola_admin.php">Kelola Admin</a></li>
      <li><a href="kelola_mitra.php">Kelola Mitra Gudang</a></li>
      <li><a href="kelola_user.php">Kelola User</a></li>
    </ul>
  </nav>

  <a href="../backend/logout.php">Logout</a>
</body>
</html>