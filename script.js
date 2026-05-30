const networkColors = {
  fb: ['#1877F2', '#4a9fff', '#a8d4ff'],
  tt: ['#69C9D0', '#ffffff', '#ff004f'],
  ig: ['#f09433', '#dc2743', '#bc1888'],
  wa: ['#25D366', '#a8ffcb', '#00e676'],
};

function getNetwork(card) {
  for (const net of Object.keys(networkColors)) {
    if (card.classList.contains(net)) return net;
  }
  return 'fb';
}

function spawnParticles(card, e) {
  const net    = getNetwork(card);
  const colors = networkColors[net];
  const rect   = card.getBoundingClientRect();

  for (let i = 0; i < 7; i++) {
    const dot   = document.createElement('span');
    dot.classList.add('particle');
    const size  = Math.random() * 7 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x     = e.clientX - rect.left + (Math.random() - 0.5) * 60;
    const y     = e.clientY - rect.top  + (Math.random() - 0.5) * 20;

    Object.assign(dot.style, {
      width:             size + 'px',
      height:            size + 'px',
      background:        color,
      left:              x + 'px',
      top:               y + 'px',
      animationDelay:    (Math.random() * 0.2) + 's',
      animationDuration: (0.6 + Math.random() * 0.4) + 's',
    });

    card.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  }
}

function spawnRipple(card, e) {
  const ripple = document.createElement('span');
  const rect   = card.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);

  Object.assign(ripple.style, {
    position:        'absolute',
    width:           size + 'px',
    height:          size + 'px',
    left:            (e.clientX - rect.left - size / 2) + 'px',
    top:             (e.clientY - rect.top  - size / 2) + 'px',
    borderRadius:    '50%',
    background:      'rgba(255,255,255,0.08)',
    transform:       'scale(0)',
    animation:       'ripple 0.55s ease-out forwards',
    pointerEvents:   'none',
    zIndex:          '10',
  });

  card.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('mouseenter', e => spawnParticles(card, e));
  card.addEventListener('click',      e => spawnRipple(card, e));
});

const footer = document.querySelector('.footer');
if (footer) footer.textContent = `© ${new Date().getFullYear()} · Todos los derechos reservados`;