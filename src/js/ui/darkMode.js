class DarkMode {
    constructor() {
        this.darkModeToggle = document.querySelector('#darkModeToggle');
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.init();
    }

    init() {
        this.loadThemePreference();
        this.attachEventListeners();
    }

    toggleDarkMode() {
        document.documentElement.classList.toggle('dark-theme');
        this.isDark = !this.isDark;
        localStorage.setItem('darkMode', this.isDark);
        this.updateBackgroundImage();
    }

    loadThemePreference() {
        const savedPreference = localStorage.getItem('darkMode');
        if (savedPreference !== null) {
            this.isDark = JSON.parse(savedPreference);
            if (this.isDark) {
                document.documentElement.classList.add('dark-theme');
            }
        }
        this.updateBackgroundImage();
    }

    updateBackgroundImage() {
        const bgImage = this.isDark ? 'assets/images/backgrounds/night.jpg' : 'assets/images/backgrounds/day.jpg';
        document.body.style.backgroundImage = `url(${bgImage})`;
    }

    attachEventListeners() {
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
    }
}

export default DarkMode;
