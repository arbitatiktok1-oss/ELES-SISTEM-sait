(() => {
  const menuBtn = document.getElementById('menuBtn');
  const drawer = document.getElementById('menuDrawer');
  const backdrop = document.getElementById('menuBackdrop');
  const closeBtn = document.getElementById('menuClose');
  const body = document.body;

  const toggleMenu = (open) => {
    menuBtn.classList.toggle('is-open', open);
    drawer.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
  };

  menuBtn.addEventListener('click', () => toggleMenu(!drawer.classList.contains('is-open')));
  closeBtn.addEventListener('click', () => toggleMenu(false));
  backdrop.addEventListener('click', () => toggleMenu(false));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  document.querySelectorAll('.animate').forEach(el => {
    const d = el.style.getPropertyValue('--d');
    if (d) el.style.transitionDelay = d;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, {threshold: .12, rootMargin: '0px 0px -9% 0px'});

  document.querySelectorAll('.animate').forEach(el => io.observe(el));

  const counter = document.querySelector('[data-count]');
  if (counter) {
    let done = false;
    const end = Number(counter.dataset.count || counter.textContent) || 12;
    const counterIO = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || done) return;
      done = true;
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        counter.textContent = String(Math.round(end * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.disconnect();
    }, {threshold:.6});
    counterIO.observe(counter);
  }
})();
