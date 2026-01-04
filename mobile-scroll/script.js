const frames = [
  "./images/P00.png",
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");

// preload
frames.forEach(src => {
  const i = new Image();
  i.src = src;
});

function update(){
  const doc = document.documentElement;
  const max = Math.max(0, doc.scrollHeight - window.innerHeight);
  const t = max > 0 ? window.scrollY / max : 0;

  const p = Math.min(0.999999, Math.max(0, t));
  const idx = Math.floor(p * frames.length);

  img.src = frames[idx];
}

window.addEventListener("scroll", update, { passive:true });
window.addEventListener("resize", update);
update();
