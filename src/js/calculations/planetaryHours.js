export class PlanetaryHoursCalculator {
    constructor() {
        this.planets = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
        this.planetSymbols = {
            'Sun': '☉',
            'Moon': '☽',
            'Mars': '♂',
            'Mercury': '☿',
            'Jupiter': '♃',
            'Venus': '♀',
            'Saturn': '♄'
        };
    }

    calculateHours(sunrise, sunset) {
        const sunriseMinutes = this.convertTimeToMinutes(sunrise);
        const sunsetMinutes = this.convertTimeToMinutes(sunset);
        const dayLength = sunsetMinutes - sunriseMinutes;
        const hourLength = dayLength / 12;

        return this.generateHours(sunriseMinutes, hourLength);
    }

    generateHours(startMinutes, hourLength) {
        const hours = [];
        
        for (let i = 0; i < 12; i++) {
            const start = startMinutes + (hourLength * i);
            const end = start + hourLength;
            
            hours.push({
                start: this.convertMinutesToTime(start),
                end: this.convertMinutesToTime(end),
                planet: this.planets[i % 7],
                symbol: this.planetSymbols[this.planets[i % 7]],
                hourNumber: i + 1
            });
        }

        return hours;
    }

    convertTimeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60) + minutes;
    }

    convertMinutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
}
