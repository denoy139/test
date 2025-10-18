// js/register.js
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");
  const form = document.getElementById("registerForm");
  const formMessage = document.getElementById("formMessage");

  // ✅ Tampilkan/sembunyikan password
  if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener("change", function () {
      passwordInput.type = this.checked ? "text" : "password";
    });
  }

  // ✅ Submit form
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formMessage) return;

      formMessage.textContent = "Memproses pendaftaran...";
      formMessage.style.color = "#1c8f60";

      const formData = new FormData(form);
      fetch(form.action || "backend/register.php", {
        method: form.method || "POST",
        body: formData
      })
        .then(res => res.text())
        .then(data => {
          const response = data.trim();
          if (response === "success") {
            formMessage.textContent = "✅ Pendaftaran berhasil! Akun Anda telah dibuat.";
            formMessage.style.color = "green";
            form.reset();
          } else if (response === "email_exists") {
            formMessage.textContent = "⚠️ Email sudah terdaftar. Gunakan email lain.";
            formMessage.style.color = "red";
          } else {
            formMessage.textContent = "❌ Gagal mendaftar: " + data;
            formMessage.style.color = "red";
          }
        })
        .catch(() => {
          formMessage.textContent = "Terjadi kesalahan, coba lagi.";
          formMessage.style.color = "red";
        });
    });
  }
});