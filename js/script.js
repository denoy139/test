// ✅ Masukkan URL Web App dari Google Apps Script kamu (yang ada /exec di belakang)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCFMoS1K21uSvq5rbx2SpW9sd5CUPEToYUu_-JrRMLfRo_yJMpSImP1hh3JlvnugxBGQ/exec";

// ✅ Ambil elemen form berdasarkan id yang ada di HTML
// Pastikan di HTML kamu ada <form id="contactForm">...</form>
// Kalau id-nya berbeda, GANTI "contactForm" sesuai dengan yang ada di HTML
const form = document.getElementById("contactForm"); // ← ID form kamu di sini

// ✅ Tambahkan event listener supaya form tidak reload halaman saat submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah reload halaman

  // ✅ Ambil semua data input dari form
  let formData = new FormData(form);

  // ✅ Kirim data ke Google Apps Script Web App menggunakan Fetch API
  fetch(SCRIPT_URL, { 
    method: "POST", 
    body: formData 
  })
    .then(response => response.text()) // ✅ Ambil respon dari Apps Script
    .then(result => {
      console.log("✅ Data terkirim:", result);
      alert("Data berhasil dikirim ke Google Sheet!");
      form.reset(); // ✅ Reset form setelah submit sukses
    })
    .catch(error => {
      console.error("❌ Terjadi error:", error);
      alert("Terjadi kesalahan saat mengirim data.");
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