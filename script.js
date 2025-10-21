// Form Leads
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const messageBox = document.getElementById("formMessage");

  fetch(form.action, {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    if (result.includes("success")) {
      messageBox.textContent = "✅ Data berhasil dikirim!";
      messageBox.style.color = "green";
      form.reset();
    } else {
      messageBox.textContent = "❌ Gagal mengirim data.";
      messageBox.style.color = "red";
      console.error(result);
    }
  })
  .catch(error => {
    messageBox.textContent = "⚠️ Terjadi kesalahan koneksi.";
    messageBox.style.color = "red";
    console.error("Error:", error);
  });
});

// Animasi Fade-in ketika halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in-right");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible-right");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in-left");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible-left");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});

// === Rotator WA ===
// === Daftar nomor CS WhatsApp ===
const csNumbers = [
  "6287871124882", // CS A
  "6287871124882", // CS B
  "6287871124882"  // CS C
];

// === Fungsi Rotator ===
document.getElementById("whatsappButton").addEventListener("click", function (e) {
  e.preventDefault(); // cegah link default

  // Ambil index terakhir dari localStorage
  let lastIndex = localStorage.getItem("csIndex");
  lastIndex = lastIndex ? parseInt(lastIndex) : -1;

  // Tentukan index berikutnya
  let nextIndex = (lastIndex + 1) % csNumbers.length;

  // Simpan index baru ke localStorage
  localStorage.setItem("csIndex", nextIndex);

  // Nomor CS berikutnya
  const nextNumber = csNumbers[nextIndex];

  // Pesan default WA (opsional)
  const defaultMessage = encodeURIComponent("Halo, saya ingin bertanya mengenai layanan Fulfillin.");

  // Redirect ke WhatsApp
  const waLink = `https://wa.me/${nextNumber}?text=${defaultMessage}`;
  window.open(waLink, "_blank");
});