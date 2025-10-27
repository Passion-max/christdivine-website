// Christ Divine Communication - Main JavaScript

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navItems = document.querySelectorAll('.nav-item');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop();
  navItems.forEach(item => {
    const linkPath = item.getAttribute('href');
    if (linkPath === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});


navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
  });
});


// ===== Dropdown Menu for Mobile =====
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// ===== Hero Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (indicators[i]) {
            indicators[i].classList.remove('active');
        }
    });
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause auto-advance on hover
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ff8c00;
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = '#ff6600';
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = '#ff8c00';
    scrollTopBtn.style.transform = 'translateY(0)';
});

// ===== Active Navigation Highlight on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Form Validation (for contact forms) =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6600';
                
                // Remove error styling after user starts typing
                input.addEventListener('input', function() {
                    this.style.borderColor = '';
                });
            }
        });
        
        // Email validation
        const emailInputs = this.querySelectorAll('input[type="email"]');
        emailInputs.forEach(email => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value && !emailPattern.test(email.value)) {
                isValid = false;
                email.style.borderColor = '#ff6600';
            }
        });
        
        if (isValid) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Thank you! Your message has been sent successfully.';
            successMsg.style.cssText = `
                background: #4CAF50;
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
            `;
            
            this.appendChild(successMsg);
            this.reset();
            
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        } else {
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please fill in all required fields correctly.';
            errorMsg.style.cssText = `
                background: #ff6600;
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
            `;
            
            // Remove existing error messages
            const existingError = this.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            this.appendChild(errorMsg);
            
            setTimeout(() => {
                errorMsg.remove();
            }, 5000);
        }
    });
});

// ===== Lazy Loading for Images =====
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== Animation on Scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.division-card, .feature-box, .testimonial-card, .scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const rect = element.getBoundingClientRect();

        if (rect < window.innerHeight - 50) {
            element.classList.add('visible')
        }
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.division-card, .feature-box, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Close dropdown when clicking outside =====
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        const isDropdownClick = event.target.closest('.dropdown');
        if (!isDropdownClick) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }
});

// ===== Close mobile menu when clicking outside =====
document.addEventListener('click', function(event) {
    const isNavClick = event.target.closest('.nav-wrapper');
    if (!isNavClick && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

// ===== Initialize on page load =====
document.addEventListener('DOMContentLoaded', function() {
    // Show first slide
    showSlide(0);
    
    // Trigger animation for elements in viewport
    animateOnScroll();
    
    console.log('Christ Divine Communication website loaded successfully!');
});
