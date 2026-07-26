/* ==========================================================================
   1X2.ro — front-end demo scripts
   ==========================================================================

   ▼▼▼  EDITEAZĂ AICI BANNERELE DIN SLIDER  ▼▼▼
   ---------------------------------------------------------------
   1. Copiază PNG-urile tale în folderul:  assets/img/slides/
      (dimensiune recomandată: 900 × 360 px; ține textul centrat,
      marginile laterale pot fi decupate pe unele ecrane)
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

const PREFERS_STILL = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Slider (păstrat din v1) ---------- */
(function initSlider() {
  const root = document.querySelector('[data-slider]');
  if (!root || !SLIDES.length) return;

  const track = root.querySelector('.slider-track');
  const dotsBox = root.querySelector('.slider-dots');

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
    if (PREFERS_STILL || SLIDES.length < 2) return;
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
  root.addEventListener('pointermove', (e) => {
    if (startX !== null && Math.abs(e.clientX - startX) > 45) root.dataset.swiped = '1';
  }, { passive: true });
  root.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1), true);
  }, { passive: true });
  track.addEventListener('click', (e) => {
    if (root.dataset.swiped) { e.preventDefault(); delete root.dataset.swiped; }
  });

  render();
  restart();
})();

/* ---------- Meniu mobil ---------- */
(function initBurger() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* ---------- Dezvăluire la scroll ---------- */
(function initReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (PREFERS_STILL || !('IntersectionObserver' in window)) {
    document.documentElement.classList.add('no-observer');
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 12% 0px' });
  items.forEach((el) => io.observe(el));
})();

/* ---------- Jackpot demo — crește lent, doar vizual ---------- */
(function initJackpot() {
  const els = document.querySelectorAll('[data-jackpot]');
  if (!els.length) return;
  let value = 2847391.5;
  const fmt = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const paint = () => els.forEach((el) => { el.textContent = fmt.format(value); });
  paint();
  if (PREFERS_STILL) return;
  setInterval(() => {
    value += Math.random() * 3.7 + 0.4;
    paint();
  }, 900);
})();

/* ---------- Filtre sloturi ---------- */
(function initFilters() {
  const buttons = document.querySelectorAll('[data-filter]');
  const grid = document.querySelector('[data-games]');
  if (!buttons.length || !grid) return;
  const cards = Array.from(grid.querySelectorAll('.game-card'));

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.toggle('active', b === btn));
      const f = btn.dataset.filter;
      let visible = 0;
      cards.forEach((card) => {
        const show = f === 'toate' || (card.dataset.cat || '').split(' ').includes(f);
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.setProperty('--i', visible++);
          card.classList.remove('in');
        }
      });
      /* reintră animația de stagger pe cardurile vizibile */
      requestAnimationFrame(() => requestAnimationFrame(() => {
        cards.forEach((card) => { if (!card.classList.contains('hidden')) card.classList.add('in'); });
      }));
    });
  });
})();

