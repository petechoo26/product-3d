const frames = [
  "./images/P01.png",
  "./images/P02.png",
  "./images/P03.png",
  "./images/P04.png",
];

const img = document.getElementById("phone");

function update(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const t = max > 0 ? (window.scrollY / max) : 0;
  const idx = Math.min(frames.length - 1, Math.floor(t * frames.length));
  const next = frames[idx];
  if (img.src.indexOf(next) === -1) img.src = next;
}

window.addEventListener("scroll", update, { passive:true });
window.addEventListener("resize", update);
update();
