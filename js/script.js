/* ═══════════════════════════════════════════════════════════
   Gaston Software Solutions LLP — Test Site JS
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ── Theme ────────────────────────────────────────────────────
const html       = document.documentElement;
const themeBtn   = document.getElementById('themeToggle');
const THEME_KEY  = 'gss-theme';

function setTheme(t) {
  html.setAttribute('data-theme', t);
  if (themeBtn) themeBtn.textContent = t === 'dark' ? '🌙' : '☀️';
  localStorage.setItem(THEME_KEY, t);
}

setTheme(localStorage.getItem(THEME_KEY) || 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// ── Mobile nav burger ────────────────────────────────────────
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Sticky header shadow ─────────────────────────────────────
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
}

// ── Hero counter animation ───────────────────────────────────
function animateCounter(el, target, duration) {
  let start = null;
  const suffix = el.nextElementSibling;
  const hasSuffix = suffix && suffix.classList.contains('stat-suffix');

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    // ease-out quad
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statEls = document.querySelectorAll('.stat-n[data-target]');
if (statEls.length && 'IntersectionObserver' in window) {
  const statsIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.target, 10), 1400);
        statsIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  statEls.forEach(el => statsIO.observe(el));
}

// ── Hero h1 fade-in ──────────────────────────────────────────
const heroH1 = document.querySelector('.hero-h1');
if (heroH1) {
  heroH1.style.opacity  = '0';
  heroH1.style.transform = 'translateY(12px)';
  heroH1.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  setTimeout(() => {
    heroH1.style.opacity  = '1';
    heroH1.style.transform = 'translateY(0)';
  }, 80);
}

// ── Scroll-reveal for .reveal elements ──────────────────────
if ('IntersectionObserver' in window) {
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // stagger siblings in the same grid
        const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(e.target);
        setTimeout(() => e.target.classList.add('visible'), idx * 80);
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));
}

// ── Pipeline step stagger ────────────────────────────────────
const pipeSteps = document.querySelectorAll('.pipeline-step');
pipeSteps.forEach((step, i) => {
  step.style.opacity   = '0';
  step.style.transform = 'translateY(10px)';
  step.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  if ('IntersectionObserver' in window) {
    const pipeIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.opacity   = '1';
            e.target.style.transform = 'translateY(0)';
          }, i * 120);
          pipeIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    pipeIO.observe(step);
  }
});

// ── Pipeline deploy meta ─────────────────────────────────────
const deployTimeEl = document.getElementById('deploy-time');
const buildIdEl    = document.getElementById('build-id');

if (deployTimeEl) {
  deployTimeEl.textContent = new Date().toLocaleString('en-UG', {
    dateStyle: 'medium', timeStyle: 'short'
  });
}
if (buildIdEl) {
  buildIdEl.textContent = 'gss-' + Date.now().toString(36).toUpperCase();
}

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

if (sections.length && navAs.length && 'IntersectionObserver' in window) {
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navIO.observe(s));
}

console.log('✅ Gaston Software Solutions LLP — Test site loaded');
