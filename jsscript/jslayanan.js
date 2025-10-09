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
const slidesToShow = 3;
const gap = 30;
let slideWidth = slides[0].offsetWidth + gap;

// --- 1️⃣ Clone untuk efek infinite loop ---
const firstClones = Array.from(slides)
  .slice(0, slidesToShow)
  .map(slide => slide.cloneNode(true));

firstClones.forEach(clone => slider.appendChild(clone));

// Update NodeList setelah clone
slides = document.querySelectorAll('.slide-card');

// --- 2️⃣ Update posisi awal ---
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// --- 3️⃣ Next button ---
next.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
  if (currentIndex >= slides.length - slidesToShow) {
    setTimeout(() => {
      slider.style.transition = 'none';
      currentIndex = 0;
      updateSlider();
      setTimeout(() => (slider.style.transition = 'transform 0.6s ease'), 50);
    }, 600);
  }
});

// --- 4️⃣ Prev button ---
prev.addEventListener('click', () => {
  if (currentIndex <= 0) {
    slider.style.transition = 'none';
    currentIndex = slides.length - slidesToShow;
    updateSlider();
    setTimeout(() => (slider.style.transition = 'transform 0.6s ease'), 50);
  }
  currentIndex--;
  updateSlider();
});

// --- 5️⃣ Responsif: hitung ulang lebar ---
window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth + gap;
  updateSlider();
});

// --- 6️⃣ (Opsional) Auto-slide tiap 4 detik ---
let autoSlide = setInterval(() => next.click(), 4000);

// Hentikan auto-slide saat hover
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => next.click(), 4000);
});