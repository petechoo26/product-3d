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
const INTERVAL = 1800; // 1.8초

function flashNoise(){
  if(!noise) return;
  noise.style.opacity = "0.18";
  setTimeout(() => {
    noise.style.opacity = "0";
  }, 100);
}

function nextChannel(){
  const next = (current + 1) % channels.length;

  tv.style.opacity = "0";
  flashNoise();

  const img = new Image();
  img.onload = () => {
    tv.src = channels[next];
    requestAnimationFrame(() => {
      tv.style.opacity = "1";
      current = next;
    });
  };
  img.src = channels[next];
}

setInterval(nextChannel, INTERVAL);
