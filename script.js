// ── Colores de partículas por red ──────────────────────────────
const networkColors = {
  fb: ['#1877F2', '#4a9fff', '#a8d4ff'],
  tt: ['#69C9D0', '#ffffff', '#ff004f'],
  ig: ['#f09433', '#dc2743', '#bc1888'],
  wa: ['#25D366', '#a8ffcb', '#00e676'],
};

// ── Detecta qué clase de red tiene la tarjeta ──────────────────
function getNetwork(card) {
  for (const net of Object.keys(networkColors)) {
    if (card.classList.contains(net)) return net;
  }
  return 'fb';
}

// ── Crea partículas flotantes ──────────────────────────────────
function spawnParticles(card, e) {
  const net    = getNetwork(card);
  const colors = networkColors[net];
  const rect   = card.getBoundingClientRect();
  const count  = 7;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.classList.add('particle');

    const size  = Math.random() * 7 + 4;          // 4–11 px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x     = e.clientX - rect.left + (Math.random() - 0.5) * 60;
    const y     = e.clientY - rect.top  + (Math.random() - 0.5) * 20;
    const delay = Math.random() * 0.25;

    Object.assign(dot.style, {
      width:            size + 'px',
      height:           size + 'px',
      background:       color,
      left:             x + 'px',
      top:              y + 'px',
      animationDelay:   delay + 's',
      animationDuration: (0.6 + Math.random() * 0.4) + 's',
    });

    card.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  }
}

// ── Ripple al hacer click ──────────────────────────────────────
function spawnRipple(card, e) {
  const ripple = document.createElement('span');
  const rect   = card.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);
  const x      = e.clientX - rect.left - size / 2;
  const y      = e.clientY - rect.top  - size / 2;

  Object.assign(ripple.style, {
    position:        'absolute',
    width:           size + 'px',
    height:          size + 'px',
    left:            x + 'px',
    top:             y + 'px',
    borderRadius:    '50%',
    background:      'rgba(255,255,255,0.08)',
    transform:       'scale(0)',
    animation:       'ripple 0.55s ease-out forwards',
    pointerEvents:   'none',
    zIndex:          '10',
  });

  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
    document.head.appendChild(style);
  }

  card.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

// ── Adjunta eventos ────────────────────────────────────────────
document.querySelectorAll('.link-card').forEach(card => {
  // Partículas al entrar con el cursor
  card.addEventListener('mouseenter', e => spawnParticles(card, e));

  // Ripple al hacer click
  card.addEventListener('click', e => spawnRipple(card, e));
});

// ── Año del footer ─────────────────────────────────────────────
const footer = document.querySelector('.footer');
if (footer) {
  footer.textContent = `© ${new Date().getFullYear()} · Todos los derechos reservados`;
}
