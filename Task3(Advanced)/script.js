gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && window.matchMedia('(hover:hover)').matches) {
  const dot = document.getElementById('cursorDot');
  window.addEventListener('pointermove', (e) => {
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
  });
}

function splitToChars(el){
  const words = el.textContent.split(' ');
  el.innerHTML = words.map(w =>
    `<span style="display:inline-block;">${
      w.split('').map(c => `<span class="char">${c}</span>`).join('')
    }</span>&nbsp;`
  ).join('');
  return el.querySelectorAll('.char');
}

const heroLines = document.querySelectorAll('.hero h1 .line');
let heroChars = [];
heroLines.forEach(line => heroChars.push(...splitToChars(line)));

let mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .set(heroChars, { yPercent: 120, opacity: 0 })
    .set('.eyebrow, .hero p, .hero-cta, .scroll-cue', { opacity: 0, y: 14 })
    .to(heroChars, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.016 })
    .to('.eyebrow', { opacity: 1, y: 0, duration: 0.45 }, '-=0.55')
    .to('.hero p', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.45 }, '-=0.25')
    .to('.scroll-cue', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');

  return () => heroTl.kill();
});

mm.add('(prefers-reduced-motion: reduce)', () => {
  gsap.set([heroChars, '.eyebrow', '.hero p', '.hero-cta', '.scroll-cue'], { opacity: 1, y: 0, yPercent: 0 });
});

mm.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.utils.toArray('.stat-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 24, duration: 0.55, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' },
      delay: i * 0.06
    });
  });

  document.querySelectorAll('.stat-num').forEach(num => {
    const target = +num.dataset.count;
    ScrollTrigger.create({
      trigger: num, start: 'top 90%', once: true,
      onEnter: () => gsap.to(num, {
        innerText: target, duration: 1.2, ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate: function(){ num.textContent = Math.round(this.targets()[0].innerText); }
      })
    });
  });
});

mm.add('(prefers-reduced-motion: reduce)', () => {
  document.querySelectorAll('.stat-num').forEach(num => num.textContent = num.dataset.count);
});
mm.add("(min-width: 768px)", () => {

  const track = document.getElementById("pinTrack");

  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 64),
    ease: "none",
    scrollTrigger: {
      trigger: ".pin-section",
      start: "top top",
      end: () => "+=" + (track.scrollWidth - window.innerWidth + 64),
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true
    }
  });

  return () => {
    if (tween.scrollTrigger) tween.scrollTrigger.kill();
    tween.kill();
  };

});

if (window.innerWidth < 768) {
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.pin) {
      trigger.kill();
    }
  });
}

if (!prefersReduced && window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.feature-card').forEach(card => {
    const strength = 12;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: x * strength, rotateX: -y * strength,
        transformPerspective: 600, duration: 0.35, ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power2.out' });
    });
  });
}

mm.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.utils.toArray('.process-item').forEach(item => {
    const fill = item.querySelector('.process-bar-fill');
    gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%' } })
      .from(item, { opacity: 0, x: -18, duration: 0.45, ease: 'power3.out' })
      .to(fill, { width: fill.dataset.fill + '%', duration: 0.8, ease: 'power2.out' }, '-=0.2');
  });
});
mm.add('(prefers-reduced-motion: reduce)', () => {
  document.querySelectorAll('.process-bar-fill').forEach(f => f.style.width = f.dataset.fill + '%');
});

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const track = document.getElementById('marqueeTrack');
  track.parentElement.insertAdjacentHTML('beforeend', track.outerHTML);

  const marqueeTween = gsap.to('.marquee span', {
    xPercent: -100, duration: 22, ease: 'none', repeat: -1
  });

  document.querySelector('footer').addEventListener('mouseenter', () => marqueeTween.timeScale(0.15));
  document.querySelector('footer').addEventListener('mouseleave', () => marqueeTween.timeScale(1));

  return () => marqueeTween.kill();
});

document.getElementById('ctaBtn').addEventListener('click', () => {
  document.getElementById('work').scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
});

window.addEventListener('load', () => ScrollTrigger.refresh());
let resizeT;
window.addEventListener('resize', () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => ScrollTrigger.refresh(), 200);
});