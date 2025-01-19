class Navigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPath = window.location.pathname;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background: var(--surface-color);
                    padding: 1rem;
                    box-shadow: var(--shadow-sm);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary-color);
                    text-decoration: none;
                }

                .nav-links {
                    display: flex;
                    gap: 2rem;
                }

                .nav-link {
                    color: var(--text-primary);
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }

                .nav-link.active {
                    background: var(--primary-color);
                    color: white;
                }

                .nav-link:hover {
                    background: var(--primary-color-light);
                    color: white;
                }
            </style>

            <nav>
                <div class="nav-container">
                    <a href="/" class="nav-logo">Planetary Hours</a>
                    <div class="nav-links">
                        <a href="/" class="nav-link ${this.isActive('/')}">Home</a>
                        <a href="/calculator.html" class="nav-link ${this.isActive('/calculator.html')}">Calculator</a>
                        <a href="/education.html" class="nav-link ${this.isActive('/education.html')}">Learn</a>
                        <a href="/settings.html" class="nav-link ${this.isActive('/settings.html')}">Settings</a>
                    </div>
                </div>
            </nav>
        `;
    }

    isActive(path) {
        return this.currentPath === path ? 'active' : '';
    }

    setupEventListeners() {
        const links = this.shadowRoot.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigation(e);
            });
        });
    }

    handleNavigation(event) {
        const links = this.shadowRoot.querySelectorAll('.nav-link');
        links.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    }
}

customElements.define('nav-component', Navigation);
