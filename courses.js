const imagePanel = document.querySelector(".course-image-panel");
const imageEl = document.getElementById("courseImage");
const rows = document.querySelectorAll(".course-row");

// Helper: check if desktop
const isDesktop = () => window.innerWidth >= 1025;

/* =========================
   DESKTOP: HOVER IMAGE PANEL
========================= */
rows.forEach(row => {
  const imgSrc = row.dataset.image;

  row.addEventListener("mouseenter", () => {
    if (!isDesktop()) return;

    imageEl.src = imgSrc;

    const rect = row.getBoundingClientRect();
    imagePanel.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;

    imagePanel.classList.add("active");
  });

  row.addEventListener("mouseleave", () => {
    if (!isDesktop()) return;
    imagePanel.classList.remove("active");
  });
});

/* =========================
   MOBILE / TABLET: TAP EXPAND
========================= */
rows.forEach(row => {
  row.addEventListener("click", () => {
    if (isDesktop()) return;

    // close others (accordion behavior)
    rows.forEach(r => {
      if (r !== row) r.classList.remove("active");
    });

    row.classList.toggle("active");
  });
});

/* =========================
   CLEANUP ON RESIZE
========================= */
window.addEventListener("resize", () => {
  // Remove desktop panel if switching to mobile
  if (!isDesktop()) {
    imagePanel.classList.remove("active");
  }

  // Reset mobile expanded states if switching to desktop
  if (isDesktop()) {
    rows.forEach(row => row.classList.remove("active"));
  }
});
// SCROLL-IN FADE (SAFE + SUBTLE)
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    }
  });
});
