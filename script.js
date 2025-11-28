// Dark/Light Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '🌘' : '🌗';
  localStorage.setItem('theme', theme);
}
function toggleTheme() {
  const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(theme);
}
themeToggleBtn.addEventListener('click', toggleTheme);

// On load, set theme from localStorage or default
window.addEventListener('DOMContentLoaded', () => {
  setTheme(localStorage.getItem('theme') || 'light');
});

// Animated Hero Dynamic Text Loop
const dtSpans = document.querySelectorAll('.dynamic-text span');
let dtIndex = 0;
function heroDynamicLoop() {
  dtSpans.forEach(e => e.classList.remove('active'));
  dtSpans[dtIndex].classList.add('active');
  dtIndex = (dtIndex + 1) % dtSpans.length;
}
if (dtSpans.length > 0) {
  dtSpans[0].classList.add('active');
  setInterval(heroDynamicLoop, 2200);
}

// Animated Particle Background
const canvas = document.getElementById('particle-bg');
if (canvas) {
  let ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize(); window.addEventListener('resize', resize);

  function randomColor() {
    return `rgba(${30+Math.random()*70},${60+Math.random()*120},${180+Math.random()*40},${.1+Math.random()*.22})`;
  }
  function createParticles(n) {
    for (let i=0;i<n;i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 8+Math.random()*24,
        dx: (Math.random()-.5)*.4,
        dy: (Math.random()-.5)*.5,
        color: randomColor(),
        opacity: .09+.19*Math.random()
      });
    }
  }
  createParticles(window.innerWidth < 800 ? 40 : 80);
  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if(p.x<-40||p.x>canvas.width+40) p.x = Math.random()*canvas.width;
      if(p.y<-40||p.y>canvas.height+40) p.y = Math.random()*canvas.height;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

// Sticky Navbar Active Indicator
const navLinks = document.querySelectorAll('.nav-link');
const navbarIndicator = document.querySelector('.navbar-indicator');
function updateNavIndicator() {
  let active = document.querySelector('.nav-link.active');
  if (!active || !navbarIndicator) return;
  let rect = active.getBoundingClientRect();
  let navRect = active.parentElement.getBoundingClientRect();
  navbarIndicator.style.left = (rect.left - navRect.left) + 'px';
  navbarIndicator.style.width = rect.width + 'px';
}
window.addEventListener('resize', updateNavIndicator);
navLinks.forEach(link => {
  link.addEventListener('click', function(e){
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    updateNavIndicator();
  });
});
window.addEventListener('DOMContentLoaded', updateNavIndicator);

// Smooth Section Scrolling & Active Nav
const sectionIds = ['hero','about','education','skills','projects','achievements','hobbies','contact'];
window.addEventListener('scroll', ()=>{
  let scrollPos = window.scrollY + 40;
  sectionIds.forEach((id,i)=>{
    const el = document.getElementById(id);
    if(el){
      const offset = el.offsetTop, height = el.offsetHeight;
      if(scrollPos >= offset && scrollPos < offset+height) {
        navLinks.forEach(l=>l.classList.remove('active'));
        if(navLinks[i]) navLinks[i].classList.add('active');
        updateNavIndicator();
      }
    }
  });
});

// Scroll-triggered fade-in animation
const fadeSections = document.querySelectorAll('.fade-in');
const revealEls = document.querySelectorAll('.reveal,.cert-card');
function handleFadeInOnScroll() {
  fadeSections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 80) {
      section.classList.add('fade-in-visible');
    }
  });
  revealEls.forEach(rev => {
    if (rev.getBoundingClientRect().top < window.innerHeight - 80) {
      rev.classList.add('revealed');
    }
  });
}
window.addEventListener('scroll', handleFadeInOnScroll);
window.addEventListener('DOMContentLoaded', handleFadeInOnScroll);

// Skills Progress Bars Animation
window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.progress').forEach(bar=>{
    bar.style.width = bar.getAttribute('style').match(/\d+\%/)?.[0] || '0%';
  });
});

// Projects Tab Filter
const tabButtons = document.querySelectorAll('.tab-button');
const projCards = document.querySelectorAll('.project-card');
tabButtons.forEach(btn=>{
  btn.addEventListener('click',function(){
    tabButtons.forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    projCards.forEach(card=>{
      card.classList.remove('reveal');
      if(filter==='all'||card.classList.contains(filter)) {
        card.style.display = 'block';
        setTimeout(()=>card.classList.add('reveal'),120);
      }
      else {
        card.style.display = 'none';
      }
    });
  });
});

// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const status = document.getElementById('form-status');
  const validEmail = /^([a-zA-Z0-9_.\-+])+@([a-zA-Z0-9\-]+\.)+([a-zA-Z]{2,})$/;
  if (!name || !email || !message) {
    status.textContent = "Please fill all fields.";
    status.style.color = "#e04e4e";
    return false;
  }
  if (!validEmail.test(email)) {
    status.textContent = "Please enter a valid email.";
    status.style.color = "#e04e4e";
    return false;
  }
  status.textContent = "Thank you! Your message has been sent.";
  status.style.color = "#04bfae";
  this.reset();
  return false;
});