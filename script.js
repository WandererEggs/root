// --- Листья ---
const leafCanvas = document.getElementById('leafCanvas');
const leafCtx = leafCanvas.getContext('2d');
function resizeLeafCanvas() { 
  leafCanvas.width = window.innerWidth; 
  leafCanvas.height = window.innerHeight; 
}
resizeLeafCanvas();
window.addEventListener('resize', resizeLeafCanvas);

let leaves = [];
function initLeaves(count = 50) {
  leaves = [];
  for (let i = 0; i < count; i++) {
    leaves.push({
      x: Math.random() * leafCanvas.width,
      y: Math.random() * leafCanvas.height,
      width: 2 + Math.random() * 4,
      height: 5 + Math.random() * 7,
      speedY: 0.5 + Math.random() * 1,
      speedX: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * 2 * Math.PI,
      spin: (Math.random() - 0.5) * 0.02
    });
  }
}
initLeaves(50);

function drawLeaves() {
  leafCtx.clearRect(0, 0, leafCanvas.width, leafCanvas.height);
  leaves.forEach(l => {
    leafCtx.save();
    leafCtx.translate(l.x, l.y);
    leafCtx.rotate(l.angle);
    leafCtx.fillStyle = '#fff';
    leafCtx.fillRect(-l.width / 2, -l.height / 2, l.width, l.height);
    leafCtx.restore();
    l.y += l.speedY;
    l.x += l.speedX;
    l.angle += l.spin;
    if (l.y > leafCanvas.height) l.y = -10;
    if (l.x > leafCanvas.width) l.x = 0;
    if (l.x < 0) l.x = leafCanvas.width;
  });
  requestAnimationFrame(drawLeaves);
}
drawLeaves();

// --- Основной код карточек ---
const cards = document.querySelectorAll('.card');
const cardsScreen = document.getElementById('cardsScreen');
const flipScreen = document.getElementById('flipScreen');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');

// Объект для отслеживания, какие открытки уже открыты
let openedCards = {
  card1: false,
  card2: false,
  card3: false
};

// Изначально кнопка "Далее" скрыта
nextBtn.style.display = 'none';

cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    cardsScreen.style.display = 'none';
    flipScreen.style.display = 'flex';
    card1.style.display = card2.style.display = card3.style.display = 'none';
    if (index === 0) { card1.style.display = 'block'; openedCards.card1 = true; }
    if (index === 1) { card2.style.display = 'flex'; openedCards.card2 = true; }
    if (index === 2) { card3.style.display = 'flex'; openedCards.card3 = true; }
    leafCanvas.style.display = 'block';

    // Если все открытки открыты хотя бы раз, показываем кнопку "Далее"
    if (openedCards.card1 && openedCards.card2 && openedCards.card3) {
      nextBtn.style.display = 'block';
    }
  });
});

backBtn.addEventListener('click', () => {
  flipScreen.style.display = 'none';
  cardsScreen.style.display = 'flex';
  leafCanvas.style.display = 'block';

  // --- Сброс первой открытки ---
  const pages = document.querySelectorAll('#card1 .page');
  pages.forEach((page, index) => {
    page.classList.remove('flipped');
    page.style.zIndex = pages.length - index;
  });
});

// --- Flip страниц первой открытки ---
const pages = document.querySelectorAll('#card1 .page');
pages.forEach((page, index) => {
  page.style.zIndex = pages.length - index;
  page.addEventListener('click', () => {
    if (page.classList.contains('flipped')) return;
    page.classList.add('flipped');
    page.style.zIndex = index;
  });
});

// --- Фото увеличенное ---
const photoOverlay = document.getElementById('photoOverlay');
const overlayImg = document.getElementById('overlayImg');
function enablePhotoZoom(cardSelector) {
  const card = document.querySelector(cardSelector);
  if (!card) return;
  if (cardSelector === '#card1') {
    const images = card.querySelectorAll('.back');
    images.forEach(imgDiv => {
      imgDiv.addEventListener('click', e => {
        const bg = imgDiv.style.backgroundImage;
        overlayImg.src = bg.slice(5, -2);
        photoOverlay.style.display = 'flex';
        e.stopPropagation();
      });
    });
  } else {
    const imgDiv = card.children[0];
    imgDiv.addEventListener('click', e => {
      const bg = imgDiv.style.backgroundImage;
      overlayImg.src = bg.slice(5, -2);
      photoOverlay.style.display = 'flex';
      e.stopPropagation();
    });
  }
}
enablePhotoZoom('#card1');
enablePhotoZoom('#card2');
enablePhotoZoom('#card3');
photoOverlay.addEventListener('click', () => {
  photoOverlay.style.display = 'none';
  overlayImg.src = '';
});

