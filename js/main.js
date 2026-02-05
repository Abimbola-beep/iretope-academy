/* =========================
   MOBILE MENU TOGGLE
========================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/* =========================
   SCROLL ANIMATIONS
========================= */
const animatedElements = document.querySelectorAll(
  ".trust-item, .program-card, .testimonial, .why-list li",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

animatedElements.forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* =========================
   ADMISSION FORM VALIDATION
========================= */
const form = document.getElementById("admissionForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const parentName = document.getElementById("parentName");
  const phone = document.getElementById("phone");
  const childName = document.getElementById("childName");
  const age = document.getElementById("age");
  const childClass = document.getElementById("class");

  clearErrors();

  if (parentName.value.trim() === "") {
    showError(parentName, "Please enter parent/guardian name");
    isValid = false;
  }

  if (!/^\d{11}$/.test(phone.value)) {
    showError(phone, "Enter a valid 11-digit phone number");
    isValid = false;
  }

  if (childName.value.trim() === "") {
    showError(childName, "Please enter child’s name");
    isValid = false;
  }

  if (age.value === "" || age.value <= 0) {
    showError(age, "Enter a valid age");
    isValid = false;
  }

  if (childClass.value === "") {
    showError(childClass, "Please select a class");
    isValid = false;
  }

  if (!isValid) return;

  const message = `
*New Admission Enquiry*

👨‍👩‍👧 Parent: ${parentName.value}
📞 Phone: ${phone.value}

👶 Child: ${childName.value}
🎂 Age: ${age.value}
🏫 Class: ${childClass.value}
`;

  // ✅ Updated WhatsApp number for Iretope Academy
  const whatsappNumber = "2347065850557";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;

  window.open(whatsappURL, "_blank");
});

/* =========================
   HELPERS
========================= */
function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  error.innerText = message;
  error.style.display = "block";
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((err) => {
    err.style.display = "none";
  });
}

/* =====================
   IMAGE SLIDER
===================== */
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
  updateDots();
}

function prevSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  updateDots();
}

/* =====================
   SLIDER DOTS FUNCTIONALITY
===================== */
const dots = document.querySelectorAll(".slider-dots .dot");

dots.forEach((dot) => {
  dot.addEventListener("click", function () {
    const slideIndex = parseInt(this.getAttribute("data-slide"));

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = slideIndex;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    resetInterval();
  });
});

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

document.querySelector(".prev").addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
