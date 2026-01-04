const frames = [
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");

/* 오른쪽 위 디버그: 지금 어떤 src로 바꾸려는지 + 404인지 확인 */
const badge = document.createElement("div");
badge.style.cssText = `
  position:fixed; right:12px; top:12px; z-index:9999;
  font:12px/1.2 system-ui, sans-serif;
  background:rgba(0,0,0,.55); color:#fff;
  padding:6px 8px; border-radius:10px;
  pointer-events:none;
`;
document.body.appendChild(badge);

function getMaxScroll(){
  const d = document.documentElement;
  const b = document.body;
  const scrollHeight = Math.max(
    d.scrollHeight, b.scrollHeight,
    d.offsetHeight, b.offsetHeight
  );
  return Math.max(0, scrollHeight - window.innerHeight);
}

function setSrc(next){
  return new Promise((resolve, reject) => {
    const test = new Image();
    test.onload = () => resolve(next);
    test.onerror = () => reject(next);
    test.src = next;
  });
}

let lastIdx = -1;

async function update(){
  const max = getMaxScroll();
  const t = max > 0 ? (window.scrollY / max) : 0;
  const p = Math.min(0.999999, Math.max(0, t));
  const idx = Math.floor(p * frames.length);

  if (idx === lastIdx) {
    badge.textContent = `idx:${idx} y:${Math.round(window.scrollY)} max:${Math.round(max)}`;
    return;
  }
  lastIdx = idx;

  const next = frames[idx];
  badge.textContent = `idx:${idx} → ${next}`;

  try {
    await setSrc(next);      // ✅ 파일이 실제로 존재하는지 먼저 체크
    img.src = next;
  } catch(e) {
    badge.textContent = `❌ 이미지 로딩 실패: ${next}\n(파일명 대/소문자 확인!)`;
  }
}

window.addEventListener("scroll", update, { passive:true });
window.addEventListener("resize", update);
update();
