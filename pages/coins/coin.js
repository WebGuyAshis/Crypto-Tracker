// Function to get the value of a parameter by name
function getParameterByName(name) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get(name);
}

// Get the coin ID from the URL
const coinId = getParameterByName('coinName');
const days = '30'; 

// Function to fetch historical price data
const fetchHistoricalData = async (coinId, days) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
        const data = await response.json();

        // Process and format the data for Highcharts
        return data.prices.map(([timestamp, price]) => [timestamp, price]);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return [];
    }
};

// Function to initialize and update the Highcharts chart
const initializeChart = async (coinId) => {
    const historicalData = await fetchHistoricalData(coinId, days);

    Highcharts.chart('container', {
        chart: {
            type: 'area',
            zooming: {
                type: 'x'
            },
            panning: true,
            panKey: 'shift',
            scrollablePlotArea: {
                minWidth: 600
            }
        },
        title: {
            text: `Price History of ${coinId}`,
            align: 'left'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Price (USD)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: 'Date: {point.x:%e. %b}<br>',
            pointFormat: 'Price: ${point.y:.2f} USD'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: `${coinId} price`,
            data: historicalData,
            lineColor: Highcharts.getOptions().colors[1],
            color: Highcharts.getOptions().colors[2],
            fillOpacity: 0.5,
            marker: {
                enabled: false
            },
            threshold: null
        }]
    });
};

// Initialize the chart
initializeChart(coinId);
