class SunCalculations {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.rad = Math.PI / 180;
    }

    calculateSunPosition(date) {
        const dayOfYear = this.getDayOfYear(date);
        const declination = this.calculateDeclination(dayOfYear);
        const eqTime = this.calculateEquationOfTime(dayOfYear);
        
        return {
            sunrise: this.calculateSunrise(declination, eqTime),
            sunset: this.calculateSunset(declination, eqTime),
            solarNoon: this.calculateSolarNoon(eqTime)
        };
    }

    calculateDeclination(dayOfYear) {
        const angle = 0.9863 * (dayOfYear - 81) * this.rad;
        return 23.45 * Math.sin(angle);
    }

    calculateEquationOfTime(dayOfYear) {
        const b = (2 * Math.PI * (dayOfYear - 81)) / 365;
        return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    }

    calculateSunrise(declination, eqTime) {
        const hourAngle = Math.acos(
            Math.sin(-0.83 * this.rad) - 
            Math.sin(this.latitude * this.rad) * Math.sin(declination * this.rad)
        ) / (Math.cos(this.latitude * this.rad) * Math.cos(declination * this.rad));

        return 12 - hourAngle / (15 * this.rad) - eqTime / 60 + this.longitude / 15;
    }

    calculateSunset(declination, eqTime) {
        const hourAngle = Math.acos(
            Math.sin(-0.83 * this.rad) - 
            Math.sin(this.latitude * this.rad) * Math.sin(declination * this.rad)
        ) / (Math.cos(this.latitude * this.rad) * Math.cos(declination * this.rad));

        return 12 + hourAngle / (15 * this.rad) - eqTime / 60 + this.longitude / 15;
    }

    calculateSolarNoon(eqTime) {
        return 12 - eqTime / 60 + this.longitude / 15;
    }

    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
}

export default SunCalculations;
