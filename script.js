// =========================================================
// AARZOO — Portfolio interactions
// =========================================================

document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- boot sequence ---------- */
const bootLines = [
  '> establishing connection...',
  '> verifying credentials...',
  '> ACCESS GRANTED',
  '> loading profile: AARZOO.dat'
];

function showHeroInstant() {
  document.getElementById('boot').textContent = bootLines.join('\n');
  document.getElementById('heroContent').classList.add('is-visible');
}

function typeBoot() {
  const bootEl = document.getElementById('boot');
  const heroContent = document.getElementById('heroContent');
  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function typeChar() {
    if (lineIndex >= bootLines.length) {
      heroContent.classList.add('is-visible');
      return;
    }
    const currentLine = bootLines[lineIndex];
    if (charIndex < currentLine.length) {
      output += currentLine[charIndex];
      bootEl.textContent = output;
      charIndex++;
      setTimeout(typeChar, 18);
    } else {
      output += '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 180);
    }
  }
  typeChar();
}

if (prefersReducedMotion) {
  showHeroInstant();
} else {
  typeBoot();
}

/* ---------- mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ---------- copy email ---------- */
const copyBtn = document.getElementById('copyEmail');
const copyHint = document.getElementById('copyHint');
const emailAddress = 'aarzoolilar.lilar@gmail.com';

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(emailAddress);
    copyHint.textContent = 'Copied ✓';
  } catch (err) {
    copyHint.textContent = emailAddress;
  }
  setTimeout(() => { copyHint.textContent = 'Click to copy'; }, 2000);
});
