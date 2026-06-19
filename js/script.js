const invitation = {
  age: 2,
  eventDate: '2026-06-28T09:00:00',
  dateText: 'Minggu, 28 Juni 2026',
  timeText: '10.00 WIB sampai selesai',
  placeText: 'Rumah Kami',
};

document.getElementById('ageText').innerText = 'Hafsha Prajalita Sutiawan';
document.getElementById('dateText').innerText = invitation.dateText;
document.getElementById('timeText').innerText = invitation.timeText;
document.getElementById('placeText').innerText = invitation.placeText;

const cover    = document.getElementById('cover');
const music    = document.getElementById('birthdayMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying  = false;

/* ── OPEN INVITATION ── */
function openInvitation() {
  cover.classList.add('hide');
  launchFireworks();
  music.play()
    .then(() => { isPlaying = true;  musicBtn.innerText = '❚❚'; musicBtn.classList.add('playing'); })
    .catch(() => { isPlaying = false; musicBtn.innerText = '♫'; });
}

/* ── TOGGLE MUSIC ── */
function toggleMusic() {
  if (isPlaying) {
    music.pause();
    musicBtn.innerText = '♫';
    musicBtn.classList.remove('playing');
  } else {
    music.play();
    musicBtn.innerText = '❚❚';
    musicBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
}

/* ── COUNTDOWN ── */
const targetDate = new Date(invitation.eventDate).getTime();

function updateCountdown() {
  const now      = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    ['days','hours','minutes','seconds'].forEach(id => document.getElementById(id).innerText = '00');
    return;
  }

  const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerText    = String(days).padStart(2,'0');
  document.getElementById('hours').innerText   = String(hours).padStart(2,'0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2,'0');

  const secEl    = document.getElementById('seconds');
  const newSec   = String(seconds).padStart(2,'0');
  if (secEl.innerText !== newSec) {
    secEl.innerText      = newSec;
    secEl.style.transform = 'scale(1.25)';
    secEl.style.color     = '#ffffff';
    setTimeout(() => { secEl.style.transform = ''; secEl.style.color = ''; }, 200);
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── STAR BACKGROUND ── */
const starBg = document.getElementById('starBg');
for (let i = 0; i < 60; i++) {
  const s    = document.createElement('div');
  s.className = 'star-dot';
  const size  = Math.random() * 3 + 1;
  s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${2+Math.random()*4}s;animation-delay:${Math.random()*4}s;`;
  starBg.appendChild(s);
}

/* ── CONFETTI ── */
const confettiColors   = ['#f8df86','#ff6b9d','#c44dff','#44d9ff','#ff9f44','#7fff44','#ff4444'];
const confettiContainer = document.getElementById('confettiContainer');
for (let i = 0; i < 60; i++) {
  const c     = document.createElement('div');
  c.className = 'confetti-piece';
  const drift = (Math.random() * 200 - 100);
  c.style.cssText = `left:${Math.random()*100}%;background:${confettiColors[Math.floor(Math.random()*confettiColors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;animation-duration:${4+Math.random()*6}s;animation-delay:${Math.random()*6}s;--drift:${drift}px;`;
  confettiContainer.appendChild(c);
}

/* ── FIREWORKS ── */
function launchFireworks() {
  for (let w = 0; w < 8; w++) {
    setTimeout(() => {
      const fw = document.createElement('div');
      fw.className  = 'firework';
      fw.style.cssText = `left:${20+Math.random()*60}%;top:${10+Math.random()*50}%;`;
      document.body.appendChild(fw);
      const fwColors = ['#f8df86','#ff6b9d','#c44dff','#44d9ff','#ff9f44','#ffffff'];
      for (let p = 0; p < 16; p++) {
        const part    = document.createElement('div');
        part.className = 'fw-particle';
        const angle   = (p / 16) * Math.PI * 2;
        const dist    = 60 + Math.random() * 60;
        part.style.cssText = `background:${fwColors[Math.floor(Math.random()*fwColors.length)]};--fx:${Math.cos(angle)*dist}px;--fy:${Math.sin(angle)*dist}px;animation-delay:${Math.random()*.2}s;`;
        fw.appendChild(part);
      }
      setTimeout(() => fw.remove(), 1200);
    }, w * 300);
  }
}

/* ── SPARKLE ON CLICK ── */
document.addEventListener('click', e => {
  if (e.target.closest('.cover') || e.target.closest('.music-player')) return;
  const symbols = ['✦','★','✨','💫','⭐'];
  for (let i = 0; i < 6; i++) {
    const sp    = document.createElement('div');
    sp.className = 'sparkle';
    sp.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    sp.style.cssText = `left:${e.clientX - 15 + Math.random()*30}px;top:${e.clientY - 15 + Math.random()*30}px;color:#f8df86;font-size:${12+Math.random()*16}px;animation-delay:${Math.random()*.3}s;`;
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 1500);
  }
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), Number(delay));
      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.photo').forEach((el, i)        => { el.dataset.delay = i * 80;  observer.observe(el); });
document.querySelectorAll('.time-box').forEach((el, i)     => { el.dataset.delay = i * 100; observer.observe(el); });
document.querySelectorAll('.detail-box').forEach((el, i)   => { el.dataset.delay = i * 100; observer.observe(el); });
document.querySelectorAll('.gallery img').forEach((el, i)  => { el.dataset.delay = i * 60;  observer.observe(el); });
document.querySelectorAll('.section-title, .main-title, .wish-card').forEach(el => observer.observe(el));

/* ── PARTICLES CANVAS ── */
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x      = Math.random() * canvas.width;
    this.y      = Math.random() * canvas.height;
    this.size   = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color  = Math.random() > 0.5 ? '#f8df86' : '#7fff7f';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();
