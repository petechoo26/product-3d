const frames = [
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");

// 미리 로딩 (스크롤 때 튕김 방지)
frames.forEach((src)=>{ const i=new Image(); i.src=src; });

function update(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const t = max > 0 ? (window.scrollY / max) : 0;

  // 0~0.999999로 고정해서 마지막에서 튀는 것 방지
  const p = Math.min(0.999999, Math.max(0, t));
  const idx = Math.floor(p * frames.length);
  const next = frames[idx];

  // 같은 이미지면 교체 안 함(불필요한 깜빡임 방지)
  if (!img.src.includes(next)) img.src = next;
}

window.addEventListener("scroll", update, { passive:true });
window.addEventListener("resize", update);
update();
