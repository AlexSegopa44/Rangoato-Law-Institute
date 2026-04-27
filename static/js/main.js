/* ============================================================
   RANGOATO LAW INSTITUTE — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── HAMBURGER / MOBILE NAV ────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navDrawer  = document.getElementById('navDrawer');

  function closeDrawer() {
    hamburger && hamburger.classList.remove('open');
    navDrawer  && navDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.closeDrawer = closeDrawer;

  if (hamburger && navDrawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navDrawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  }

  // ── NAV SCROLL STATE ─────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── ACTIVE NAV LINK ──────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── HERO CAROUSEL ────────────────────────────────────────────
  const slides  = document.querySelectorAll('.carousel-slide');
  const dots    = document.querySelectorAll('.dot');
  const numEl   = document.getElementById('slideNum');
  let current   = 0;
  let timer;

  function goTo(n) {
    if (!slides.length) return;
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = ((n % slides.length) + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
    if (numEl) numEl.textContent = String(current + 1).padStart(2, '0');
    resetTimer();
  }

  function nextSlide() { goTo(current + 1); }
  function prevSlide()  { goTo(current - 1); }
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 5800);
  }

  window.goTo      = goTo;
  window.nextSlide = nextSlide;
  window.prev      = prevSlide;

  if (slides.length) resetTimer();

  // ── SERVICES STRIP ───────────────────────────────────────────
  const SERVICES = [
    { label: 'Employment Relations', icon: 'ri-briefcase-line'    },
    { label: 'Delictual Claims',     icon: 'ri-file-damage-line'  },
    { label: 'Insurance Law',        icon: 'ri-shield-check-line' },
    { label: 'Matrimonial Disputes', icon: 'ri-heart-3-line'      },
    { label: 'Contractual Matters',  icon: 'ri-file-text-line'    },
    { label: 'Dispute Resolution',   icon: 'ri-shake-hands-line'    },
    { label: 'Legal Advisory',       icon: 'ri-scales-line'       },
    { label: 'Risk Management',      icon: 'ri-eye-line'          },
    { label: 'Legal Opinions',       icon: 'ri-draft-line'        },
  ];

  const track = document.getElementById('stripTrack');
  if (track) {
    [...SERVICES, ...SERVICES].forEach((s, i) => {
      const item = document.createElement('div');
      item.className = 'strip-item';
      item.innerHTML = `<i class="${s.icon}"></i>${s.label}`;
      track.appendChild(item);
      if (i < SERVICES.length * 2 - 1) {
        const sep = document.createElement('div');
        sep.className = 'strip-sep';
        sep.innerHTML = '<i class="ri-circle-fill"></i>';
        track.appendChild(sep);
      }
    });
  }

  // ── SCROLL REVEAL ────────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── COUNTER ANIMATION ────────────────────────────────────────
  function animateCounter(el) {
    const target  = parseInt(el.dataset.count, 10);
    const suffix  = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && e.target.dataset.count) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ── PARALLAX HERO ────────────────────────────────────────────
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroContent.style.transform = `translateY(${y * 0.18}px)`;
    }, { passive: true });
  }

});
