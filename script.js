const SITE_CONFIG = Object.freeze({
  filaCeroUrl: "https://www.filacero.cl/eventos/congreso-veterinario-limari-2026-en-ovalle",
  eventDate: "2026-11-12T09:00:00-03:00",
});

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const views = [...document.querySelectorAll("[data-view]")];
const routeLinks = [...document.querySelectorAll("[data-route]")];
const validRoutes = new Set(views.map((view) => view.dataset.view));

if (window.lucide) {
  window.lucide.createIcons();
}

document.querySelectorAll("[data-fila-cero]").forEach((link) => {
  link.href = SITE_CONFIG.filaCeroUrl;
});

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const setMenuIcon = (isOpen) => {
  if (!navToggle) return;
  navToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}" aria-hidden="true"></i>`;
  if (window.lucide) window.lucide.createIcons();
};

const closeMenu = () => {
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
  setMenuIcon(false);
};

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
  setMenuIcon(isOpen);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    )
  : null;

const observeReveals = (scope) => {
  const items = scope.querySelectorAll(".reveal");
  items.forEach((item) => {
    revealObserver?.unobserve(item);
    item.classList.remove("is-visible");
  });

  if (!revealObserver || reduceMotion.matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  window.requestAnimationFrame(() => {
    items.forEach((item) => revealObserver.observe(item));
  });
};

const getRoute = () => {
  const requested = window.location.hash.replace(/^#/, "");
  return validRoutes.has(requested) ? requested : "inicio";
};

const showRoute = (route, { resetScroll = true } = {}) => {
  const safeRoute = validRoutes.has(route) ? route : "inicio";
  let activeView = null;

  views.forEach((view) => {
    const isActive = view.dataset.view === safeRoute;
    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
    if (isActive) activeView = view;
  });

  routeLinks.forEach((link) => {
    if (link.closest("[data-nav]") && link.dataset.route === safeRoute) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  closeMenu();
  if (resetScroll) window.scrollTo({ top: 0, behavior: "auto" });
  if (activeView) observeReveals(activeView);

  const activeHeading = activeView?.querySelector("h1")?.textContent?.trim();
  document.title = activeHeading
    ? `${activeHeading} | CVET Limarí 2026`
    : "Congreso Veterinario Limarí 2026";
};

routeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const route = link.dataset.route;
    if (!route || !validRoutes.has(route)) return;

    if (getRoute() === route) {
      event.preventDefault();
      showRoute(route);
    }
  });
});

window.addEventListener("hashchange", () => showRoute(getRoute()));

if (!window.location.hash || !validRoutes.has(getRoute())) {
  window.history.replaceState(null, "", "#inicio");
}
showRoute(getRoute(), { resetScroll: false });

const countdownDays = document.querySelector("[data-countdown-days]");
const eventTimestamp = new Date(SITE_CONFIG.eventDate).getTime();

const updateCountdown = () => {
  if (!countdownDays) return;
  const difference = eventTimestamp - Date.now();
  const days = Math.max(0, Math.ceil(difference / 86400000));
  countdownDays.textContent = String(days);
};

updateCountdown();
window.setInterval(updateCountdown, 30 * 60 * 1000);

const logoTrack = document.querySelector("[data-logo-track]");
const logoSet = logoTrack?.querySelector(".logo-set");

if (logoTrack && logoSet && logoTrack.children.length === 1) {
  const duplicate = logoSet.cloneNode(true);
  duplicate.setAttribute("aria-hidden", "true");
  logoTrack.appendChild(duplicate);
}

const marqueeToggle = document.querySelector("[data-marquee-toggle]");

marqueeToggle?.addEventListener("click", () => {
  const isPaused = logoTrack?.classList.toggle("is-paused") ?? false;
  marqueeToggle.setAttribute("aria-pressed", String(isPaused));
  marqueeToggle.setAttribute("aria-label", `${isPaused ? "Reanudar" : "Pausar"} movimiento de auspiciadores`);
  marqueeToggle.title = `${isPaused ? "Reanudar" : "Pausar"} movimiento`;
  marqueeToggle.innerHTML = `<i data-lucide="${isPaused ? "play" : "pause"}" aria-hidden="true"></i>`;
  if (window.lucide) window.lucide.createIcons();
});

const galleryItems = [...document.querySelectorAll("[data-gallery-src]")];
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
let activeGalleryIndex = 0;
let galleryTrigger = null;

const renderLightbox = () => {
  const item = galleryItems[activeGalleryIndex];
  if (!item || !lightboxImage || !lightboxCaption) return;
  const preview = item.querySelector("img");
  lightboxImage.src = item.dataset.gallerySrc || "";
  lightboxImage.alt = preview?.alt || "Fotografía del Congreso Veterinario Limarí";
  lightboxCaption.textContent = item.dataset.galleryCaption || "";
};

const openLightbox = (index, trigger) => {
  if (!lightbox) return;
  activeGalleryIndex = index;
  galleryTrigger = trigger;
  renderLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightbox.querySelector("[data-lightbox-close]")?.focus();
};

const closeLightbox = () => {
  if (!lightbox?.classList.contains("is-open")) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  galleryTrigger?.focus();
};

const moveLightbox = (direction) => {
  if (!galleryItems.length) return;
  activeGalleryIndex = (activeGalleryIndex + direction + galleryItems.length) % galleryItems.length;
  renderLightbox();
};

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index, item));
});

document.querySelectorAll("[data-lightbox-close]").forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => moveLightbox(-1));
document.querySelector("[data-lightbox-next]")?.addEventListener("click", () => moveLightbox(1));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightbox?.classList.contains("is-open")) closeLightbox();
    else closeMenu();
  }
  if (!lightbox?.classList.contains("is-open")) return;
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});
