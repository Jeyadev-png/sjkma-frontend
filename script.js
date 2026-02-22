/* ================================
   HERO TEXT FLIP (UNCHANGED)
================================ */

const wrapper = document.querySelector(".hero-text-wrapper");
const academy = document.querySelector(".hero-text.academy");
const quote = document.querySelector(".hero-text.quote");

if (wrapper && academy && quote) {
  wrapper.addEventListener("mouseenter", () => {
    academy.style.opacity = "0";
    academy.style.transform = "translateY(-20px)";
    quote.style.opacity = "1";
    quote.style.transform = "translateY(0)";
  });

  wrapper.addEventListener("mouseleave", () => {
    academy.style.opacity = "1";
    academy.style.transform = "translateY(0)";
    quote.style.opacity = "0";
    quote.style.transform = "translateY(20px)";
  });
}

/* ================================
   COURSES HOVER MOTION (UNCHANGED)
================================ */

document.querySelectorAll(".course-row").forEach((row) => {
  row.addEventListener("mouseenter", () => {
    gsap.to(row, {
      x: 20,
      duration: 0.4,
      ease: "power3.out",
    });
  });

  row.addEventListener("mouseleave", () => {
    gsap.to(row, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  });
});

/* ================================
   LENIS — SINGLE SOURCE OF TRUTH
   REINO-STYLE EASY EASE
================================ */

const lenis = new Lenis({
  duration: 1.35,
  easing: (t) => 1 - Math.pow(1 - t, 4),
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1,
});

/* RAF LOOP */
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ================================
   GSAP + LENIS SYNC (FIXED)
================================ */

if (typeof ScrollTrigger !== "undefined") {
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

/* ================================
   MICRO SCROLL WEIGHT (UNCHANGED)
   HERO TEXT ONLY
================================ */

const heroText = document.querySelector(".hero-text");

if (heroText) {
  let lastScroll = 0;

  lenis.on("scroll", ({ scroll }) => {
    const velocity = scroll - lastScroll;
    lastScroll = scroll;

    gsap.to(heroText, {
      y: velocity * 0.08,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  });
}

/* ================================
   SCROLL-IN FADE (LENIS AWARE)
================================ */

if (typeof ScrollTrigger !== "undefined") {
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        scroller: document.documentElement, // ✅ REQUIRED FIX
      },
    });
  });
}

