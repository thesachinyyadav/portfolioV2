// Animation variants for Intersection Observer
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.28, 0.11, 0.32, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Intersection Observer setup
const createObserver = (options = {}) => {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('motion-safe:animate-fade-in', 'motion-safe:animate-slide-up');
      }
    });
  }, {
    threshold: 0.1,
    ...options
  });
};

// Initialize animations
const initAnimations = () => {
  const observer = createObserver();
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
};

// Smooth scroll navigation
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Dynamic navbar
const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const threshold = 50;
  
  const updateNavbar = () => {
    if (window.scrollY > threshold) {
      navbar.classList.add('glass-nav', 'shadow-sm');
    } else {
      navbar.classList.remove('glass-nav', 'shadow-sm');
    }
  };

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();
};

// Theme switcher
const initThemeSwitcher = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  const setTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    setTheme(prefersDark.matches);
  }

  themeToggle?.addEventListener('click', () => {
    setTheme(!document.documentElement.classList.contains('dark'));
  });
};

// Hover effect for cards
const initCardEffects = () => {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${angleX}deg) 
        rotateY(${angleY}deg) 
        scale3d(1.02, 1.02, 1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
    });
  });
};

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initSmoothScroll();
  initNavbar();
  initThemeSwitcher();
  initCardEffects();
});