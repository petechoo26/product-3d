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

/* ✅ 노이즈를 켜고 싶지 않으면 false로 바꾸면 끝 */
const USE_NOISE = true;

function flashNoise(){
  if(!USE_NOISE) return;
  if(!noise) return;

  // 너무 과하면 거슬리니까 약하게(원하면 0.35로 올려도 됨)
  noise.style.opacity = "0.20";
  setTimeout(() => {
    noise.style.opacity = "0";
  }, 110);
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

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      setChannel(entry.target.dataset.channel);
    }
  });
},{ threshold: 0.6 });

triggers.forEach(t => observer.observe(t));
