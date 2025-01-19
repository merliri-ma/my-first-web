export class NotificationManager {
    constructor() {
        this.permission = false;
        this.activeNotifications = new Set();
    }

    async initialize() {
        if ("Notification" in window) {
            this.permission = await Notification.requestPermission();
        }
    }

    scheduleHourNotification(hour) {
        if (this.permission !== 'granted') return;

        const timeUntil = this.calculateTimeUntil(hour.start);
        const notificationId = setTimeout(() => {
            new Notification('Planetary Hour Change', {
                body: `New hour of ${hour.planet} (${hour.symbol}) begins`,
                icon: `../assets/icons/planets/${hour.planet.toLowerCase()}.svg`
            });
            this.activeNotifications.delete(notificationId);
        }, timeUntil);

        this.activeNotifications.add(notificationId);
    }

    calculateTimeUntil(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const target = new Date();
        target.setHours(hours, minutes, 0);
        return target.getTime() - Date.now();
    }

    clearAllNotifications() {
        this.activeNotifications.forEach(id => clearTimeout(id));
        this.activeNotifications.clear();
    }
}
