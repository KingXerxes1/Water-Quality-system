// Function to generate mock water quality data for 3 days at 2-hour intervals
function generateMockData() {
    const startDate = new Date("2025-03-10T00:00:00Z"); // Start date
    const endDate = new Date("2025-03-12T22:00:00Z"); // End date (3 days later)
    const intervalHours = 2; // Data recorded every 2 hours
    const mockData = [];

    let currentTime = new Date(startDate);
    
    while (currentTime <= endDate) {
        mockData.push({
            timestamp: currentTime.toISOString(),
            pH: (6.5 + Math.random() * 2).toFixed(2), // pH range between 6.5 and 8.5
            chlorine: (0.5 + Math.random() * 4.5).toFixed(2), // Chlorine between 0.5 and 5.0 mg/L
            turbidity: (0 + Math.random() * 5).toFixed(2), // Turbidity between 0 and 5 NTU
            eColi: Math.random() > 0.85 ? 1 : 0 // 15% chance of contamination
        });

        currentTime.setHours(currentTime.getHours() + intervalHours); // Move 2 hours forward
    }

    return mockData;
}

// Mock dataset spanning 3 days
const WaterQualityData = generateMockData();

// Function to filter mock data based on user-selected date range
function getMockData(startDate, endDate) {
    return WaterQualityData.filter(measurement => {
        const date = new Date(measurement.timestamp);
        return (!startDate || date >= new Date(startDate)) &&
               (!endDate || date <= new Date(endDate));
    });
}
