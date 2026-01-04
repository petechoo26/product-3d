const channels = [
  "./images/ch-01.png",
  "./images/ch-02.png",
  "./images/ch-03.png",
  "./images/ch-04.png",
  "./images/ch-05.png",
  "./images/ch-06.png",
];

const ch = document.getElementById("ch");
const noise = document.getElementById("noise");

let current = 0;
let switching = false;

const USE_NOISE = true;

function flashNoise(){
  if(!USE_NOISE || !noise) return;
  noise.style.opacity = "0.18";
  setTimeout(() => noise.style.opacity = "0", 90);
}

function setChannel(idx){
  idx = Number(idx);
  if(switching || idx === current) return;
  if(idx < 0 || idx >= channels.length) return;

  switching = true;
  flashNoise();

  const img = new Image();
  img.onload = () => {
    ch.src = channels[idx];
    current = idx;
    switching = false;
  };
  img.src = channels[idx];
}

/* ✅ 부모(아임웹)에서 스크롤 진행률을 보내면 그때만 바뀜 */
let lastIdx = -1;
window.addEventListener("message", (e) => {
  const d = e.data;
  if(!d || d.type !== "DEOCULTO_SCROLL") return;

  // progress: 0~1
  const p = Math.min(0.999999, Math.max(0, Number(d.progress || 0)));
  const idx = Math.floor(p * channels.length);

  if(idx === lastIdx) return;
  lastIdx = idx;

  setChannel(idx);
});
