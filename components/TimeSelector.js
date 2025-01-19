class TimeSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.selectedDate = new Date();
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .time-selector {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    padding: 16px;
                    background: var(--surface-color);
                    border-radius: 8px;
                    box-shadow: var(--shadow-sm);
                }

                .date-input, .time-input, .timezone-select {
                    padding: 8px 12px;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    font-size: 1rem;
                }

                .timezone-select {
                    min-width: 200px;
                }

                label {
                    font-weight: 500;
                    color: var(--text-secondary);
                }
            </style>

            <div class="time-selector">
                <div class="date-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" class="date-input" 
                           value="${this.formatDate(this.selectedDate)}">
                </div>

                <div class="time-group">
                    <label for="time">Time</label>
                    <input type="time" id="time" class="time-input"
                           value="${this.formatTime(this.selectedDate)}">
                </div>

                <div class="timezone-group">
                    <label for="timezone">Timezone</label>
                    <select id="timezone" class="timezone-select">
                        ${this.generateTimezoneOptions()}
                    </select>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const dateInput = this.shadowRoot.getElementById('date');
        const timeInput = this.shadowRoot.getElementById('time');
        const timezoneSelect = this.shadowRoot.getElementById('timezone');

        dateInput.addEventListener('change', (e) => this.handleDateChange(e));
        timeInput.addEventListener('change', (e) => this.handleTimeChange(e));
        timezoneSelect.addEventListener('change', (e) => this.handleTimezoneChange(e));
    }

    handleDateChange(event) {
        const [year, month, day] = event.target.value.split('-');
        this.selectedDate.setFullYear(year, month - 1, day);
        this.dispatchTimeChange();
    }

    handleTimeChange(event) {
        const [hours, minutes] = event.target.value.split(':');
        this.selectedDate.setHours(hours, minutes);
        this.dispatchTimeChange();
    }

    handleTimezoneChange(event) {
        this.timeZone = event.target.value;
        this.dispatchTimeChange();
    }

    dispatchTimeChange() {
        this.dispatchEvent(new CustomEvent('timechange', {
            detail: {
                date: this.selectedDate,
                timeZone: this.timeZone
            },
            bubbles: true,
            composed: true
        }));
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    formatTime(date) {
        return date.toTimeString().slice(0, 5);
    }

    generateTimezoneOptions() {
        return Intl.supportedValuesOf('timeZone')
            .map(zone => `<option value="${zone}" 
                ${zone === this.timeZone ? 'selected' : ''}>
                ${zone.replace('_', ' ')}
            </option>`)
            .join('');
    }
}

customElements.define('time-selector', TimeSelector);
