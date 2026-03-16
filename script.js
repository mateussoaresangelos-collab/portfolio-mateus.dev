const header = document.querySelector("header");
const themeToggle = document.getElementById("themeToggle");
const scrollBtn = document.getElementById("scrollTopBtn");
const reveals = document.querySelectorAll(".reveal");

let lastScroll = 0;

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const visible = 100;

    if (elementTop < windowHeight - visible) {
      el.classList.add("show");
    }
  });
}

function handleScroll() {
  const currentScroll = window.pageYOffset;

  if (header) {
    if (currentScroll > lastScroll && currentScroll > 80) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
  }

  if (scrollBtn) {
    scrollBtn.style.display =
      document.documentElement.scrollTop > 300 ? "block" : "none";
  }

  lastScroll = currentScroll;
  revealOnScroll();
}

function setTheme(theme) {
  const isLight = theme === "light";

  document.body.classList.toggle("light-mode", isLight);

  if (themeToggle) {
    themeToggle.textContent = isLight ? "🌙" : "☀";
    themeToggle.setAttribute("aria-pressed", String(isLight));
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");
    const nextTheme = isLight ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", revealOnScroll);
window.addEventListener("load", () => {
  revealOnScroll();
  handleScroll();
});
