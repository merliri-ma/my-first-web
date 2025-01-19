export class DateTimeManager {
    constructor(timezone = 'UTC') {
        this.timezone = timezone;
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            timeZone: this.timezone,
            hour12: false
        });
    }

    formatTimeRange(start, end) {
        return `${this.formatTime(start)} - ${this.formatTime(end)}`;
    }

    formatTime(time) {
        return time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: this.timezone
        });
    }
}
