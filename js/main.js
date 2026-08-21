/* ========================================
   FORTUNE KIDS - MAIN JAVASCRIPT
   ======================================== */

// ========================================
// DOM CONTENT LOADED
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initActiveNav();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initDropdowns();
    initTabs();
    initAccordion();
    initModals();
    initFormValidation();
    initAnimations();
    initCounters();
    initDonationButtons();
    initBackToTop();
    initSearch();
});

// ========================================
// ACTIVE NAV LINK
// ========================================

function initActiveNav() {
    const links = document.querySelectorAll('.header__nav-link');
    if (!links.length) return;
    
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    // Reset all, then mark the matching link
    let matched = false;
    links.forEach(link => {
        const href = (link.getAttribute('href') || '').split('#')[0].split('/').pop();
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (href === path) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            matched = true;
        }
    });
    
    // Fallback to Inicio when no direct match
    if (!matched) {
        const homeLink = Array.from(links).find(l => l.getAttribute('href').indexOf('index.html') !== -1);
        if (homeLink) {
            homeLink.classList.add('active');
            homeLink.setAttribute('aria-current', 'page');
        }
    }
}

// ========================================
// DONATION BUTTONS
// ========================================

function initDonationButtons() {
    const buttons = document.querySelectorAll('.js-donate');
    const feedback = document.getElementById('donation-feedback');
    
    if (!buttons.length || !feedback) return;
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.dataset.amount;
            const paragraph = feedback.querySelector('p') || feedback;
            
            feedback.hidden = false;
            feedback.setAttribute('tabindex', '-1');
            feedback.focus({ preventScroll: false });
            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Update message with selected amount
            if (paragraph !== feedback) {
                paragraph.textContent = `Gracias por querer donar ${amount}€. La pasarela de pago se integrará próximamente; escríbenos a info@fortunekids.org y te indicamos cómo completar tu donación.`;
            }
        });
    });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    
    if (!menuToggle || !nav) return;
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
    }
    
    menuToggle.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('active');
        this.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        this.setAttribute('aria-expanded', String(isOpen));
        this.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && !menuToggle.contains(e.target) && !nav.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Reset state if viewport grows past desktop breakpoint
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth >= 1024) {
            closeMenu();
        }
    }, 150));
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================

function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// DROPDOWNS
// ========================================

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown__trigger');
        const menu = dropdown.querySelector('.dropdown__menu');
        
        if (!trigger || !menu) return;
        
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('dropdown--active');
                }
            });
            
            dropdown.classList.toggle('dropdown--active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('dropdown--active');
        });
    });
}

// ========================================
// TABS
// ========================================

function initTabs() {
    const tabsContainers = document.querySelectorAll('.tabs');
    
    tabsContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tabs__tab');
        const panels = container.querySelectorAll('.tabs__panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.dataset.target;
                
                // Update tabs
                tabs.forEach(t => t.classList.remove('tabs__tab--active'));
                this.classList.add('tabs__tab--active');
                
                // Update panels
                panels.forEach(p => p.classList.remove('tabs__panel--active'));
                const targetPanel = container.querySelector(`#${target}`);
                if (targetPanel) {
                    targetPanel.classList.add('tabs__panel--active');
                }
            });
        });
    });
}

// ========================================
// ACCORDION
// ========================================

function initAccordion() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion__item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion__header');
            
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('accordion__item--active');
                
                // Close all items
                items.forEach(i => i.classList.remove('accordion__item--active'));
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('accordion__item--active');
                }
            });
        });
    });
}

// ========================================
// MODALS
// ========================================

function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.modal;
            const modal = document.querySelector(`#${target}`);
            
            if (modal) {
                modal.classList.add('modal--active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal__close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('modal--active');
                document.body.style.overflow = '';
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('modal--active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('modal--active');
            });
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// FORM VALIDATION
// ========================================

function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('form-input--error');
                    
                    // Show error message
                    let errorEl = field.parentNode.querySelector('.form-error');
                    if (!errorEl) {
                        errorEl = document.createElement('span');
                        errorEl.className = 'form-error';
                        errorEl.textContent = 'Este campo es obligatorio';
                        field.parentNode.appendChild(errorEl);
                    }
                } else {
                    field.classList.remove('form-input--error');
                    const errorEl = field.parentNode.querySelector('.form-error');
                    if (errorEl) {
                        errorEl.remove();
                    }
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('form-input--error');
                    
                    let errorEl = field.parentNode.querySelector('.form-error');
                    if (!errorEl) {
                        errorEl = document.createElement('span');
                        errorEl.className = 'form-error';
                        errorEl.textContent = 'Por favor, introduce un email válido';
                        field.parentNode.appendChild(errorEl);
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert--success';
                successMessage.textContent = 'Formulario enviado correctamente. Te contactaremos pronto.';
                form.insertBefore(successMessage, form.firstChild);
                
                // Reset form
                form.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    });
}

// ========================================
// ANIMATIONS
// ========================================

function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.classList.add('animated');
        });
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Local storage helpers
const storage = {
    get: function(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    },
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    remove: function(key) {
        localStorage.removeItem(key);
    }
};

// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.counter);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function initBackToTop() {
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Volver arriba');
        backToTopBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
        document.body.appendChild(backToTopBtn);
    }
    
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100));
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}