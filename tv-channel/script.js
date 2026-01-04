const channels = [
  "./images/ch-01.png",
  "./images/ch-02.png",
  "./images/ch-03.png",
  "./images/ch-04.png",
  "./images/ch-05.png",
  "./images/ch-06.png",
];

const tv = document.getElementById("tv");
const noise = document.getElementById("noise");

let current = 0;
let switching = false;

/* 노이즈는 화면만 살짝 */
const USE_NOISE = true;

function flashNoise(){
  if(!USE_NOISE || !noise) return;
  noise.style.opacity = "0.18";
  setTimeout(() => (noise.style.opacity = "0"), 100);
}

function setChannel(next){
  next = Number(next);
  if (switching || next === current) return;
  if (next < 0 || next >= channels.length) return;

  switching = true;
  tv.style.opacity = "0";
  flashNoise();

  const img = new Image();
  img.onload = () => {
    tv.src = channels[next];
    requestAnimationFrame(() => {
      tv.style.opacity = "1";
      current = next;
      switching = false;
    });
  };
  img.src = channels[next];
}

/* ✅ 바깥(아임웹)에서 스크롤 진행률 받기 */
window.addEventListener("message", (e) => {
  const data = e.data;
  if (!data || data.type !== "DEOCULTO_SCROLL") return;

  // progress: 0~1
  const p = Math.min(1, Math.max(0, Number(data.progress || 0)));
  const idx = Math.min(channels.length - 1, Math.floor(p * channels.length));

  setChannel(idx);
});
