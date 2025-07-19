const letter = document.getElementById('letter');
const balloons = document.querySelectorAll('.section.balloon');

const messagesList = [
  [
    '<strong>Eclesiastes 3:11:</strong> "Tudo fez formoso em seu tempo..."',
    'Desde que te conheci, venho guardando sentimentos sinceros no coração. Senti que não era apenas simpatia, era algo especial, tranquilo... com paz.',
    'Tenho orado a Deus para que Ele guie cada passo que dou, e se for da vontade Dele, que também me permita viver algo especial ao seu lado.',
    'Com carinho, sinceridade e temor no coração, quero te dizer: gosto de você. E gostaria muito de caminhar com você, com Deus no centro de tudo.',
    '<strong>Colossenses 3:14:</strong> "Acima de tudo, revistam-se do amor, que é o elo perfeito."',
    'Que a paz de Deus esteja sempre em seu coração e ilumine seus passos.' // nova mensagem
  ],
  [
    'A fé é a certeza das coisas que se esperam, a convicção de fatos que se não veem. (Hebreus 11:1)',
    'Cada dia é uma nova oportunidade para crescer na graça e no amor de Deus.',
    'Confio que Ele está no controle e que nossos caminhos se cruzarão conforme a Sua vontade.',
    'Quero estar ao seu lado, caminhando juntos na luz e no amor divino.',
    'Que o Senhor abençoe nossa jornada com muita paz e harmonia.',
    'Sempre estarei orando por nós e pelo nosso futuro.' // nova mensagem
  ],
  [
    'Você é uma bênção que Deus colocou no meu caminho.',
    'A oração é a ponte que me conecta ao seu coração, mesmo à distância.',
    'Tenho esperança de construir algo belo, fundamentado na fé e no respeito.',
    'Com Deus no centro, acredito que tudo é possível.',
    'Meu desejo é ser seu companheiro em todas as estações da vida.',
    'Que nosso amor cresça guiado pela luz divina.' // nova mensagem
  ]
];

let currentMessageIndex = 0;
let opened = false;

function getDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function placeBalloons() {
  const positions = [];
  const minDistanceBetweenBalloons = 400; // distância mínima em pixels entre balões
  const margin = 200; // margem fixa dos cantos em pixels

  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  // Limitar o tamanho máximo dos balões para ajudar no posicionamento
  balloons.forEach(balloon => {
    balloon.style.maxWidth = '300px';
  });

  balloons.forEach(balloon => {
    let x, y, tries = 0;
    let validPosition = false;

    while (!validPosition && tries < 500) {
      x = Math.random() * (containerWidth - 2 * margin) + margin;
      y = Math.random() * (containerHeight - 2 * margin) + margin;

      validPosition = !positions.some(pos => getDistance(x, y, pos.x, pos.y) < minDistanceBetweenBalloons);

      tries++;
    }

    positions.push({ x, y });
    balloon.style.left = `${x}px`;
    balloon.style.top = `${y}px`;
  });
}

function updateBalloonsTexts() {
  const messages = messagesList[currentMessageIndex];
  balloons.forEach((balloon, idx) => {
    balloon.innerHTML = messages[idx] || '';
  });
}

letter.addEventListener('click', () => {
  if (!opened) {
    letter.classList.add('open');
    opened = true;
  }
  updateBalloonsTexts();
  placeBalloons();
  currentMessageIndex = (currentMessageIndex + 1) % messagesList.length;
});
