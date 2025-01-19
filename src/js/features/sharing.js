export class SharingManager {
    constructor() {
        this.shareData = {
            title: 'Planetary Hours Calculation',
            text: 'Check out my planetary hours calculation!',
            url: window.location.href
        };
    }

    async shareResults(hours) {
        if (navigator.share) {
            try {
                await navigator.share({
                    ...this.shareData,
                    text: this.formatShareText(hours)
                });
            } catch (err) {
                console.log('Sharing failed:', err);
            }
        } else {
            this.copyToClipboard(hours);
        }
    }

    formatShareText(hours) {
        return hours.map(h => 
            `${h.start}-${h.end}: ${h.planet} ${h.symbol}`
        ).join('\n');
    }
}
