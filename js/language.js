/* ═══════════════════════════════════════════
   ABD — language.js
   Language toggle: EN / OD / HI
   ═══════════════════════════════════════════ */

function switchLang(lang) {
    /* Show/hide all data-lang spans */
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = (el.dataset.lang === lang) ? '' : 'none';
    });

    /* Update active button state */
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* Switch font */
    const fontMap = {
        en: "'Playfair Display', serif",
        od: "'Noto Serif Odia', serif",
        hi: "'Tiro Devanagari Hindi', serif"
    };
    document.documentElement.style.setProperty('--lang-font', fontMap[lang]);

    /* Persist */
    localStorage.setItem('abd-lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('abd-lang') || 'en';
    switchLang(saved);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => switchLang(btn.dataset.lang));
    });
});
