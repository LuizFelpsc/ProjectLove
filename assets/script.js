const letter = document.getElementById('letter');
const letterText = document.getElementById('letterText');
const balloons = document.querySelectorAll('.section.balloon');
const resetBtn = document.getElementById('resetBtn');
const centralMessage = document.getElementById('centralMessage');
const content = document.getElementById('content');

const phrases = [
  "Cânticos 4:7",
  "1 Coríntios 13:4-7",
  "Filipenses 1:3",
  "Eclesiastes 3:11",
  "Provérbios 31:10-12",
  "1 Pedro 3:3-4",
  "Hebreus 10:23",
  "Provérbios 31:30",
  "Salmos 46:5",
  "Provérbios 3:15"
];

let balloonInterval;
let isAnimating = false;

function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function startBalloonAnimation() {
  const balloonBox = document.querySelector('.balloons-box');
  const boxHeight = balloonBox.offsetHeight;
  const boxWidth = balloonBox.offsetWidth;

  const margin = 25; // margem mínima dos cantos
  let index = 0;

  balloonInterval = setInterval(() => {
    if (!letter.classList.contains('open')) return;

    const balloon = balloons[index % balloons.length];
    balloon.textContent = getRandomPhrase();
    balloon.style.opacity = "1";

    // pega largura real do balão para cálculo preciso
    const balloonWidth = balloon.offsetWidth || 150;

    const minX = margin;
    const maxX = boxWidth - balloonWidth - margin;
    const x = Math.random() * (maxX - minX) + minX;
    balloon.style.left = `${x}px`;

    // Reset posição
    balloon.style.transition = "none";
    balloon.style.bottom = "-80px";

    setTimeout(() => {
      balloon.style.transition = "bottom 10s linear, opacity 2s ease";
      balloon.style.bottom = `${boxHeight}px`;

      setTimeout(() => {
        balloon.style.opacity = "0";
      }, 8000);
    }, 50);

    index++;
  }, 3000);
}

letter.addEventListener('click', () => {
  if (letter.classList.contains('open') || isAnimating) return;

  isAnimating = true;
  letter.classList.add('open');

  letterText.style.opacity = "0";

  setTimeout(() => {
    content.scrollTop = 0;
    isAnimating = false;
    startBalloonAnimation();
  }, 1000);
});

resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  clearInterval(balloonInterval);
  balloons.forEach(balloon => {
    balloon.style.opacity = "0";
    balloon.style.bottom = "-80px";
  });

  letter.classList.remove('open');
  content.scrollTop = 0;

  setTimeout(() => {
    letterText.style.opacity = "1";
  }, 500);
});

