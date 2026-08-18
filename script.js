// script.js

// Initialize animations on scroll
document.addEventListener("DOMContentLoaded", () => {
    
    // Intersection Observer for fade and slide animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Adjust for sticky navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // TikTok Facade Pattern (Click to load iframe)
    const tiktokFacades = document.querySelectorAll('.tiktok-facade');
    tiktokFacades.forEach(facade => {
        facade.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.tiktok.com/embed/v2/${videoId}`);
            iframe.setAttribute('allow', 'autoplay; encrypted-media');
            iframe.setAttribute('allowfullscreen', '');
            
            // Clear the facade content
            this.innerHTML = '';
            this.classList.remove('tiktok-facade');
            this.style.background = '#000'; // Reset background
            
            // Append iframe
            this.appendChild(iframe);
        });
    });
});
