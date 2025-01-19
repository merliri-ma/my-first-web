import { PlanetaryHoursCalculator } from './calculations/planetaryHours.js';
import { ThemeManager } from './ui/darkMode.js';
import { Timeline } from './ui/timeline.js';
import { NotificationManager } from './features/notifications.js';
import { DataExporter } from './features/export.js';

class App {
    constructor() {
        this.calculator = new PlanetaryHoursCalculator();
        this.themeManager = new ThemeManager();
        this.timeline = new Timeline();
        this.notifications = new NotificationManager();
        this.exporter = new DataExporter();
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.themeManager.initialize();
        this.timeline.initialize();
    }

    setupEventListeners() {
        document.getElementById('time-form').addEventListener('submit', this.handleCalculation.bind(this));
        document.getElementById('theme-toggle').addEventListener('click', () => this.themeManager.toggleTheme());
    }

    handleCalculation(event) {
        event.preventDefault();
        const sunrise = document.getElementById('sunrise').value;
        const sunset = document.getElementById('sunset').value;
        
        const hours = this.calculator.calculateHours(sunrise, sunset);
        this.displayResults(hours);
        this.timeline.updateTimeline(hours);
    }

    displayResults(hours) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = this.generateResultsHTML(hours);
    }

    generateResultsHTML(hours) {
        return `
            <div class="results-grid">
                ${hours.map(hour => `
                    <div class="hour-card">
                        <div class="planet-symbol">${hour.symbol}</div>
                        <div class="hour-details">
                            <span class="time">${hour.start} - ${hour.end}</span>
                            <span class="planet-name">${hour.planet}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

new App();
