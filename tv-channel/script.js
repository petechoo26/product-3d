// ✅ 혹시 남아있는 interval 있으면 최대한 종료 (안전장치)
for (let i = 1; i < 99999; i++) clearInterval(i);

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
let lastIdx = -1;

const USE_NOISE = true;

function flashNoise() {
  if (!USE_NOISE || !noise) return;
  noise.style.opacity = "0.18";
  setTimeout(() => (noise.style.opacity = "0"), 100);
}

function setChannel(next) {
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

/**
 * ✅ 핵심:
 * - 부모가 보내는 메시지 중에서도
 *   "사용자 스크롤/휠/터치가 실제로 발생했을 때만" 채널 변경
 */
window.addEventListener("message", (e) => {
  const data = e.data;
  if (!data || data.type !== "DEOCULTO_SCROLL") return;

  // ✅ 이게 true일 때만 바뀌게 함 (부모에서만 true를 보내줌)
  if (data.user !== true) return;

  const p = Math.min(1, Math.max(0, Number(data.progress || 0)));
  const idx = Math.min(channels.length - 1, Math.floor(p * channels.length));

  if (idx === lastIdx) return;
  lastIdx = idx;

  setChannel(idx);
});
