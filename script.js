// menangkap postMessage dari Apps Script
window.addEventListener("message", function(event) {
  try {
    const data = event.data;
    if (data && data.result === "success") {
      alert("✅ Data berhasil dikirim ke Google Sheet!");
      document.getElementById("contactForm").reset();
    } else {
      alert("❌ Gagal mengirim data: " + (data?.message || "Unknown error"));
    }
  } catch (e) {
    console.error("Error parsing message:", e);
  }
});

// indikator tombol Processing
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector(".submit-btn");

  form.addEventListener("submit", () => {
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }, 3000);
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
  "6281111111111", // CS A
  "6282222222222", // CS B
  "6283333333333"  // CS C
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