// Toggle show/hide password
const toggle = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (toggle && passwordInput) {
  toggle.addEventListener("change", () => {
    passwordInput.type = toggle.checked ? "text" : "password";
  });
}

// Submit reset form
document.getElementById("resetForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.textContent = "Processing...";

  const res = await fetch("backend/reset_password.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`
  });

  const data = await res.json();
  message.textContent = data.message;
  message.style.color = data.status === "success" ? "green" : "red";

  if (data.status === "success") {
    setTimeout(() => (window.location = "login.html"), 2000);
  }
});
