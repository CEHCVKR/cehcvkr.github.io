/* ====================================================
   MODERN CYBERSECURITY PORTFOLIO - JAVASCRIPT
   ==================================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    /* ====================================================
       BOOT SCREEN
       ==================================================== */
    const bootScreen = document.querySelector('.boot-screen');
    
    // Fade out boot screen after 5 seconds
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        
        // Remove from DOM after fade transition completes
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    }, 5000);
    
    /* ====================================================
       NAVIGATION
       ==================================================== */
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile navbar if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('.section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    /* ====================================================
       TERMINAL TYPING EFFECT
       ==================================================== */
    const terminalOutputs = [
        { selector: '.output-1', text: 'Name: CHINNAPAREDDY VENKATA KARTHIK REDDY', delay: 500 },
        { selector: '.output-2', text: 'Role: Cybersecurity Student & Developer', delay: 1500 },
        { selector: '.output-3', text: 'Education: VVIT, CSE (IoT, Cybersecurity, Blockchain)', delay: 2500 },
        { selector: '.output-4', text: 'CGPA: 8.54/10.0', delay: 3500 },
        { selector: '.output-5', text: 'Skills: Python | Network Security | Post-Quantum Cryptography', delay: 4500 }
    ];
    
    function typeText(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        element.classList.add('typing');
        
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                element.classList.remove('typing');
                clearInterval(interval);
            }
        }, speed);
    }
    
    // Start typing after boot screen
    setTimeout(() => {
        terminalOutputs.forEach(output => {
            setTimeout(() => {
                const element = document.querySelector(output.selector);
                if (element) {
                    typeText(element, output.text, 30);
                }
            }, output.delay);
        });
    }, 5500);
    
    /* ====================================================
       COUNTER ANIMATION
       ==================================================== */
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
        countersAnimated = true;
    }
    
    /* ====================================================
       INTERSECTION OBSERVER FOR ANIMATIONS
       ==================================================== */
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in animation
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Animate counters when hero section is visible
                if (entry.target.classList.contains('hero') && !countersAnimated) {
                    setTimeout(() => {
                        animateCounters();
                    }, 800);
                }
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card, .contact-card, .timeline-item');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    /* ====================================================
       SCROLL TO TOP BUTTON (Optional)
       ==================================================== */
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: var(--bg-dark);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 16px rgba(0, 255, 140, 0.3);
    `;
    
    document.body.appendChild(scrollToTop);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /* ====================================================
       SKILL TAG CLICK EFFECT
       ==================================================== */
    const skillTags = document.querySelectorAll('.skill-tag, .tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: inherit;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    /* ====================================================
       FORM VALIDATION (if contact form is added later)
       ==================================================== */
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = this.querySelector('[name="name"]').value.trim();
            const email = this.querySelector('[name="email"]').value.trim();
            const message = this.querySelector('[name="message"]').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Success message (you would typically send to a backend here)
            alert('Message sent successfully! I\'ll get back to you soon.');
            this.reset();
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    /* ====================================================
       COPY TO CLIPBOARD FOR EMAIL
       ==================================================== */
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip or notification
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied to clipboard!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--primary);
                    color: var(--bg-dark);
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 10000;
                    box-shadow: 0 4px 16px rgba(0, 255, 140, 0.5);
                `;
                
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.style.transition = 'opacity 0.3s ease';
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
                // Fallback - open default email client
                window.location.href = this.href;
            });
        });
    });
    
    /* ====================================================
       DYNAMIC YEAR IN FOOTER
       ==================================================== */
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    /* ====================================================
       PERFORMANCE OPTIMIZATION
       ==================================================== */
    // Lazy load images if any (for future use)
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    /* ====================================================
       CONSOLE EASTER EGG
       ==================================================== */
    console.log('%c  ____      _                ____            _    __       _ _       ', 'color: #00FF8C; font-weight: bold;');
    console.log('%c / ___|   _| |__   ___ _ __ |  _ \\ ___  _ __| |_ / _| ___ | (_) ___  ', 'color: #00FF8C; font-weight: bold;');
    console.log('%c| |  | | | | \'_ \\ / _ \\ \'__|| |_) / _ \\| \'__| __| |_ / _ \\| | |/ _ \\ ', 'color: #00FF8C; font-weight: bold;');
    console.log('%c| |__| |_| | |_) |  __/ |   |  __/ (_) | |  | |_|  _| (_) | | | (_) |', 'color: #00FF8C; font-weight: bold;');
    console.log('%c \\____\\__, |_.__/ \\___|_|   |_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ ', 'color: #00FF8C; font-weight: bold;');
    console.log('%c      |___/                                                           ', 'color: #00FF8C; font-weight: bold;');
    console.log('%c\n👋 Hey there! Checking out the code?', 'color: #00D9FF; font-size: 14px;');
    console.log('%cI\'m always open to collaboration and exciting projects!', 'color: #fff; font-size: 12px;');
    console.log('%cEmail: 22bq1a4720@gmail.com', 'color: #00FF8C; font-size: 12px;');
    console.log('%cGitHub: github.com/cehcvkr', 'color: #00FF8C; font-size: 12px;');
    console.log('%cLinkedIn: linkedin.com/in/cvkr', 'color: #00FF8C; font-size: 12px;');
    
    /* ====================================================
       PREVENT CONTEXT MENU (Optional - for production feel)
       ==================================================== */
    // Uncomment if you want to disable right-click
    // document.addEventListener('contextmenu', e => e.preventDefault());
    
    /* ====================================================
       ACCESSIBILITY - Skip to Main Content
       ==================================================== */
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.querySelector('main') || document.querySelector('.hero');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        });
    }
});

/* ====================================================
   PRELOAD CRITICAL RESOURCES
   ==================================================== */
window.addEventListener('load', function() {
    // Remove any loading overlays or spinners
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});
