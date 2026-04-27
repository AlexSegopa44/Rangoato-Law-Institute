/* ============================================================
   RANGOATO LAW INSTITUTE — Home Page JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── TESTIMONIALS CAROUSEL ─────────────────────────────────
  const wrap    = document.getElementById('testimonialsTrackWrap');
  const track   = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  const dotsWrap = document.getElementById('testDots');

  if (!track) return;

  const cards   = Array.from(track.querySelectorAll('.testimonial-card'));
  const total   = cards.length;
  let current   = 0;
  let autoTimer;

  function getPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  }

  // Build dots dynamically each time perView changes
  function buildDots(totalSlides) {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'test-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function getDots() { return dotsWrap ? dotsWrap.querySelectorAll('.test-dot') : []; }

  function goTo(n) {
    const perView     = getPerView();
    const totalSlides = Math.ceil(total / perView);
    current = ((n % totalSlides) + totalSlides) % totalSlides;

    // Use the first card's actual rendered width + its computed gap
    const cardEl    = cards[0];
    const cardWidth = cardEl.getBoundingClientRect().width;
    const gap       = parseFloat(getComputedStyle(track).gap) || 32;
    const offset    = current * perView * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
    getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    resetAuto();
  }

  function setup() {
    const perView     = getPerView();
    const totalSlides = Math.ceil(total / perView);
    buildDots(totalSlides);
    current = 0;
    track.style.transform = 'translateX(0)';
    getDots().forEach((d, i) => d.classList.toggle('active', i === 0));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 6000);
  }

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  // Touch / swipe
  let startX = null;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    startX = null;
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { setup(); resetAuto(); }, 150);
  });

  setup();
  resetAuto();
});