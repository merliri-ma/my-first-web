import { AppConfig } from '../../config/app.config.js';
import { ThemeManager } from './ui/darkMode.js';
import { NotificationManager } from './features/notifications.js';
import { StorageManager } from './utils/storage.js';

class SettingsManager {
    constructor() {
        this.storage = new StorageManager();
        this.theme = new ThemeManager();
        this.notifications = new NotificationManager();
        this.initialize();
    }

    initialize() {
        this.loadSavedSettings();
        this.setupEventListeners();
    }

    loadSavedSettings() {
        const settings = this.storage.getSettings();
        
        document.getElementById('theme-select').value = settings.theme || 'light';
        document.getElementById('time-format').value = settings.timeFormat || '24';
        document.getElementById('enable-notifications').checked = settings.notifications || false;
        document.getElementById('notification-advance').value = settings.notificationAdvance || '5';
    }

    setupEventListeners() {
        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.theme.setTheme(e.target.value);
            this.saveSettings();
        });

        document.getElementById('enable-notifications').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.notifications.initialize();
            }
            this.saveSettings();
        });
    }

    saveSettings() {
        const settings = {
            theme: document.getElementById('theme-select').value,
            timeFormat: document.getElementById('time-format').value,
            notifications: document.getElementById('enable-notifications').checked,
            notificationAdvance: document.getElementById('notification-advance').value
        };
        
        this.storage.saveSettings(settings);
    }
}

new SettingsManager();
