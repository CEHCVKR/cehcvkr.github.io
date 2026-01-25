/* ====================================================
   CYBERSECURITY PORTFOLIO - JAVASCRIPT
   ==================================================== */

(function() {
    'use strict';

    // ====================================================
    // BOOT SCREEN ANIMATION
    // ====================================================
    const bootScreen = document.getElementById('boot-screen');
    
    if (bootScreen) {
        // Hide boot screen after 4 seconds
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 4000);
    }

    // ====================================================
    // NAVBAR SCROLL EFFECT
    // ====================================================
    const navbar = document.querySelector('.cyber-navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ====================================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ====================================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile navbar if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                    
                    // Smooth scroll to section
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ====================================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ====================================================
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // ====================================================
    // TYPEWRITER EFFECT
    // ====================================================
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        let index = 0;
        
        typewriterElement.textContent = '';
        
        function type() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        
        // Start typewriter after boot screen
        setTimeout(type, 4200);
    }

    // ====================================================
    // ENCRYPTED TEXT DECRYPTION ANIMATION
    // ====================================================
    const encryptedElements = document.querySelectorAll('.encrypted-text');
    
    encryptedElements.forEach(element => {
        const originalText = element.getAttribute('data-original');
        const encryptedText = element.textContent;
        
        // Decrypt on scroll into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    decryptText(element, encryptedText, originalText);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });

    function decryptText(element, encrypted, original) {
        const duration = 2000;
        const startTime = Date.now();
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            let result = '';
            for (let i = 0; i < original.length; i++) {
                if (progress * original.length > i) {
                    result += original[i];
                } else {
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            
            element.textContent = result;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = original;
            }
        }
        
        animate();
    }

    // ====================================================
    // COUNTER ANIMATION FOR STATS
    // ====================================================
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = Date.now();
        const startValue = 0;
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(startValue + (target - startValue) * easeOutQuad(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        update();
    }

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    // ====================================================
    // SKILL BARS ANIMATION
    // ====================================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });

    // ====================================================
    // SCROLL REVEAL ANIMATION
    // ====================================================
    const revealElements = document.querySelectorAll('.skill-category, .cert-card, .project-card, .timeline-item');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ====================================================
    // DECRYPT TEXT ANIMATION FOR SECTION TITLES
    // ====================================================
    const decryptTexts = document.querySelectorAll('.decrypt-text');
    
    decryptTexts.forEach(element => {
        const originalText = element.textContent;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    decryptTitle(element, originalText);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });

    function decryptTitle(element, originalText) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const duration = 1000;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            let result = '';
            for (let i = 0; i < originalText.length; i++) {
                if (originalText[i] === ' ') {
                    result += ' ';
                } else if (progress * originalText.length > i) {
                    result += originalText[i];
                } else {
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            
            element.textContent = result;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = originalText;
            }
        }
        
        animate();
    }

    // ====================================================
    // TERMINAL REVEAL TEXT ANIMATION
    // ====================================================
    const terminalBox = document.querySelector('.terminal-box');
    
    if (terminalBox) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const revealTexts = entry.target.querySelectorAll('.reveal-text');
                    revealTexts.forEach((text, index) => {
                        setTimeout(() => {
                            text.style.opacity = '1';
                        }, 300 + (index * 200));
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(terminalBox);
    }

    // ====================================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ====================================================
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ====================================================
    // CYBER GRID ANIMATION ON MOUSE MOVE
    // ====================================================
    const cyberGrid = document.querySelector('.cyber-grid');
    
    if (cyberGrid) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            cyberGrid.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        });
    }

    // ====================================================
    // PROJECT CARD TILT EFFECT
    // ====================================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ====================================================
    // CERTIFICATION CARD TILT EFFECT
    // ====================================================
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ====================================================
    // TECH TAG RANDOM GLOW EFFECT
    // ====================================================
    const techTags = document.querySelectorAll('.tech-tag');
    
    function randomGlow() {
        if (techTags.length > 0) {
            const randomIndex = Math.floor(Math.random() * techTags.length);
            const tag = techTags[randomIndex];
            
            tag.style.borderColor = 'var(--cyber-primary)';
            tag.style.color = 'var(--cyber-primary)';
            tag.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.5)';
            
            setTimeout(() => {
                tag.style.borderColor = '';
                tag.style.color = '';
                tag.style.boxShadow = '';
            }, 1000);
        }
    }
    
    setInterval(randomGlow, 2000);

    // ====================================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // ====================================================
    document.addEventListener('keydown', (e) => {
        // Press 'T' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    });

    // ====================================================
    // PERFORMANCE OPTIMIZATION - DEBOUNCE SCROLL EVENTS
    // ====================================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    const debouncedActiveNav = debounce(updateActiveNav, 100);
    window.addEventListener('scroll', debouncedActiveNav);

    // ====================================================
    // LOADING PERFORMANCE - PRELOAD CRITICAL RESOURCES
    // ====================================================
    window.addEventListener('load', () => {
        // Remove any loading states
        document.body.classList.add('loaded');
        
        // Log performance metrics in development
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }
    });

    // ====================================================
    // ACCESSIBILITY - FOCUS VISIBLE FOR KEYBOARD USERS
    // ====================================================
    let isMouseUser = false;
    
    document.addEventListener('mousedown', () => {
        isMouseUser = true;
        document.body.classList.add('mouse-user');
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            isMouseUser = false;
            document.body.classList.remove('mouse-user');
        }
    });

    // ====================================================
    // ERROR HANDLING FOR MISSING ELEMENTS
    // ====================================================
    const criticalElements = [
        { selector: '.hero-section', name: 'Hero Section' },
        { selector: '.cyber-navbar', name: 'Navigation Bar' },
        { selector: '#skills', name: 'Skills Section' }
    ];

    criticalElements.forEach(({ selector, name }) => {
        if (!document.querySelector(selector)) {
            console.warn(`Warning: ${name} (${selector}) not found in DOM`);
        }
    });

    // ====================================================
    // CONSOLE MESSAGE FOR DEVELOPERS
    // ====================================================
    console.log('%c🔒 CYBERSECURITY PORTFOLIO', 'color: #00ff41; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with security in mind', 'color: #00d9ff; font-size: 14px;');
    console.log('%cInterested in the code? Check out the source!', 'color: #94a3b8; font-size: 12px;');

    // ====================================================
    // PREVENT RIGHT-CLICK (OPTIONAL - REMOVE IF NOT NEEDED)
    // ====================================================
    // Uncomment if you want to disable right-click
    // document.addEventListener('contextmenu', (e) => {
    //     e.preventDefault();
    //     console.log('Right-click disabled for security demonstration');
    // });

    // ====================================================
    // EASTER EGG - KONAMI CODE
    // ====================================================
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #ff006e; font-size: 24px; font-weight: bold;');
        
        // Add special effect
        document.body.style.animation = 'rainbow 2s linear';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    // ====================================================
    // INITIALIZE ALL COMPONENTS
    // ====================================================
    function init() {
        console.log('Portfolio initialized successfully');
        
        // Set initial states
        updateActiveNav();
        
        // Add loaded class for CSS transitions
        setTimeout(() => {
            document.body.classList.add('initialized');
        }, 100);
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ====================================================
// RAINBOW ANIMATION FOR EASTER EGG
// ====================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
