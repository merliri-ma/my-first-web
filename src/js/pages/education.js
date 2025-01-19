import { PlanetaryInfo } from '../components/InfoCards.js';
import { Timeline } from './ui/timeline.js';

class EducationPage {
    constructor() {
        this.planetInfo = new PlanetaryInfo();
        this.timeline = new Timeline('demo-timeline');
        this.initialize();
    }

    initialize() {
        this.renderPlanetCards();
        this.setupInteractiveDemo();
    }

    renderPlanetCards() {
        const grid = document.querySelector('.planet-grid');
        Object.keys(this.planetInfo.planetaryData).forEach(planet => {
            grid.innerHTML += this.planetInfo.createInfoCard(planet);
        });
    }

    setupInteractiveDemo() {
        this.timeline.initialize();
        this.timeline.drawDemoTimeline();
    }
}

new EducationPage();
