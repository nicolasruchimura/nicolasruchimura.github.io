const text = "Welcome to my Portfolio! I am Nicolas Uchimura! Informatics Engineering Student";
const introText = document.getElementById("introText");
let index = 0;

// Typewriter effect
function typeWriter() {
    if (index < text.length) {
        introText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    } else {
        introText.classList.add("floating");
        introText.style.cursor = "pointer";
        introText.addEventListener("click", () => {
            document.getElementById("about").scrollIntoView({ behavior: "smooth" });
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll indicator functionality
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.scroll-indicator .dot');

function updateActiveDot() {
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
    });
}

// Click handler for dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const section = dot.getAttribute('data-section');
        document.getElementById(section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll snapping
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const correspondingDot = document.querySelector(`.dot[data-section="${sectionId}"]`);
            if (correspondingDot) {
                dots.forEach(dot => dot.classList.remove('active'));
                correspondingDot.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Contact section particles
function initContactParticles() {
    const container = document.getElementById('contactParticles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'contact-particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        container.appendChild(particle);
    }
}

// Initialize everything
window.onload = () => {
    typeWriter();
    updateActiveDot();
    window.addEventListener('scroll', updateActiveDot);
    initContactParticles();
};