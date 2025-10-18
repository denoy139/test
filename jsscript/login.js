document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#loginForm");
  const msg = document.getElementById("formMessage");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Toggle show/hide password
  togglePassword?.addEventListener("change", function () {
    if (!passwordInput) return;
    passwordInput.type = this.checked ? "text" : "password";
  });

  // Submit login (AJAX)
  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    msg.textContent = "Memeriksa data...";
    msg.style.color = "#1c8f60";

    fetch("backend/login.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(response => {
        const r = response.trim();
        if (r === "success") {
          msg.textContent = "✅ Login berhasil, mengalihkan...";
          msg.style.color = "green";
          setTimeout(() => (window.location.href = "dashboard.php"), 1200);
        } else {
          msg.textContent = "❌ " + r;
          msg.style.color = "red";
        }
      })
      .catch(() => {
        msg.textContent = "Terjadi kesalahan koneksi.";
        msg.style.color = "red";
      });
  });
});