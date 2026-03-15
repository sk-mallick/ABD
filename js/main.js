/* ═══════════════════════════════════════════
   ABD — main.js
   Navbar scroll shrink, hamburger menu,
   smooth scroll, IntersectionObserver reveal
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ═══ NAVBAR SCROLL SHRINK ═══ */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    /* ═══ HAMBURGER MENU ═══ */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');

    function openMenu() {
        if (mobileMenu) mobileMenu.classList.add('open');
        if (hamburger) hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', () => {
        mobileMenu && mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);

    /* Close mobile menu on link click */
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ═══ ACTIVE NAV LINK ═══ */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu .nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ═══ SMOOTH SCROLL ═══ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ═══ INTERSECTION OBSERVER — REVEAL ═══ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ═══ BACK TO TOP ═══ */
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ═══ HERO WORD ANIMATION ═══ */
    const heroTitleEl = document.querySelector('.hero-title');
    if (heroTitleEl) {
        const text = heroTitleEl.textContent.trim();
        const words = text.split(' ');
        heroTitleEl.innerHTML = words.map((word, i) => {
            const delay = (0.4 + i * 0.15).toFixed(2);
            return `<span class="hero-word" style="animation-delay:${delay}s">${word}</span>`;
        }).join(' ');
    }

});
