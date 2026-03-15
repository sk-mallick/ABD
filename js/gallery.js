/* ═══════════════════════════════════════════
   ABD — gallery.js
   Filter tabs, lightbox open/close/navigate
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ═══ FILTER TABS ═══ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            /* Update active button */
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ═══ LIGHTBOX ═══ */
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return { src: img ? img.src : '', alt: img ? img.alt : '' };
    });

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        showImage(currentIndex);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    function showImage(index) {
        if (!lightboxImg) return;
        /* Fade out */
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = images[index].src;
            lightboxImg.alt = images[index].alt;
            lightboxImg.style.opacity = '1';
        }, 150);
    }

    function navigateLightbox(dir) {
        currentIndex = (currentIndex + dir + images.length) % images.length;
        showImage(currentIndex);
    }

    /* Attach click to gallery items */
    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    /* Controls */
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

    /* Close on overlay click */
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    /* Keyboard navigation */
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    /* Lightbox image transition */
    if (lightboxImg) {
        lightboxImg.style.transition = 'opacity 0.15s ease';
    }

    /* ═══ PROGRAMS TABS (programs.html) ═══ */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const target = document.querySelector(`#${btn.dataset.tab}`);
            if (target) target.classList.add('active');
        });
    });

});
