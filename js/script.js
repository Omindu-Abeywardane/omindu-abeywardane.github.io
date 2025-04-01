document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.querySelector('body');

    const observerOptions = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, section h2, .skill-badge').forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

     // Add click ripple effect to buttons
     document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
            
            // Prevent body scrolling when menu is open
            if (nav.classList.contains('nav-active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                body.style.overflow = 'auto';
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        }
    });
});