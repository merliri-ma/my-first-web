export class PlanetaryInfo {
    constructor() {
        this.planetaryData = {
            Sun: {
                qualities: ['Leadership', 'Vitality', 'Success'],
                colors: ['Gold', 'Orange', 'Yellow'],
                activities: ['Important meetings', 'Seeking recognition', 'Authority matters']
            },
            Moon: {
                qualities: ['Intuition', 'Emotions', 'Nurturing'],
                colors: ['Silver', 'White', 'Pearl'],
                activities: ['Family matters', 'Meditation', 'Emotional healing']
            }
            // Additional planets...
        };
    }

    createInfoCard(planet) {
        const data = this.planetaryData[planet];
        return `
            <div class="planet-card" data-planet="${planet}">
                <h3>${planet} ${this.getPlanetSymbol(planet)}</h3>
                <div class="qualities">
                    <h4>Qualities:</h4>
                    <ul>${data.qualities.map(q => `<li>${q}</li>`).join('')}</ul>
                </div>
                <div class="best-activities">
                    <h4>Best For:</h4>
                    <ul>${data.activities.map(a => `<li>${a}</li>`).join('')}</ul>
                </div>
            </div>
        `;
    }
}
