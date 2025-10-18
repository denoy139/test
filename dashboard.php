<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.html");
  exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dashboard | Fulfillin</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      text-align: center;
      margin-top: 100px;
      background: #f8f9fb;
    }
    h1 {
      color: #c8102e;
    }
    a {
      text-decoration: none;
      color: #c8102e;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <h1>Selamat Datang, <?php echo htmlspecialchars($_SESSION['email']); ?> 👋</h1>
  <p>Anda berhasil login ke dashboard Fulfillin.</p>
  <p><a href="logout.php">Logout</a></p>
</body>
</html>