/* ---------- Toast ---------- */
function showToast(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---------- Bilet demo (betslip) ---------- */
(function initBetslip() {
  const slip = document.querySelector('[data-betslip]');
  if (!slip) return;

  const fab = document.querySelector('[data-betslip-fab]');
  const itemsBox = slip.querySelector('[data-bs-items]');
  const emptyMsg = slip.querySelector('[data-bs-empty]');
  const totalEl = slip.querySelector('[data-bs-total]');
  const counts = document.querySelectorAll('[data-bs-count]');
  const stakeInput = slip.querySelector('#bs-stake-input');
  const fmt = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* o selecție per meci: cheie = numele meciului */
  const selections = new Map();
  let opened = false;

  function stake() {
    let s = String(stakeInput.value).trim().replace(/\s/g, '');
    /* "50.5" = zecimale; "1.000" = separator de mii; "1.000,50" = ambele */
    if (/^\d+\.\d{1,2}$/.test(s)) s = s.replace('.', ',');
    const v = parseFloat(s.replace(/\./g, '').replace(',', '.'));
    return isFinite(v) && v > 0 ? v : 0;
  }

  function open() { opened = true; sync(); }
  function close() { opened = false; sync(); }

  function sync() {
    itemsBox.innerHTML = '';
    selections.forEach((sel, match) => {
      const row = document.createElement('div');
      row.className = 'bs-item';
      row.innerHTML =
        '<span><span class="bs-pick">' + sel.pick + '</span><br><span class="bs-match">' + match + '</span></span>' +
        '<span class="bs-odd">' + sel.odds.toFixed(2) + '</span>';
      const rm = document.createElement('button');
      rm.className = 'bs-remove';
      rm.type = 'button';
      rm.setAttribute('aria-label', 'Șterge selecția ' + match);
      rm.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      rm.addEventListener('click', () => {
        selections.delete(match);
        if (sel.btn) sel.btn.classList.remove('selected'), sel.btn.setAttribute('aria-pressed', 'false');
        sync();
      });
      row.appendChild(rm);
      itemsBox.appendChild(row);
    });

    const n = selections.size;
    counts.forEach((c) => { c.textContent = n; });
    emptyMsg.hidden = n > 0;

    let total = 0;
    if (n > 0) {
      let product = 1;
      selections.forEach((sel) => { product *= sel.odds; });
      total = stake() * product;
    }
    totalEl.textContent = fmt.format(total) + ' RON';

    const showSlip = opened && n >= 0;
    slip.classList.toggle('open', showSlip);
    fab.hidden = showSlip || n === 0;
  }

  function addSelection(match, pick, odds, btn) {
    const existing = selections.get(match);
    if (existing && existing.btn && existing.btn !== btn) {
      existing.btn.classList.remove('selected');
      existing.btn.setAttribute('aria-pressed', 'false');
    }
    selections.set(match, { pick, odds, btn });
    if (!opened) open(); else sync();
  }

  function removeSelection(match) {
    selections.delete(match);
    sync();
  }

  /* butoanele de cote 1X2 */
  document.querySelectorAll('.odds-row').forEach((row) => {
    const match = row.dataset.match || 'Meci';
    row.querySelectorAll('.odd-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        const odds = parseFloat(btn.querySelector('b').textContent);
        const wasSelected = btn.classList.contains('selected');
        row.querySelectorAll('.odd-btn').forEach((b) => {
          b.classList.remove('selected');
          b.setAttribute('aria-pressed', 'false');
        });
        if (wasSelected) {
          removeSelection(match);
        } else {
          btn.classList.add('selected');
          btn.setAttribute('aria-pressed', 'true');
          addSelection(match, 'Pronostic: ' + (btn.dataset.pick || '—'), odds, btn);
        }
      });
    });
  });

  /* butonul de boost din hero */
  document.querySelectorAll('.odd-btn-boost').forEach((btn) => {
    btn.addEventListener('click', () => {
      addSelection(btn.dataset.match, btn.dataset.pick, parseFloat(btn.dataset.odds), null);
    });
  });

  stakeInput.addEventListener('input', sync);

  slip.querySelector('[data-bs-close]').addEventListener('click', close);
  fab.addEventListener('click', open);
  document.querySelectorAll('[data-bs-open]').forEach((el) => {
    el.addEventListener('click', () => { opened ? close() : open(); });
  });

  slip.querySelector('[data-bs-submit]').addEventListener('click', () => {
    if (!selections.size) { showToast('Adaugă cel puțin o selecție pe bilet.'); return; }
    showToast('Bilet demo înregistrat — fără pariuri reale. Mulțumim că testezi 1X2!');
    selections.forEach((sel) => {
      if (sel.btn) { sel.btn.classList.remove('selected'); sel.btn.setAttribute('aria-pressed', 'false'); }
    });
    selections.clear();
    close();
  });

  sync();
})();
