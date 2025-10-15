// js/register.js
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");
  const form = document.getElementById("registerForm");
  const formMessage = document.getElementById("formMessage");

  // ✅ Fungsi tampil/sembunyikan password
  if (showPasswordCheckbox && passwordInput) {
    showPasswordCheckbox.addEventListener("change", function () {
      if (this.checked) {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    });
  }

  // ✅ Proses submit form (tetap seperti semula)
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
          if (data.trim() === "success") {
            formMessage.textContent = "Pendaftaran berhasil! Akun Anda telah dibuat.";
            formMessage.style.color = "green";
            form.reset();
          } else {
            formMessage.textContent = "Gagal mendaftar: " + data;
            formMessage.style.color = "red";
          }
        })
        .catch(err => {
          formMessage.textContent = "Terjadi kesalahan, coba lagi.";
          formMessage.style.color = "red";
        });
    });
  }
});