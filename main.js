// =============================================
// Navigation Scroll Effect
// =============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =============================================
// Mobile Navigation Toggle
// =============================================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// =============================================
// Scroll Reveal Animation (IntersectionObserver)
// =============================================
const revealElements = document.querySelectorAll('.reveal, .stagger');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// Smooth Scroll for anchor links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =============================================
// Active nav link highlight on scroll
// =============================================
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
};

window.addEventListener('scroll', highlightNav);

// =============================================
// Animate stat numbers on scroll
// =============================================
const animateCounters = () => {
  const statNumbers = document.querySelectorAll('.stat-card__number');
  statNumbers.forEach(stat => {
    if (stat.dataset.animated) return;

    const rect = stat.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      stat.dataset.animated = 'true';
      const text = stat.textContent;
      const match = text.match(/(\d+)/);
      if (match) {
        const target = parseInt(match[0]);
        const suffix = text.replace(match[0], '');
        let current = 0;
        const increment = target / 35;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current) + suffix;
        }, 30);
      }
    }
  });
};

window.addEventListener('scroll', animateCounters);
