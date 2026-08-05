/* ============================================================
   NAVBAR SCROLL STATE
   ============================================================ */
function initNavbarScroll(){
  const navbar = document.getElementById('navbar');
  if(!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
}

/* ============================================================
   REVEAL-ON-SCROLL ANIMATIONS
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, {threshold:.15});

function observeReveals(){
  document.querySelectorAll('.section-head, .grid-3, .grid-4, .value-card, .team-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

/* ============================================================
   ANIMATED STAT COUNTERS (home page stats strip)
   ============================================================ */
function animateStats(){
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let cur = 0;
    const step = Math.max(1, Math.round(target/60));
    const timer = setInterval(() => {
      cur += step;
      if(cur >= target){ cur = target; clearInterval(timer); }
      el.textContent = cur.toLocaleString();
    }, 16);
  });
}

function observeStats(){
  const stripEl = document.querySelector('.stats-strip');
  if(!stripEl) return;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ animateStats(); statsObserver.disconnect(); } });
  }, {threshold:.4});
  statsObserver.observe(stripEl);
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function toggleMobileMenu(open){
  document.getElementById('mobileMenu').classList.toggle('open', open);
}
