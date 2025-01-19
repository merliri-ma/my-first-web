export class StorageManager {
    constructor() {
        this.storageKey = 'planetaryHoursData';
    }

    saveCalculation(data) {
        const savedData = this.getSavedCalculations();
        savedData.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(this.storageKey, JSON.stringify(savedData));
    }

    getSavedCalculations() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    clearHistory() {
        localStorage.removeItem(this.storageKey);
    }
}
