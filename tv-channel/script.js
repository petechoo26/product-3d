const channels = [
  "./images/ch-01.png",
  "./images/ch-02.png",
  "./images/ch-03.png",
  "./images/ch-04.png",
  "./images/ch-05.png",
  "./images/ch-06.png",
];

const tv = document.getElementById("tv");
const triggers = document.querySelectorAll(".trigger");

let current = 0;
let switching = false;

function setChannel(next){
  next = Number(next);
  if (switching || next === current) return;
  if (next < 0 || next >= channels.length) return;

  switching = true;
  tv.style.opacity = "0";

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

/* 스크롤 → 채널 변경 */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      setChannel(entry.target.dataset.channel);
    }
  });
},{ threshold: 0.6 });

triggers.forEach(t => observer.observe(t));
