const screens = [
  "images/P01.png",
  "images/P02.png",
  "images/P03.png",
  "images/P04.png"
];

const screenEl = document.getElementById("screen");
const total = screens.length;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll =
    document.body.scrollHeight - window.innerHeight;

  const progress = Math.min(scrollTop / maxScroll, 1);
  const index = Math.floor(progress * total);

  screenEl.src = screens[Math.min(index, total - 1)];
});
