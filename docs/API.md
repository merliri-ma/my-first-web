# Planetary Hours Calculator API Documentation

## Core Functions

### calculateHours(sunrise: string, sunset: string)
Calculates planetary hours between given sunrise and sunset times.

### Timeline Visualization
The Timeline class provides methods for visual representation of planetary hours.

### Data Export
Supports export in JSON, CSV, and PDF formats.

## Usage Examples
```javascript
const calculator = new PlanetaryHoursCalculator();
const hours = calculator.calculateHours('06:00', '18:00');
