export class Timeline {
    constructor() {
        this.container = document.getElementById('timeline');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    initialize() {
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = 150;
    }

    updateTimeline(hours) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTimelineBase();
        this.drawHourMarkers(hours);
    }

    drawTimelineBase() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.strokeStyle = '#666';
        this.ctx.stroke();
    }

    drawHourMarkers(hours) {
        const startTime = this.convertTimeToMinutes(hours[0].start);
        const endTime = this.convertTimeToMinutes(hours[hours.length - 1].end);
        const totalMinutes = endTime - startTime;

        hours.forEach(hour => {
            const startX = this.getXPosition(hour.start, startTime, totalMinutes);
            const endX = this.getXPosition(hour.end, startTime, totalMinutes);
            
            this.drawHourSegment(startX, endX, hour);
        });
    }

    convertTimeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    getXPosition(time, startTime, totalMinutes) {
        const minutes = this.convertTimeToMinutes(time) - startTime;
        return (minutes / totalMinutes) * this.canvas.width;
    }

    drawHourSegment(startX, endX, hour) {
        const y = this.canvas.height / 2;
        
        this.ctx.fillStyle = this.getPlanetColor(hour.planet);
        this.ctx.fillRect(startX, y - 20, endX - startX, 40);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(hour.symbol, (startX + endX) / 2 - 6, y + 6);
    }

    getPlanetColor(planet) {
        const colors = {
            'Sun': '#ffd700',
            'Moon': '#silver',
            'Mars': '#ff4444',
            'Mercury': '#purple',
            'Jupiter': '#4169e1',
            'Venus': '#98ff98',
            'Saturn': '#daa520'
        };
        return colors[planet] || '#666';
    }
}
