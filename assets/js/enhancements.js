// Enhanced JavaScript functionality for w-electro website

document.addEventListener('DOMContentLoaded', function() {
  // Get all links inside nav
  const navLinks = document.querySelectorAll('header nav a, .md\\:hidden a');
  
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
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        
        // Close mobile menu if open
        if (window.innerWidth < 768) {
          const mobileMenuButton = document.querySelector('button[aria-expanded="true"]');
          if (mobileMenuButton) {
            mobileMenuButton.click();
          }
        }
        
        // Add active class to the clicked nav link
        navLinks.forEach(item => {
          item.classList.remove('text-cyan-600');
          item.classList.add('text-gray-600');
        });
        
        this.classList.remove('text-gray-600');
        this.classList.add('text-cyan-600');
      }
    });
  });
  
  // Fix mobile menu toggle
  const mobileMenuButton = document.querySelector('button[aria-expanded]');
  const mobileMenu = document.querySelector('.md\\:hidden.mt-4.py-4');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      // Add fade animation for smoother transition
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
          mobileMenu.style.opacity = '1';
        }, 10);
      } else {
        mobileMenu.style.opacity = '0';
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
      }
    });
  }
  
  // Enhanced service cards hover effect
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
      
      // Find and animate icon
      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.background = 'rgba(33, 166, 184, 0.2)';
        icon.style.color = '#fff';
      }
      
      // Animate price tag
      const priceTag = this.querySelector('.price-tag');
      if (priceTag) {
        priceTag.style.background = '#ffffff';
        priceTag.style.color = '#ff6e42';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      
      // Reset icon
      const icon = this.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = '';
        icon.style.background = '';
        icon.style.color = '';
      }
      
      // Reset price tag
      const priceTag = this.querySelector('.price-tag');
      if (priceTag) {
        priceTag.style.background = '';
        priceTag.style.color = '';
      }
    });
  });
  
  // Fix scroll to top button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Fix for scroll animations
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-fadeInUp');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        // Check if element has delay class
        if (element.classList.contains('delay-100')) {
          element.style.animationDelay = '0.1s';
        } else if (element.classList.contains('delay-200')) {
          element.style.animationDelay = '0.2s';
        } else if (element.classList.contains('delay-300')) {
          element.style.animationDelay = '0.3s';
        } else if (element.classList.contains('delay-400')) {
          element.style.animationDelay = '0.4s';
        } else if (element.classList.contains('delay-500')) {
          element.style.animationDelay = '0.5s';
        }
        
        // Add animation
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Run once on page load
  animateOnScroll();
  
  // Fix navigation highlighting based on scroll position
  const updateNavHighlight = function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a, .md\\:hidden a');
    let scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-cyan-600');
          link.classList.add('text-gray-600');
          
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.remove('text-gray-600');
            link.classList.add('text-cyan-600');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', updateNavHighlight);
  updateNavHighlight();
  
  // Setup particles for hero section
  setupParticles();
});

// Function to set up particles
function setupParticles() {
  // Check if particles container already exists
  if (!document.querySelector('.particles-container')) {
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    // Append to the home section
    const homeSection = document.querySelector('#home');
    if (homeSection) {
      homeSection.appendChild(particlesContainer);
      
      // Create particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and size
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15;
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Set styles
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: rgba(33, 166, 184, ${opacity});
          border-radius: 50%;
          top: ${posY}%;
          right: ${posX}%;
          opacity: 0;
          animation: float ${duration}s linear infinite;
          animation-delay: ${delay}s;
          z-index: -1;
        `;
        
        particlesContainer.appendChild(particle);
      }
      
      // Add animation keyframes if not already added
      if (!document.querySelector('#particle-animation')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'particle-animation';
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
              transform: translateY(-300px) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(styleSheet);
      }
    }
  }
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('#contact form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        nameInput.classList.add('border-red-500');
        isValid = false;
      } else {
        nameInput.classList.remove('border-red-500');
      }
      
      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
        emailInput.classList.add('border-red-500');
        isValid = false;
      } else {
        emailInput.classList.remove('border-red-500');
      }
      
      if (!messageInput.value.trim()) {
        messageInput.classList.add('border-red-500');
        isValid = false;
      } else {
        messageInput.classList.remove('border-red-500');
      }
      
      if (isValid) {
        // Here you would typically send the form data to a server
        // For demo purposes, show a success message
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
        contactForm.reset();
      } else {
        alert('يرجى ملء جميع الحقول المطلوبة بشكل صحيح.');
      }
    });
  }
});

// Email validation helper function
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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
    const navLinks = document.querySelectorAll('header nav a, .md\\:hidden a');
    navLinks.forEach(link => {
      link.classList.remove('text-cyan-600');
      link.classList.add('text-gray-600');
    });
    
    document.querySelectorAll(`header nav a[href="${sectionId}"], .md\\:hidden a[href="${sectionId}"]`).forEach(link => {
      link.classList.remove('text-gray-600');
      link.classList.add('text-cyan-600');
    });
  }
}