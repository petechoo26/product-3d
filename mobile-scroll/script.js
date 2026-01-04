// ✅ P01 ~ P04 총 4장
const frames = [
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const screen = document.getElementById("screen");
const space = document.getElementById("scrollSpace");

// preload
frames.forEach(src => {
  const i = new Image();
  i.src = src;
});

let last = -1;

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function update() {
  const rect = space.getBoundingClientRect();
  const total = space.offsetHeight - window.innerHeight;

  const progressed = clamp(-rect.top, 0, total);
  const t = total > 0 ? progressed / total : 0;

  const idx = Math.min(frames.length - 1, Math.floor(t * frames.length));

  if (idx !== last) {
    last = idx;
    // 캐시 방지용 쿼리 (가끔 Pages가 안 바뀐 것처럼 보이는 문제 방지)
    screen.src = `${frames[idx]}?f=${idx}`;
  }
}

window.addEventListener("scroll", update, { passive: true });
window.addEventListener("resize", update);
update();
