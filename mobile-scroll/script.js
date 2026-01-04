const frames = [
  "./images/P00.png",
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");
const space = document.getElementById("scrollSpace");

// preload (TV에서도 했던 방식)
for (const src of frames) {
  const i = new Image();
  i.src = src;
}

let last = -1;

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function update(){
  // ✅ 핵심: “문서 전체”가 아니라 scroll-space 기준
  const rect = space.getBoundingClientRect();

  // space의 시작~끝을 0~1로 정규화
  const total = space.offsetHeight - window.innerHeight;
  const progressed = clamp(-rect.top, 0, total);
  const t = total > 0 ? progressed / total : 0;

  const idx = Math.min(frames.length - 1, Math.floor(t * frames.length));

  if (idx !== last) {
    last = idx;
    img.src = `${frames[idx]}?f=${idx}`; // 캐시 방지
  }
}

window.addEventListener("scroll", update, { passive:true });
window.addEventListener("resize", update);
update();
