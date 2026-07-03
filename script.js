const formatCLP = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(value));

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

if (window.lucide) {
  window.lucide.createIcons();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  const icon = navToggle.querySelector("svg");
  if (icon && window.lucide) {
    navToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    window.lucide.createIcons();
  }
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    if (navToggle && window.lucide) {
      navToggle.innerHTML = '<i data-lucide="menu"></i>';
      window.lucide.createIcons();
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -42px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const countdownDays = document.querySelector("[data-countdown-days]");
const eventDate = new Date("2026-11-12T09:00:00-03:00").getTime();

const updateCountdown = () => {
  if (!countdownDays) return;
  const distance = eventDate - Date.now();
  const days = Math.max(0, Math.ceil(distance / (1000 * 60 * 60 * 24)));
  countdownDays.textContent = String(days);
};

updateCountdown();
window.setInterval(updateCountdown, 1000 * 60 * 30);

const selectedPass = document.querySelector("[data-selected-pass]");
const selectedPrice = document.querySelector("[data-selected-price]");
const modalPass = document.querySelector("[data-modal-pass]");
const modalPrice = document.querySelector("[data-modal-price]");
const modalMethod = document.querySelector("[data-modal-method]");
const modalCopy = document.querySelector("[data-modal-copy]");
const modal = document.querySelector("[data-modal]");
let currentPass = selectedPass?.textContent || "Solo Congreso";
let currentPrice = 200000;
let currentMethod = "Webpay Plus";

const updateCheckout = () => {
  const formatted = `${formatCLP(currentPrice)} CLP`;
  if (selectedPass) selectedPass.textContent = currentPass;
  if (selectedPrice) selectedPrice.textContent = formatted;
  if (modalPass) modalPass.textContent = currentPass;
  if (modalPrice) modalPrice.textContent = formatted;
  if (modalMethod) modalMethod.textContent = currentMethod;
  if (modalCopy) {
    modalCopy.textContent = `Revisa el resumen de tu entrada ${currentPass} usando ${currentMethod} antes de continuar con la inscripción.`;
  }
};

document.querySelectorAll(".pass-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".pass-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    currentPass = card.dataset.pass || currentPass;
    currentPrice = Number(card.dataset.passPrice || currentPrice);
    updateCheckout();
  });
});

document.querySelectorAll(".method").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".method").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    currentMethod = button.dataset.method || currentMethod;
    updateCheckout();
  });
});

document.querySelectorAll("[data-ticket]").forEach((button) => {
  button.addEventListener("click", () => {
    currentPass = button.dataset.ticket || currentPass;
    currentPrice = Number(button.dataset.price || currentPrice);
    currentMethod = "Webpay Plus";
    updateCheckout();
    openModal();
  });
});

const openModal = () => {
  updateCheckout();
  modal?.classList.add("is-open");
  modal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

document.querySelector("[data-open-checkout]")?.addEventListener("click", openModal);
document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

updateCheckout();
