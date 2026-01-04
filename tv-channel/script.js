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

// 노이즈 필요 없으면 false
const USE_NOISE = true;

function flashNoise(){
  if(!USE_NOISE || !noise) return;
  noise.style.opacity = "0.18";
  setTimeout(() => (noise.style.opacity = "0"), 90);
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

// IntersectionObserver로 “현재 섹션” 진입 시 채널 변경
const observer = new IntersectionObserver((entries)=>{
  for (const entry of entries){
    if(entry.isIntersecting){
      setChannel(entry.target.dataset.channel);
    }
  }
}, {
  threshold: 0.6
});

triggers.forEach(t => observer.observe(t));
