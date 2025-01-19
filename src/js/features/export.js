export class DataExporter {
    constructor() {
        this.supportedFormats = ['json', 'csv', 'pdf'];
    }

    exportData(hours, format) {
        switch (format) {
            case 'json':
                return this.exportJSON(hours);
            case 'csv':
                return this.exportCSV(hours);
            case 'pdf':
                return this.exportPDF(hours);
        }
    }

    exportJSON(hours) {
        const data = JSON.stringify(hours, null, 2);
        this.downloadFile(data, 'planetary-hours.json', 'application/json');
    }

    exportCSV(hours) {
        const headers = ['Hour', 'Start', 'End', 'Planet', 'Symbol'];
        const rows = hours.map(h => [
            h.hourNumber,
            h.start,
            h.end,
            h.planet,
            h.symbol
        ]);
        
        const csv = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        this.downloadFile(csv, 'planetary-hours.csv', 'text/csv');
    }

    exportPDF(hours) {
        const content = hours.map(h => ({
            hour: h.hourNumber,
            time: `${h.start} - ${h.end}`,
            planet: `${h.planet} ${h.symbol}`
        }));

        const docDefinition = {
            content: [
                { text: 'Planetary Hours', style: 'header' },
                { text: new Date().toLocaleDateString(), style: 'date' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto'],
                        body: [
                            ['Hour', 'Time', 'Planet'],
                            ...content.map(row => [
                                row.hour,
                                row.time,
                                row.planet
                            ])
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                date: {
                    fontSize: 12,
                    margin: [0, 0, 0, 20]
                }
            }
        };

        this.generatePDF(docDefinition);
    }

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
}
