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
let switching = false;

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
  if (switching) return;

  switching = true;

  screen.style.opacity = "0";
  flashNoise();

  // 이미지 소스 교체
  const img = new Image();
  img.onload = () => {
    screen.src = channels[next];
    // 아주 짧게 딜레이 후 페이드 인
    requestAnimationFrame(() => {
      screen.style.opacity = "1";
      current = next;
      switching = false;
    });
  };
  img.src = channels[next];
}

/* 스크롤 섹션이 화면 중앙 근처 오면 채널 변경 */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      setChannel(entry.target.dataset.channel);
    }
  });
}, {
  root: null,
  threshold: 0.6
});

triggers.forEach(t => observer.observe(t));
