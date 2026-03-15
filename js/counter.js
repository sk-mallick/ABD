/* ═══════════════════════════════════════════
   ABD — counter.js
   Animated counter with IntersectionObserver
   ═══════════════════════════════════════════ */

function animateCounter(el, target, duration) {
    duration = duration || 2000;
    let start = 0;
    const step = target / duration * 16;
    const suffix = el.dataset.suffix || '';
    const isText = isNaN(target);

    if (isText) {
        el.textContent = target + suffix;
        return;
    }

    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
    const counterEls = document.querySelectorAll('.stat-number[data-target]');
    if (!counterEls.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const rawTarget = entry.target.dataset.target;
                const suffix = entry.target.dataset.suffix || '';

                /* If target is a number, animate; else display directly */
                const num = parseFloat(rawTarget);
                if (!isNaN(num)) {
                    animateCounter(entry.target, num, 2000);
                } else {
                    entry.target.textContent = rawTarget + suffix;
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counterEls.forEach(el => counterObserver.observe(el));
});