// --- Финальный экран ---
let finalStep = 0;
const finalBox = document.getElementById('finalBox');
const finalMessage = document.getElementById('finalMessage');
let loveRating = 0;
const totalLoveHearts = 48;
const heartCanvas = document.getElementById('heartCanvas');
const ctx = heartCanvas.getContext('2d');
heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;
});

let heartsArr = [];
function initHearts(count) {
  heartsArr = [];
  for (let i = 0; i < count; i++) {
    heartsArr.push({
      x: Math.random() * heartCanvas.width,
      y: Math.random() * heartCanvas.height,
      size: 10 + Math.random() * 10,
      speedY: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 1.5
    });
  }
}
function drawHearts() {
  ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
  heartsArr.forEach(h => {
    ctx.fillStyle = '#d6336c';
    ctx.font = h.size + 'px Arial';
    ctx.fillText('❤', h.x, h.y);
    h.y += h.speedY;
    h.x += h.speedX;
    if (h.y > heartCanvas.height) h.y = -20;
    if (h.x > heartCanvas.width) h.x = 0;
    if (h.x < 0) h.x = heartCanvas.width;
  });
  requestAnimationFrame(drawHearts);
}
function createHearts(count) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.justifyContent = 'center';
  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.classList.add('heart');
    h.innerHTML = '❤';
    h.addEventListener('click', () => {
      const allHearts = container.children;
      for (let j = 0; j < count; j++) {
        allHearts[j].classList.toggle('selected', j <= i);
      }
      loveRating = i + 1;
    });
    container.appendChild(h);
  }
  return container;
}

function showFinalStep() {
  finalBox.style.display = 'flex';
  finalBox.innerHTML = '';
  finalMessage.style.display = 'none';

  const btn = document.createElement('button');
  btn.textContent = 'Далее';
  btn.addEventListener('click', () => { finalStep++; showFinalStep(); });

  if (finalStep === 0) {
    const p = document.createElement('p');
    p.textContent = 'Я люблю тебя, солнышко, и с нетерпением жду момента, когда смогу сказать тебе это прямо в глаза.
А теперь — финальная часть, не забудь оставить свои оценки.';
    finalBox.appendChild(p);
    finalBox.appendChild(btn);
  } 
  else if (finalStep === 1) {
    const p = document.createElement('p');
    p.textContent = 'Оценка подарка✍️';
    const rating = createHearts(5);
    finalBox.appendChild(p);
    finalBox.appendChild(rating);

    const hearts = rating.querySelectorAll('.heart');
    hearts.forEach(h => {
      h.addEventListener('click', () => {
        if ([...hearts].some(x => x.classList.contains('selected'))) {
          if (!finalBox.contains(btn)) finalBox.appendChild(btn);
        }
      });
    });
  } 
  else if (finalStep === 2) {
    const p = document.createElement('p');
    p.textContent = 'Насколько ты меня любишь?🤓';
    const rating = createHearts(totalLoveHearts);
    finalBox.appendChild(p);
    finalBox.appendChild(rating);

    const hearts = rating.querySelectorAll('.heart');
    hearts.forEach(h => {
      h.addEventListener('click', () => {
        if ([...hearts].some(x => x.classList.contains('selected'))) {
          if (!finalBox.contains(btn)) finalBox.appendChild(btn);
        }
      });
    });
  } 
  else if (finalStep === 3) {
    finalBox.style.display = 'none';
    finalMessage.textContent = 'А Я ТЕБЯ НАСТОЛЬКО ЛЮБЛЮ! ❤';
    finalMessage.style.display = 'block';
    leafCanvas.style.display = 'none';
    initHearts(100);
    drawHearts();
  }
}

// --- После просмотра всех открыток ---
// Кнопка "Далее" теперь появляется только после открытия всех трёх открыток
nextBtn.addEventListener('click', () => {
  flipScreen.style.display = 'none';
  document.getElementById('finalScreen').style.display = 'flex';
  showFinalStep();
});

