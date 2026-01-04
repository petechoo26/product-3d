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
const triggers = document.querySelectorAll(".trigger");

let current = 0;
let switching = false;

/* 노이즈 번쩍 */
function flashNoise(){
  if(!noise) return;
  noise.style.opacity = "0.35";
  setTimeout(() => {
    noise.style.opacity = "0";
  }, 120);
}

/* 채널 변경 */
function setChannel(next){
  next = Number(next);
  if (switching || next === current) return;
  if (next < 0 || next >= channels.length) return;

  switching = true;

  /* 컷 전환 */
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

/* 스크롤 → 채널 컷컷 */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      setChannel(entry.target.dataset.channel);
    }
  });
}, {
  threshold: 0.6
});

triggers.forEach(t => observer.observe(t));
