(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const stored = (() => { try { return localStorage.getItem('harish-theme'); } catch { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeIcon.textContent = dark ? '☀' : '☾';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    metaTheme.setAttribute('content', dark ? '#202b28' : '#f7f5ed');
    const heroArt = document.querySelector('.hero-landscape');
    const contactArt = document.querySelector('.contact-landscape');
    if (heroArt) heroArt.src = dark ? 'assets/hero-night.svg' : 'assets/hero-landscape.svg';
    if (contactArt) contactArt.src = dark ? 'assets/hero-landscape.svg' : 'assets/hero-night.svg';
    try { localStorage.setItem('harish-theme', theme); } catch {}
  }
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));
  toggle.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  function closeMenu() {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = (index % 3) * 65 + 'ms';
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();