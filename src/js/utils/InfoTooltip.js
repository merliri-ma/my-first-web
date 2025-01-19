export class InfoTooltip {
    constructor() {
        this.template = `
            <div class="tooltip">
                <div class="tooltip-content">
                    <h4 class="tooltip-title"></h4>
                    <p class="tooltip-description"></p>
                    <ul class="tooltip-properties"></ul>
                </div>
                <div class="tooltip-arrow"></div>
            </div>
        `;
    }

    show(element, data) {
        const tooltip = this.createTooltip(data);
        document.body.appendChild(tooltip);
        this.position(tooltip, element);
    }

    createTooltip(data) {
        const div = document.createElement('div');
        div.innerHTML = this.template;
        const tooltip = div.firstElementChild;
        
        tooltip.querySelector('.tooltip-title').textContent = data.title;
        tooltip.querySelector('.tooltip-description').textContent = data.description;
        
        return tooltip;
    }
}
