const channels = [
  "./images/ch-01.jpg",
  "./images/ch-02.jpg",
  "./images/ch-03.jpg",
  "./images/ch-04.jpg",
  "./images/ch-05.jpg",
  "./images/ch-06.jpg",
];

const screen = document.getElementById("screen");
const noise = document.querySelector(".noise");
const triggers = document.querySelectorAll(".trigger");

let current = 0;
let isSwitching = false;

function flashNoise(){
  if(!noise) return;
  noise.style.opacity = "0.35";
  setTimeout(()=> noise.style.opacity = "0", 120);
}

function setChannel(next){
  next = Number(next);
  if (Number.isNaN(next)) return;
  if (next === current) return;
  if (next < 0 || next >= channels.length) return;
  if (isSwitching) return;

  isSwitching = true;

  // 1) 채널 전환 느낌: 살짝 끊기 + 노이즈
  screen.style.opacity = "0";
  flashNoise();

  setTimeout(()=>{
    screen.src = channels[next];
    // 이미지 로드 후 페이드인(안정)
    screen.onload = () => {
      screen.style.opacity = "1";
      current = next;
      isSwitching = false;
    };
  }, 120);
}

// 스크롤 섹션이 화면에 들어오면 채널 변경
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      setChannel(entry.target.dataset.channel);
    }
  });
}, { threshold: 0.6 });

triggers.forEach(t => observer.observe(t));
