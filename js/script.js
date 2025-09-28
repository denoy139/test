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

// ========================================
// FORM SUBMISSION KE GOOGLE SHEET
// ========================================

// 1. Ganti URL ini dengan Web App URL dari Google Apps Script kamu
const scriptURL = https://script.google.com/macros/s/AKfycbzCFMoS1K21uSvq5rbx2SpW9sd5CUPEToYUu_-JrRMLfRo_yJMpSImP1hh3JlvnugxBGQ/exec;

// 2. Ambil elemen form berdasarkan id
const form = document.getElementById("contactForm");

// 3. Tambahkan event listener saat tombol submit ditekan
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault(); // mencegah reload halaman

    // 4. Ambil semua data input dari form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // 5. Kirim data ke Google Apps Script dengan fetch()
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(result => {
      alert("✅ Pesan berhasil dikirim!");
      form.reset(); // kosongkan form setelah submit
    })
    .catch(error => {
      alert("❌ Terjadi error: " + error.message);
    });
  });
}
