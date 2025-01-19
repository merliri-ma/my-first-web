class TimeZoneManager {
    constructor() {
        this.timeZones = Intl.supportedValuesOf('timeZone');
    }

    getCurrentTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    getTimeZoneOffset(timeZone) {
        const date = new Date();
        const timeZoneDate = new Date(date.toLocaleString('en-US', { timeZone }));
        return (timeZoneDate - date) / 60000;
    }

    convertToTimeZone(date, timeZone) {
        return new Date(date.toLocaleString('en-US', { timeZone }));
    }

    getTimeZonesList() {
        return this.timeZones.map(zone => ({
            id: zone,
            name: zone.replace(/_/g, ' '),
            offset: this.getTimeZoneOffset(zone)
        }));
    }

    formatTimeZoneLabel(timeZone) {
        const offset = this.getTimeZoneOffset(timeZone);
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset >= 0 ? '+' : '-';
        return `${timeZone} (UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')})`;
    }
}

export default TimeZoneManager;
