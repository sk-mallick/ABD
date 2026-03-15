/* ═══════════════════════════════════════════
   ABD — carousel.js
   Mahapurush carousel: auto-play, touch, dots, arrows
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-track-container');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsWrap = document.querySelector('.carousel-dots');

    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.mp-card'));
    const total = cards.length;
    let current = 0;
    let autoTimer = null;
    let isDragging = false;
    let touchStartX = 0;
    let touchEndX = 0;

    /* Determine visible cards by viewport */
    function getVisible() {
        const w = window.innerWidth;
        if (w >= 1024) return 4;
        if (w >= 768) return 2;
        return 1;
    }

    /* Build dots */
    function buildDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = '';
        const pages = Math.ceil(total / getVisible());
        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i * getVisible()));
            dotsWrap.appendChild(dot);
        }
    }

    /* Update dot state */
    function updateDots() {
        if (!dotsWrap) return;
        const visible = getVisible();
        const pageIndex = Math.floor(current / visible);
        dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === pageIndex);
        });
    }

    /* Move carousel */
    function goTo(index) {
        const visible = getVisible();
        const maxIndex = Math.max(0, total - visible);
        current = Math.max(0, Math.min(index, maxIndex));

        /* Calculate card width including gap */
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const offset = current * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    function next() {
        const visible = getVisible();
        const maxIndex = Math.max(0, total - visible);
        current = current >= maxIndex ? 0 : current + 1;
        goTo(current);
    }

    function prev() {
        const visible = getVisible();
        const maxIndex = Math.max(0, total - visible);
        current = current <= 0 ? maxIndex : current - 1;
        goTo(current);
    }

    /* Auto-play */
    function startAuto() {
        stopAuto();
        autoTimer = setInterval(next, 3000);
    }
    function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    /* Arrow buttons */
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

    /* Pause on hover */
    if (container) {
        container.addEventListener('mouseenter', stopAuto);
        container.addEventListener('mouseleave', startAuto);
    }

    /* Touch/swipe */
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAuto();
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? next() : prev();
        }
        startAuto();
    }, { passive: true });

    /* Resize rebuild */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildDots();
            goTo(0);
        }, 200);
    });

    /* Init */
    buildDots();
    goTo(0);
    startAuto();
});
