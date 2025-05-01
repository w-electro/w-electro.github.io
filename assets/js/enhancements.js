// Enhanced JavaScript functionality for w-electro website

document.addEventListener('DOMContentLoaded', function() {
  // Get all links inside nav
  const navLinks = document.querySelectorAll('#nav a');
  
  // Add click event listener to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the target section id from the href attribute
      const targetId = this.getAttribute('href');
      
      // Skip if it's an external link
      if (targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        
        // Get the target element
        const targetElement = document.querySelector(targetId);
        
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Add active class to the clicked nav link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Set home as active by default
  document.querySelector('#nav a[href="#"]').classList.add('active');
  
  // Setup particles animation for hero section
  setupParticles();
  
  // Setup intersection observer for animation
  setupScrollAnimations();
  
  // Enhance service cards
  enhanceServiceCards();
});

// Function to set up particles
function setupParticles() {
  // Create particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  
  // Append to the intro section
  const introSection = document.querySelector('#home');
  if (introSection) {
    introSection.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random styling
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 15 + 5}px;
        height: ${Math.random() * 15 + 5}px;
        background: rgba(76, 187, 185, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        z-index: -1;
      `;
      
      particlesContainer.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0) rotate(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
}

// Function to set up scroll animations
function setupScrollAnimations() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.panel');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when section is visible
          entry.target.classList.add('visible');
          
          // Animate service cards sequentially
          if (entry.target.querySelectorAll('.service-card').length) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.animation = `fadeInUp 0.5s ${index * 0.1}s forwards`;
              }, 100);
            });
          }
        }
      });
    }, {
      threshold: 0.1
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
}

// Function to enhance service cards
function enhanceServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Add hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(33, 166, 184, 0.2)';
      
      // Find icon and change color
      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      
      // Reset icon
      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
}

// Function to handle scroll to section
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
    
    // Update active navigation
    const navLinks = document.querySelectorAll('#nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`#nav a[href="${sectionId}"]`).classList.add('active');
  }
}

// Monitor scroll position to update active navigation
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  
  // Get all sections
  const sections = document.querySelectorAll('article[id]');
  
  // Find the current section
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
      currentSection = '#' + section.getAttribute('id');
    }
  });
  
  // Update active navigation
  if (currentSection) {
    const navLinks = document.querySelectorAll('#nav a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  }
});