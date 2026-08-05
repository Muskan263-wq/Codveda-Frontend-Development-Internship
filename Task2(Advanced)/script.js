
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    cursor.style.left = (mx - 6) + 'px'; cursor.style.top = (my - 6) + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = (rx - 18) + 'px'; ring.style.top = (ry - 18) + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a, button, .project-card, .ach-card, .skill-cat').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; ring.style.transform = 'scale(1.5)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; });
  });

  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', e => {
      e.stopPropagation();
    });
  });

  // PARTICLES
  const pWrap = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 15) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    const colors = ['var(--accent)', 'var(--cyan)', 'var(--pink)', 'var(--green)'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    pWrap.appendChild(p);
  }

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // SKILL BARS
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-cat').forEach(c => barObs.observe(c));

  // ACTIVE NAV
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });
// Day-6
  // TYPEWRITER on hero tag
  const tag = document.querySelector('.hero-tag');
  const msgs = ['Available for Internships', 'Open to Opportunities', 'Let\'s Build Something!'];
  let mi = 0, ci = 0, del = false;
  setInterval(() => {
    const full = msgs[mi];
    if (!del) {
      if (ci < full.length) { tag.innerHTML = full.slice(0, ++ci); }
      else { del = true; setTimeout(() => {}, 1200); }
    } else {
      if (ci > 0) { tag.innerHTML = full.slice(0, --ci); }
      else { del = false; mi = (mi + 1) % msgs.length; }
    }
  }, 100);
