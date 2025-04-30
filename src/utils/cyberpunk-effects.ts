/**
 * Cyberpunk theme effects utility functions
 * Contains handlers for interactive effects like click ripples, hover effects, and theme toggling
 */

// Click ripple effect handler
export const handleRippleEffect = (event: React.MouseEvent<HTMLElement>, color: 'purple' | 'green' | 'blue' = 'purple') => {
  const element = event.currentTarget;
  
  // Set the position variables
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / element.offsetWidth) * 100;
  const y = ((event.clientY - rect.top) / element.offsetHeight) * 100;
  
  // Apply the position to the element using CSS variables
  element.style.setProperty('--x', `${x}%`);
  element.style.setProperty('--y', `${y}%`);
  
  // Add the color class if not already present
  if (!element.classList.contains(`click-ripple`)) {
    element.classList.add('click-ripple');
  }
  
  if (!element.classList.contains(color)) {
    element.classList.add(color);
  }
  
  // Trigger the animation
  element.classList.add('clicked');
  
  // Remove the clicked class after animation completes
  setTimeout(() => {
    element.classList.remove('clicked');
  }, 600);
};

// Toggle the cyberpunk theme
export const toggleCyberpunkTheme = (enabled: boolean) => {
  const root = document.documentElement;
  
  if (enabled) {
    root.classList.add('cyberpunk-enabled');
    
    // Add grid overlay to specific sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('cyberpunk-grid');
    });
    
    // Add scan line effect to cards and feature sections
    document.querySelectorAll('.card, .feature').forEach(element => {
      element.classList.add('scan-line');
    });
    
    // Add neon borders to buttons and cards
    document.querySelectorAll('button, .card').forEach(element => {
      element.classList.add('neon-border');
    });
    
    // Add hover glow to interactive elements
    document.querySelectorAll('a, button, .interactive').forEach(element => {
      element.classList.add('hover-glow');
    });
    
    // Add digital noise overlay
    document.body.classList.add('digital-noise');
    
  } else {
    // Remove all cyberpunk classes
    root.classList.remove('cyberpunk-enabled');
    
    document.querySelectorAll('.cyberpunk-grid, .scan-line, .neon-border, .hover-glow').forEach(element => {
      element.classList.remove('cyberpunk-grid', 'scan-line', 'neon-border', 'hover-glow');
    });
    
    document.body.classList.remove('digital-noise');
  }
};

// Apply hover tracking effect to an element
export const applyHoverTracking = (element: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const distanceX = (x - centerX) / centerX; // -1 to 1
    const distanceY = (y - centerY) / centerY; // -1 to 1
    
    // Apply subtle rotation based on mouse position
    element.style.transform = `perspective(1000px) rotateY(${distanceX * 5}deg) rotateX(${-distanceY * 5}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Add highlight based on mouse position
    element.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(153, 69, 255, 0.1) 0%,
        transparent 50%
      ),
      ${element.dataset.originalBg || 'transparent'}
    `;
  };
  
  const handleMouseLeave = () => {
    if (!element) return;
    element.style.transform = '';
    element.style.background = element.dataset.originalBg || '';
  };
  
  const handleMouseEnter = () => {
    if (!element) return;
    // Store original background to restore on mouse leave
    if (!element.dataset.originalBg) {
      element.dataset.originalBg = window.getComputedStyle(element).background;
    }
  };
  
  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mousemove', handleMouseMove as EventListener);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mousemove', handleMouseMove as EventListener);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Add interactive scrolling effects
export const addScrollEffects = () => {
  // Function to check if element is in viewport
  const isInViewport = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };
  
  // Apply reveal animations on scroll
  const handleScroll = () => {
    // Get all elements with reveal class that haven't been animated
    document.querySelectorAll('.reveal:not(.revealed)').forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('card-reveal', 'revealed');
      }
    });
  };
  
  // Listen for scroll
  window.addEventListener('scroll', handleScroll);
  
  // Initialize on first call
  handleScroll();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Initialize all cyberpunk effects
export const initCyberpunkEffects = (enable = true) => {
  if (typeof window === 'undefined') return;
  
  if (enable) {
    // Initial setup
    toggleCyberpunkTheme(true);
    
    // Apply interactive effects
    const interactiveElements = document.querySelectorAll('.interactive-hover');
    const cleanupFns = Array.from(interactiveElements).map(element => 
      applyHoverTracking(element as HTMLElement)
    );
    
    // Add scroll effects
    const scrollCleanup = addScrollEffects();
    
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', (e) => handleRippleEffect(e as any));
    });
    
    // Return cleanup function
    return () => {
      cleanupFns.forEach(cleanup => cleanup());
      scrollCleanup();
      toggleCyberpunkTheme(false);
    };
  }
  
  return () => {};
};