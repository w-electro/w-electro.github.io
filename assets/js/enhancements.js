// Add these scripts at the end of your body tag

// Smooth scrolling for navigation
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
    
    // Particles animation for hero section
    setupParticles();
    
    // Setup intersection observer for animation
    setupScrollAnimations();
  });
  
  // Function to set up particles
  function setupParticles() {
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    // Append to the intro section
    const introSection = document.querySelector('#home');
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
  
  // Replace emoji icons with Font Awesome icons
  document.addEventListener('DOMContentLoaded', function() {
    // Define mapping of emoji to Font Awesome icons
    const iconMapping = {
      '🏦': '<i class="fas fa-university"></i>',
      '📝': '<i class="fas fa-file-alt"></i>',
      '🛒': '<i class="fas fa-shopping-cart"></i>',
      '📄': '<i class="fas fa-file-contract"></i>',
      '🆔': '<i class="fas fa-id-card"></i>',
      '💼': '<i class="fas fa-briefcase"></i>',
      '📊': '<i class="fas fa-chart-line"></i>',
      '🧾': '<i class="fas fa-file-invoice"></i>',
      '🖨️': '<i class="fas fa-cube"></i>',
      '🎭': '<i class="fas fa-palette"></i>',
      '📋': '<i class="fas fa-clipboard-list"></i>',
      '🎉': '<i class="fas fa-birthday-cake"></i>',
      '📱': '<i class="fas fa-mobile-alt"></i>',
      '🎓': '<i class="fas fa-graduation-cap"></i>',
      '📚': '<i class="fas fa-book"></i>',
      '💻': '<i class="fas fa-laptop-code"></i>',
      '🌐': '<i class="fas fa-language"></i>',
      '✍️': '<i class="fas fa-pen-fancy"></i>',
      '📧': '<i class="fas fa-envelope"></i>',
      '📷': '<i class="fab fa-instagram"></i>',
      '🎥': '<i class="fab fa-tiktok"></i>'
    };
    
    // Replace all emoji icons with Font Awesome
    document.querySelectorAll('.service-icon').forEach(icon => {
      const emoji = icon.textContent.trim();
      if (iconMapping[emoji]) {
        icon.innerHTML = iconMapping[emoji];
      }
    });
  });