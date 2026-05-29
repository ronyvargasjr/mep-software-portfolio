/* ── Mobile nav ── */
const burger = document.getElementById('burger');
const nm     = document.getElementById('nm');

burger.addEventListener('click', () => nm.classList.toggle('open'));
nm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nm.classList.remove('open')));

/* ── Active nav link ── */
const sects     = [...document.querySelectorAll('section[id]')];
const navLinks  = [...document.querySelectorAll('.nav-menu a')];

function updateActive() {
  let cur = sects[0].id;
  sects.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) cur = s.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}
window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

/* ── Scroll reveal ── */
const rvEls = document.querySelectorAll('.rv');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    // stagger siblings
    const sibs = [...e.target.parentElement.querySelectorAll('.rv')];
    const delay = sibs.indexOf(e.target) * 85;
    setTimeout(() => e.target.classList.add('in'), delay);
    io.unobserve(e.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
rvEls.forEach(el => io.observe(el));

/* ── Skills tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(btn.dataset.panel);
    panel.classList.add('active');
    // trigger reveal for newly shown panel
    panel.querySelectorAll('.rv').forEach((el, i) => {
      if (!el.classList.contains('in')) {
        setTimeout(() => el.classList.add('in'), i * 85);
      }
    });
  });
});

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
