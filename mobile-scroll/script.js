const images = [
  "images/P01.png",
  "images/P02.png",
  "images/P03.png",
  "images/P04.png",
];

const phone = document.getElementById("phone");

window.addEventListener("scroll", () => {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  const ratio = window.scrollY / maxScroll;

  const index = Math.min(
    images.length - 1,
    Math.floor(ratio * images.length)
  );

  phone.src = images[index];
});
