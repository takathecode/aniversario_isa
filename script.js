// ===============
// Efeitos Globais
// ===============

// Confete leve (reutilizável)
function createConfetti(container, count = 30) {
  const colors = ['#d4af37', '#f8d7da', '#e6d3a7', '#ffd700'];
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    container.appendChild(confetti);

    const animation = confetti.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: 3000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });

    animation.onfinish = () => confetti.remove();
  }
}

// ===============
// Página: Entrada
// ===============
if (document.getElementById('entrada')) {
  // Animação de digitação no título
  const title = document.querySelector('#entrada h1');
  const originalText = title.textContent;
  title.textContent = '';
  let i = 0;
  const typing = setInterval(() => {
    if (i < originalText.length) {
      title.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 100);
}

// ===============
// Página: Galeria
// ===============
if (document.getElementById('galeria')) {
  const frames = document.querySelectorAll('.frame');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('#lightbox img');
  const closeBtn = document.getElementById('close-lightbox');

  frames.forEach(frame => {
    frame.addEventListener('click', () => {
      const imgSrc = frame.querySelector('img').src;
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      createConfetti(document.body, 20);
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ===============
// Página: Cartas
// ===============
if (document.getElementById('cartas')) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.letter-card').forEach(card => {
    observer.observe(card);
  });
}

// ===============
// Página: Encerramento
// ===============
if (document.getElementById('encerramento')) {
  createConfetti(document.body, 50);

  // Fade-out ao clicar em "Rever Galeria"
  const backButton = document.querySelector('.btn');
  if (backButton) {
    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'galeria.html';
      }, 500);
    });
  }
}