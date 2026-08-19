// CSCB Vintage - Main Interactive Script
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            mobileToggle.classList.toggle("active");
        });

        // Close menu on click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                mobileToggle.classList.remove("active");
            });
        });
    }

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.15
    };

    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        ".fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up"
    );
    
    animatedElements.forEach(el => {
        animObserver.observe(el);
    });

    // 3. Smooth Scrolling for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Header Shadow on Scroll
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = "0 4px 20px rgba(43, 33, 27, 0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    });
});
