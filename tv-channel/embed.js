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

function flashNoise(){
  if(!noise) return;
  noise.style.opacity = "0.18";
  setTimeout(() => (noise.style.opacity = "0"), 90);
}

function setChannel(next){
  next = Number(next);
  if (switching || next === current) return;
  if (next < 0 || next >= channels.length) return;

  switching = true;
  flashNoise();

  const img = new Image();
  img.onload = () => {
    tv.src = channels[next];
    current = next;
    switching = false;
  };
  img.src = channels[next];
}

/**
 * ✅ 오직 부모에서 이 메시지가 왔을 때만 변경
 * { type: "DEOCULTO_SET", idx: 0~5 }
 */
window.addEventListener("message", (e) => {
  const d = e.data;
  if (!d || d.type !== "DEOCULTO_SET") return;
  setChannel(d.idx);
});
