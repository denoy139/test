document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector(".submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // cegah reload page

    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const text = await response.text();

      // Jika response dari Apps Script mengandung "OK" berarti sukses
      if (text.includes("OK")) {
        alert("✅ Data berhasil dikirim ke Google Sheet!");
        form.reset();
      } else {
        console.error("Response:", text);
        alert("❌ Gagal mengirim data!");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Terjadi error saat mengirim data!");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
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