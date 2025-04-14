// Importing mock data
document.write('<script src="WaterQualityData.js"></script>');

// Event listener for fetching data
document.getElementById('fetchData').addEventListener('click', async () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // Use mock data instead of an API for now
    const measurements = getMockData(startDate, endDate);
    displayMeasurements(measurements);
    displayAlertTable(measurements); // Display the alert table
    createGraphs(measurements);
});

// Function to display main measurements table
function displayMeasurements(measurements) {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'measurement-table';

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Timestamp</th>
        <th>pH (6.8-8.5)</th>
        <th>Chlorine (0.5-5.0 mg/L)</th>
        <th>Turbidity (0-5 NTU)</th>
        <th>E.Coli (0)</th>
        <th>Status</th>
    `;
    table.appendChild(headerRow);

    measurements.forEach(measurement => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${new Date(measurement.timestamp).toLocaleString()}</td>
            <td>${measurement.pH} ${getArrow(measurement.pH, 6.8, 8.5)}</td>
            <td>${measurement.chlorine} ${getArrow(measurement.chlorine, 0.5, 5.0)}</td>
            <td>${measurement.turbidity} ${getArrow(measurement.turbidity, 0, 5)}</td>
            <td>${measurement.eColi} ${getArrow(measurement.eColi, 0, 0)}</td>
            <td>${getStatus(measurement)}</td>
        `;

        table.appendChild(row);
    });

    dashboard.appendChild(table);
}

// Function to display values that need immediate attention
function displayAlertTable(measurements) {
    const alertContainer = document.getElementById('alerts');
    alertContainer.innerHTML = '<h2>⚠️ Values Needing Immediate Attention</h2>';

    const alertTable = document.createElement('table');
    alertTable.className = 'alert-table';

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Timestamp</th>
        <th>pH</th>
        <th>Chlorine</th>
        <th>Turbidity</th>
        <th>E.Coli</th>
    `;
    alertTable.appendChild(headerRow);

    const alertData = measurements.filter(measurement =>
        measurement.pH < 6.8 || measurement.pH > 8.5 ||
        measurement.chlorine < 0.5 || measurement.chlorine > 5.0 ||
        measurement.turbidity > 5 || measurement.eColi > 0
    );

    if (alertData.length === 0) {
        alertContainer.innerHTML += "<p>✅ No issues detected in recent readings.</p>";
    } else {
        alertData.forEach(measurement => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(measurement.timestamp).toLocaleString()}</td>
                <td>${measurement.pH}</td>
                <td>${measurement.chlorine}</td>
                <td>${measurement.turbidity}</td>
                <td>${measurement.eColi}</td>
            `;
            alertTable.appendChild(row);
        });
        alertContainer.appendChild(alertTable);
    }
}

// Display alert if values exceed safe limits
function getStatus(measurement) {
    if (measurement.pH < 6.8 || measurement.pH > 8.5 || 
        measurement.chlorine < 0.5 || measurement.chlorine > 5.0 || 
        measurement.turbidity > 5 || measurement.eColi > 0) {
        return '<span style="color: red;">⚠️ Alert</span>';
    }
    return '<span style="color: green;">✔ Safe</span>';
}

// Display arrow indicators based on thresholds
function getArrow(value, min, max) {
    return value < min || value > max ? '<span style="color: red;">↑</span>' : '<span style="color: green;">↓</span>';
}

// Function to create graphs for each parameter
function createGraphs(measurements) {
    const graphContainer = document.getElementById('graphs');
    graphContainer.innerHTML = '';

    const labels = measurements.map(measurement => new Date(measurement.timestamp).toLocaleTimeString());
    
    // Define datasets for each parameter
    const datasets = [
        { label: 'pH', data: measurements.map(m => m.pH), borderColor: 'red' },
        { label: 'Chlorine', data: measurements.map(m => m.chlorine), borderColor: 'blue' },
        { label: 'Turbidity', data: measurements.map(m => m.turbidity), borderColor: 'orange' },
        { label: 'E.Coli', data: measurements.map(m => m.eColi), borderColor: 'green' }
    ];

    // Create individual graphs for each parameter
    datasets.forEach(dataset => {
        const canvas = document.createElement('canvas');
        canvas.className = 'graph';
        graphContainer.appendChild(canvas);

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [dataset]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: dataset.label + ' Over Time'
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Time' } },
                    y: { title: { display: true, text: dataset.label } }
                }
            }
        });
    });

    // Create a combined graph
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.className = 'graph';
    graphContainer.appendChild(combinedCanvas);

    new Chart(combinedCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'All Parameters Over Time'
                }
            },
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Values' } }
            }
        }
    });
}

// Toggle dark mode
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

console.log("App.js loaded successfully");

// Prompt user to update `index.html` if necessary
console.log("The app.js file is ready. If additional modifications are needed in index.html, please upload it.");
