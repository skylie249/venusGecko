// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('#cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Cursor hover effect
const hoverElements = document.querySelectorAll('a, button, .gecko-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 3, backgroundColor: 'rgba(197, 160, 89, 0.3)' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, backgroundColor: '#C5A059' });
    });
});

// Hero Animation
const heroTimeline = gsap.timeline();
heroTimeline.from(".hero-content h2", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}).from(".hero-content h1", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
}, "-=0.7").from(".hero-content p", {
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.5").from(".scroll-indicator", {
    opacity: 0,
    duration: 1,
    delay: 0.5
});

// Section Entrance Animations
const sections = document.querySelectorAll('section');

sections.forEach(section => {
    // Reveal text elements
    const headings = section.querySelectorAll('h2');
    const paras = section.querySelectorAll('p');
    
    gsap.from(headings, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(paras, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });
});

// Gallery Cards Animation
gsap.from(".gecko-card", {
    scrollTrigger: {
        trigger: "#gallery",
        start: "top 70%",
        toggleActions: "play none none none"
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

// About Visual Glass Box Entrance
gsap.from(".glass-box", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
        toggleActions: "play none none none"
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)"
});

// Floating Buttons Animation (Shake occasionally)
gsap.to(".float-btn", {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "power1.inOut"
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
        nav.style.padding = '1rem 4rem';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
        nav.style.padding = '1.5rem 4rem';
    }
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
