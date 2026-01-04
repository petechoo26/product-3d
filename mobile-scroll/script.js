const frames = [
  "images/P01.png",
  "images/P02.png",
  "images/P03.png",
  "images/P04.png",
];

const img = document.getElementById("phone");

function updateFrame() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const y = Math.max(0, Math.min(window.scrollY, maxScroll));
  const t = maxScroll ? (y / maxScroll) : 0;

  const idx = Math.min(frames.length - 1, Math.floor(t * frames.length));
  const nextSrc = frames[idx];

  if (img.getAttribute("src") !== nextSrc) img.src = nextSrc;
}

window.addEventListener("scroll", updateFrame, { passive: true });
window.addEventListener("resize", updateFrame);
updateFrame();
