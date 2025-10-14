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

// Flow process Function
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.flow-tabs .tab');
  const images = document.querySelectorAll('.flow-image');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // hapus active di semua tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      // sembunyikan semua gambar
      images.forEach(img => {
        img.classList.remove('active');
      });
      // tampilkan gambar sesuai target
      document.getElementById(target).classList.add('active');
    });
  });
});

// Slider Function
const slider = document.querySelector('.layananslider-wrapper');
const prev = document.querySelector('.arrow-btn.prev');
const next = document.querySelector('.arrow-btn.next');
let slides = document.querySelectorAll('.slide-card');

let currentIndex = 0;
let slidesToShow = getSlidesToShow();
let gap = 30;
let slideWidth = slides[0].offsetWidth + gap;

// --- Clone Slides untuk infinite loop ---
function cloneSlides() {
  const clones = Array.from(slides)
    .slice(0, slidesToShow)
    .map(s => s.cloneNode(true));
  clones.forEach(clone => slider.appendChild(clone));
  slides = document.querySelectorAll('.slide-card');
}

cloneSlides();

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// --- Hitung jumlah slide berdasarkan ukuran layar ---
function getSlidesToShow() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

// --- Tombol Next ---
next.addEventListener('click', () => {
  currentIndex++;
  updateSlider();

  if (currentIndex >= slides.length - slidesToShow) {
    setTimeout(() => {
      slider.style.transition = 'none';
      currentIndex = 0;
      updateSlider();
      setTimeout(() => slider.style.transition = 'transform 0.6s ease', 50);
    }, 600);
  }
});

// --- Tombol Prev ---
prev.addEventListener('click', () => {
  if (currentIndex <= 0) {
    slider.style.transition = 'none';
    currentIndex = slides.length - slidesToShow;
    updateSlider();
    setTimeout(() => slider.style.transition = 'transform 0.6s ease', 50);
  }
  currentIndex--;
  updateSlider();
});

// --- Resize Responsif ---
window.addEventListener('resize', () => {
  slidesToShow = getSlidesToShow();
  slideWidth = slides[0].offsetWidth + gap;
  updateSlider();
});

// --- Auto Slide ---
let autoSlide = setInterval(() => next.click(), 4000);
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => next.click(), 4000);
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