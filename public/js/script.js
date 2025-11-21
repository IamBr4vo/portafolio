// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Navbar hide/show on scroll
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down & not at top
        navbar.classList.add('hidden');
    } else {
        // Scrolling up or at top
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle (for future implementation)
const navbarToggle = document.getElementById('navbarToggle');
if (navbarToggle) {
    navbarToggle.addEventListener('click', function () {
        // Toggle mobile menu logic here
        console.log('Mobile menu toggle clicked');
    });
}

// Dynamic greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    const heroText = document.querySelector('.hero-text p');
    let greeting = '';

    if (hour < 12) {
        greeting = '¡Buenos días! ';
    } else if (hour < 18) {
        greeting = '¡Buenas tardes! ';
    } else {
        greeting = '¡Buenas noches! ';
    }

    if (heroText) {
        const currentText = heroText.textContent;
        if (!currentText.includes('¡Buen')) {
            heroText.textContent = greeting + currentText;
        }
    }
}

// Call greeting update after page loads
window.addEventListener('load', updateGreeting);

// Add subtle parallax effect to hero
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Contact items click handlers
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function () {
        const icon = this.querySelector('i');
        const text = this.querySelector('p').textContent;

        if (icon.classList.contains('fa-envelope')) {
            window.location.href = `mailto:${text}`;
        } else if (icon.classList.contains('fa-phone')) {
            window.location.href = `tel:${text}`;
        } else if (icon.classList.contains('fa-linkedin')) {
            window.open(`https://${text}`, '_blank');
        } else if (icon.classList.contains('fa-github')) {
            window.open(`https://${text}`, '_blank');
        }
    });
});

// Highlight active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);