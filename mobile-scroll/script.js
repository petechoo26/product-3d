const frames = [
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");
const space = document.getElementById("scrollSpace");

// preload
frames.forEach(src => {
  const i = new Image();
  i.src = src;
});

let last = -1;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function update() {
  // ✅ 문서 전체(scrollHeight) 쓰지 말고, scroll-space 기준으로 진행률 계산
  const rect = space.getBoundingClientRect();
  const total = space.offsetHeight - window.innerHeight;

  const progressed = clamp(-rect.top, 0, total);
  const t = total > 0 ? progressed / total : 0;

  const idx = Math.min(frames.length - 1, Math.floor(t * frames.length));

  if (idx !== last) {
    last = idx;
    // ✅ 캐시 때문에 “안 바뀐 것처럼 보이는” 문제 방지
    img.src = `${frames[idx]}?f=${idx}`;
  }
}

window.addEventListener("scroll", update, { passive: true });
window.addEventListener("resize", update);
update();
