export class PlanetaryChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.colors = {
            Sun: '#FFD700',
            Moon: '#C0C0C0',
            Mars: '#FF0000',
            Mercury: '#800080',
            Jupiter: '#4169E1',
            Venus: '#00FF7F',
            Saturn: '#DAA520'
        };
    }

    drawCircularChart(hours) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;

        hours.forEach((hour, index) => {
            const startAngle = (index * 30) * Math.PI / 180;
            const endAngle = ((index + 1) * 30) * Math.PI / 180;

            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.fillStyle = this.colors[hour.planet];
            this.ctx.fill();
            
            this.drawHourLabel(centerX, centerY, radius, hour, startAngle);
        });
    }

    drawHourLabel(centerX, centerY, radius, hour, angle) {
        const x = centerX + radius * 0.8 * Math.cos(angle + 0.26);
        const y = centerY + radius * 0.8 * Math.sin(angle + 0.26);

        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#333';
        this.ctx.fillText(`${hour.symbol} ${hour.start}`, x, y);
    }
}
