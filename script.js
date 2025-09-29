// form.js
// ✅ Menangkap pesan dari Google Apps Script setelah form submit
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

// ✅ Optional: Tambahkan indikator loading saat form submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector(".submit-btn");

  form.addEventListener("submit", () => {
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }, 3000); // aktifkan kembali tombol setelah 3 detik
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