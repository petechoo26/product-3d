const frames = [
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");
const steps = document.querySelectorAll(".step");

let current = 0;
let switching = false;

// ✅ 미리 로드 (전환 안 되는 느낌/로딩 튕김 방지)
frames.forEach((src)=>{ const i=new Image(); i.src=src; });

function setFrame(i){
  i = Number(i);
  if (switching || i === current) return;
  if (i < 0 || i >= frames.length) return;

  switching = true;
  const next = frames[i];

  // 같은 src면 스킵
  if (img.src.includes(next.replace("./",""))) {
    switching = false;
    return;
  }

  img.style.opacity = "0";
  setTimeout(() => {
    img.src = next;
    img.style.opacity = "1";
    current = i;
    switching = false;
  }, 90);
}

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) setFrame(e.target.dataset.i);
  });
}, { threshold: 0.6 });

steps.forEach(s => io.observe(s));
