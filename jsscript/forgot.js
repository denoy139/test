document.getElementById("forgotForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const message = document.getElementById("message");

  message.textContent = "Processing...";

  const res = await fetch("backend/forgot_password.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${encodeURIComponent(email)}`
  });

  const data = await res.json();
  message.textContent = data.message;
  message.style.color = data.status === "success" ? "green" : "red";
});
