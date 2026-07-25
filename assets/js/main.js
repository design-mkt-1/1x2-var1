/* ==========================================================================
   1X2.ro — front-end demo scripts
   ==========================================================================

   ▼▼▼  EDITEAZĂ AICI BANNERELE DIN SLIDER  ▼▼▼
   ---------------------------------------------------------------
   1. Copiază PNG-urile tale în folderul:  assets/img/slides/
      (dimensiune recomandată: 1200 × 420 px)
   2. Modifică lista de mai jos: "image" = numele fișierului,
      "href" = pagina deschisă la click, "alt" = descriere scurtă.
   3. Poți adăuga sau șterge oricâte slide-uri — săgețile și
      punctele de navigare se actualizează automat.
   --------------------------------------------------------------- */

const SLIDES = [
  {
    image: 'assets/img/slides/slide-1.svg',
    href: 'sport.html',
    alt: 'Pariază pe sport — cote de top pe 1X2.ro'
  },
  {
    image: 'assets/img/slides/slide-2.svg',
    href: 'sport.html',
    alt: 'Pachet de bun venit pentru pariuri sportive'
  },
  {
    image: 'assets/img/slides/slide-3.svg',
    href: 'sport.html',
    alt: 'Cote mărite la derby — doar pe 1X2.ro'
  }
];

const AUTOPLAY_MS = 5000;

/* ▲▲▲  SFÂRȘITUL ZONEI DE EDITARE  ▲▲▲
   ========================================================================== */

(function initSlider() {
  const root = document.querySelector('[data-slider]');
  if (!root || !SLIDES.length) return;

  const track = root.querySelector('.slider-track');
  const dotsBox = root.querySelector('.slider-dots');
  const prefersStill = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  SLIDES.forEach((s, i) => {
    const a = document.createElement('a');
    a.className = 'slide';
    a.href = s.href;
    const img = document.createElement('img');
    img.src = s.image;
    img.alt = s.alt || '';
    if (i > 0) img.loading = 'lazy';
    a.appendChild(img);
    track.appendChild(a);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => go(i, true));
    dotsBox.appendChild(dot);
  });

  const dots = Array.from(dotsBox.children);
  let index = 0;
  let timer = null;

  function render() {
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function go(i, user) {
    index = (i + SLIDES.length) % SLIDES.length;
    render();
    if (user) restart();
  }

  function restart() {
    stop();
    if (prefersStill || SLIDES.length < 2) return;
    timer = setInterval(() => go(index + 1), AUTOPLAY_MS);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  root.querySelector('.slider-arrow.prev').addEventListener('click', () => go(index - 1, true));
  root.querySelector('.slider-arrow.next').addEventListener('click', () => go(index + 1, true));

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', restart);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', restart);
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : restart();
  });

  /* Swipe pe mobil — click-ul rămâne activ dacă degetul nu se mișcă */
  let startX = null;
  root.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    delete root.dataset.swiped;
  }, { passive: true });
  root.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1), true);
  }, { passive: true });
  track.addEventListener('click', (e) => {
    /* previne navigarea accidentală imediat după un swipe */
    if (root.dataset.swiped) { e.preventDefault(); delete root.dataset.swiped; }
  });
  root.addEventListener('pointermove', (e) => {
    if (startX !== null && Math.abs(e.clientX - startX) > 45) root.dataset.swiped = '1';
  }, { passive: true });

  render();
  restart();
})();

/* Meniu mobil */
(function initBurger() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* Jackpot demo — numărul crește lent, doar vizual */
(function initJackpot() {
  const el = document.querySelector('[data-jackpot]');
  if (!el) return;
  const prefersStill = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let value = 2847391.5;
  const fmt = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const paint = () => { el.textContent = fmt.format(value); };
  paint();
  if (prefersStill) return;
  setInterval(() => {
    value += Math.random() * 3.7 + 0.4;
    paint();
  }, 900);
})();
