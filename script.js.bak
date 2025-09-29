// ✅ Masukkan URL Web App dari Google Apps Script kamu (yang ada /exec di belakang)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCFMoS1K21uSvq5rbx2SpW9sd5CUPEToYUu_-JrRMLfRo_yJMpSImP1hh3JlvnugxBGQ/exec";

// ✅ Ambil elemen form berdasarkan id yang ada di HTML
const form = document.getElementById("contactForm"); // Pastikan id di HTML sesuai

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // ✅ Ambil semua data input dari form
    let formData = new FormData(form);

    // ✅ Tambahkan informasi origin (untuk validasi di Apps Script)
    formData.append("origin", window.location.origin);

    // ✅ Kirim data ke Google Apps Script Web App
    fetch(SCRIPT_URL, { 
      method: "POST", 
      mode: "cors", // pastikan CORS aktif
      body: formData 
    })
      .then(response => response.json()) // Ambil respon sebagai JSON
      .then(result => {
        console.log("✅ Data terkirim:", result);

        if (result.result === "success") {
          alert("✅ Data berhasil dikirim ke Google Sheet!");
          form.reset();
        } else {
          alert("⚠️ Gagal: " + (result.message || "Terjadi error"));
        }
      })
      .catch(error => {
        console.error("❌ Terjadi error:", error);
        alert("Terjadi kesalahan saat mengirim data. Cek console untuk detail.");
      });
  });
}

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