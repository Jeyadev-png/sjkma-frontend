/* ================================
   REINO-STYLE SMOOTH CURSOR
   FINAL VERSION
================================ */

const cursor = document.createElement("div");
cursor.style.position = "fixed";
cursor.style.width = "12px";
cursor.style.height = "12px";
cursor.style.borderRadius = "50%";
cursor.style.background = "#111";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "999";
cursor.style.top = "0";
cursor.style.left = "0";
document.body.appendChild(cursor);

/* Position */
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

/* Scale */
let scaleTarget = 1;
let scaleCurrent = 1;

/* Track mouse */
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* Hover targets */
document.querySelectorAll(".course-row, a, .hero-text-wrapper").forEach(el => {
  el.addEventListener("mouseenter", () => {
    scaleTarget = 3;
  });

  el.addEventListener("mouseleave", () => {
    scaleTarget = 1;
  });
});

/* Animation loop */
function animateCursor() {
  /* Position interpolation */
  currentX += (mouseX - currentX) * 0.18;
  currentY += (mouseY - currentY) * 0.18;

  /* Scale interpolation */
  scaleCurrent += (scaleTarget - scaleCurrent) * 0.15;

  cursor.style.transform = `
    translate(${currentX}px, ${currentY}px)
    translate(-50%, -50%)
    scale(${scaleCurrent})
  `;

  requestAnimationFrame(animateCursor);
}

animateCursor();
