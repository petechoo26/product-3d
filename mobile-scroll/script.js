const frames = [
  "./images/P00.png",
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");

// preload
for (const src of frames) {
  const i = new Image();
  i.src = src;
}

let lastIdx = -1;

function update() {
  const doc = document.documentElement;

  const max = Math.max(1, doc.scrollHeight - window.innerHeight); // 0 방지
  const t = window.scrollY / max;

  const p = Math.min(0.999999, Math.max(0, t));
  const idx = Math.floor(p * frames.length);

  if (idx !== lastIdx) {
    lastIdx = idx;
    // 캐시/동일 src 문제 방지
    img.src = `${frames[idx]}?f=${idx}`;
  }
}

// 스크롤 이벤트 + 초기 호출
window.addEventListener("scroll", update, { passive: true });
window.addEventListener("resize", update);
update();

// 디버그 (원하면 지워도 됨)
console.log("[mobile-scroll] script loaded");
console.log("SCRIPT LOADED ✅", new Date().toISOString());
