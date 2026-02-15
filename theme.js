(function () {
    const STORAGE_KEY = 'theme';
    const DARK_THEME = 'dark';

    function getPreferredDark() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function shouldUseDarkTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        return savedTheme === DARK_THEME || (!savedTheme && getPreferredDark());
    }

    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', DARK_THEME);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    function renderIcon(isDark, themeIcon) {
        themeIcon.innerHTML = isDark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function setupThemeToggle() {
        const themeBtn = document.getElementById('themeBtn');
        const themeIcon = document.getElementById('themeIcon');

        if (!themeBtn || !themeIcon) {
            return;
        }

        let isDark = shouldUseDarkTheme();
        applyTheme(isDark);
        renderIcon(isDark, themeIcon);

        themeBtn.addEventListener('click', () => {
            isDark = !isDark;
            localStorage.setItem(STORAGE_KEY, isDark ? DARK_THEME : 'light');
            applyTheme(isDark);
            renderIcon(isDark, themeIcon);
        });
    }

    document.addEventListener('DOMContentLoaded', setupThemeToggle);
})();
