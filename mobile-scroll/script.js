const frames = [
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");

// 디버그(현재 idx 표시) - 나중에 지워도 됨
let badge = document.createElement("div");
badge.style.cssText = `
  position:fixed; right:10px; top:10px; z-index:9999;
  font:12px/1 system-ui; opacity:.7; pointer-events:none;
`;
document.body.appendChild(badge);

// 미리 로딩 (스크롤 중 로딩으로 안 바뀌는 느낌 방지)
frames.forEach((src) => {
  const i = new Image();
  i.src = src;
});

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getMaxScroll() {
  const doc = document.documentElement;
  const body = document.body;

  const scrollHeight = Math.max(
    body.scrollHeight, doc.scrollHeight,
    body.offsetHeight, doc.offsetHeight,
    body.clientHeight, doc.clientHeight
  );

  return Math.max(0, scrollHeight - window.innerHeight);
}

function update() {
  const y = getScrollTop();
  const max = getMaxScroll();

  // max가 0이면 스크롤이 없다는 뜻 → 첫 프레임 유지
  const t = max > 0 ? y / max : 0;

  // 마지막에서 튀는 것 방지
  const p = Math.min(0.999999, Math.max(0, t));
  const idx = Math.floor(p * frames.length);

  badge.textContent = `idx: ${idx} / y:${Math.round(y)} / max:${Math.round(max)}`;

  const next = frames[idx];
  if (!img.src.endsWith(next.replace("./", ""))) {
    img.src = next;
  }
}

window.addEventListener("scroll", update, { passive: true });
window.addEventListener("resize", update);
update();
