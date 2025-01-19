export const AppConfig = {
    theme: {
        defaultTheme: 'light',
        supportedThemes: ['light', 'dark']
    },
    notifications: {
        defaultEnabled: true,
        soundEnabled: true,
        advanceNoticeMinutes: 5
    },
    display: {
        timeFormat: '24h',
        showSeconds: false,
        language: 'en'
    },
    features: {
        enableExport: true,
        enableSharing: true,
        enableNotifications: true,
        enableLocationDetection: true
    },
    api: {
        endpoint: 'https://api.example.com/v1',
        timeout: 5000
    }
};
