// js/register.js
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");
  const form = document.getElementById("registerForm");
  const formMessage = document.getElementById("formMessage");
  const modal = document.getElementById("otpModal");
  const closeModal = document.getElementById("closeModal");
  const confirmOtp = document.getElementById("confirmOtp");
  const otpInput = document.getElementById("otpInput");

  // Tampilkan/sembunyikan password
  showPasswordCheckbox?.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password";
  });

  // === Submit form ===
  form?.addEventListener("submit", function (e) {
    e.preventDefault();

    formMessage.textContent = "Memproses pendaftaran...";
    formMessage.style.color = "#1c8f60";

    const formData = new FormData(form);

    fetch("backend/register.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(response => {
        if (response.trim() === "success") {
          modal.classList.add("show");
          formMessage.textContent = "";
        } else if (response.trim() === "email_exists") {
          formMessage.textContent = "⚠️ Email sudah terdaftar.";
          formMessage.style.color = "red";
        } else {
          formMessage.textContent = "❌ Gagal mendaftar: " + response;
          formMessage.style.color = "red";
        }
      })
      .catch(() => {
        formMessage.textContent = "Terjadi kesalahan koneksi.";
        formMessage.style.color = "red";
      });
  });

  // Tutup modal
  closeModal?.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });

  // === Verifikasi OTP ===
  confirmOtp?.addEventListener("click", function () {
    const otp = otpInput.value.trim();
    if (!otp) return alert("Masukkan kode OTP.");

    fetch("backend/verify_otp.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "otp=" + encodeURIComponent(otp)
    })
      .then(res => res.text())
      .then(response => {
        if (response.trim() === "verified") {
          alert("✅ Email berhasil diverifikasi!");
          modal.classList.remove("show");
          form.reset();
          formMessage.textContent = "Pendaftaran selesai.";
          formMessage.style.color = "green";
        } else {
          alert("❌ Kode OTP salah atau kadaluarsa.");
        }
      })
      .catch(() => alert("Terjadi kesalahan."));
  });
});
