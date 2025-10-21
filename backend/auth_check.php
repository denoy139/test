<?php
session_start();

// Jika belum login
if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
  header("Location: ../login.html");
  exit;
}

// Fungsi untuk membatasi akses per role
function allow_role($allowed_roles = []) {
  if (!in_array($_SESSION['role'], $allowed_roles)) {
    // Jika role tidak diizinkan, arahkan ke halaman role-nya sendiri
    switch ($_SESSION['role']) {
      case 'superadmin':
        header("Location: ../superadmin/superadmindb.php");
        break;
      case 'admin':
        header("Location: ../admin/admindb.php");
        break;
      case 'mitra':
        header("Location: ../mitra/mitradb.php");
        break;
      case 'user':
        header("Location: ../user/userdb.php");
        break;
      default:
        header("Location: ../login.html");
        break;
    }
    exit;
  }
}
?>
