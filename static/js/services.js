/* ============================================================
   RANGOATO LAW INSTITUTE — Services Page JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE HERO PARALLAX BG ────────────────────────────────
  const heroBg = document.querySelector('.page-hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  // ── ACCORDION ────────────────────────────────────────────
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const body    = item.querySelector('.accordion-body');

    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.accordion-body');
        if (b) b.style.maxHeight = '0';
      });

      // Open this one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first by default
  if (items.length) {
    const first = items[0];
    const fb = first.querySelector('.accordion-body');
    first.classList.add('open');
    if (fb) fb.style.maxHeight = fb.scrollHeight + 'px';
  }

  // ── ANCHOR HASH OPEN ─────────────────────────────────────
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target && target.classList.contains('accordion-item')) {
      // Close all first
      items.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.accordion-body');
        if (b) b.style.maxHeight = '0';
      });
      // Open target
      const tb = target.querySelector('.accordion-body');
      target.classList.add('open');
      if (tb) tb.style.maxHeight = tb.scrollHeight + 'px';
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }

});