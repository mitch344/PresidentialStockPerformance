async function loadStockData() {
  const stock = document.getElementById("stockSelect").value;
  const term1 = document.getElementById("presidentSelect1").value;
  const term2 = document.getElementById("presidentSelect2").value;
  let [startDate1, endDate1] = presidentialTerms[term1];
  let [startDate2, endDate2] = presidentialTerms[term2];

  // Ensure ongoing terms don't extend beyond today
  const today = new Date().toISOString().split('T')[0];
  if (new Date(endDate1) > new Date()) endDate1 = today;
  if (new Date(endDate2) > new Date()) endDate2 = today;

  try {
    const [data1, data2] = await Promise.all([
      fetchStockData(stock, startDate1, endDate1),
      fetchStockData(stock, startDate2, endDate2)
    ]);

    if (data1.error || data2.error) {
      throw new Error("Error fetching data");
    }

    createChart(data1, data2, term1, term2);
  } catch (error) {
    alert("An error occurred while fetching stock data.");
    console.error(error);
  }
}

async function fetchStockData(symbol, startDate, endDate) {
  const response = await fetch(`/get_stock_data?symbol=${symbol}&start=${startDate}&end=${endDate}`);
  return response.json();
}

function createChart(data1, data2, term1, term2) {
  const ctx = document.getElementById('stockChart').getContext('2d');
  if (window.stockChart instanceof Chart) {
    window.stockChart.destroy();
  }

  const aggregatedData1 = aggregateData(data1.dates, data1.prices);
  const aggregatedData2 = aggregateData(data2.dates, data2.prices);

  const percentageData1 = calcPercentageChange(aggregatedData1.prices);
  const percentageData2 = calcPercentageChange(aggregatedData2.prices);

  const maxLength = Math.max(aggregatedData1.dates.length, aggregatedData2.dates.length);
  const labels = Array.from({ length: maxLength }, (_, i) => `Month ${i + 1}`);

  const party1 = term1.includes('bush') || term1.includes('reagan') || term1.includes('trump') ? 'republican' : 'democrat';
  const party2 = term2.includes('bush') || term2.includes('reagan') || term2.includes('trump') ? 'republican' : 'democrat';
  
  const color1 = getPartyColor(term1, 0);
  const color2 = getPartyColor(term2, 1);

  window.stockChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: `${term1.replace(/_/g, ' ').toUpperCase()} Performance`,
          data: padData(percentageData1, maxLength),
          borderColor: color1,
          borderWidth: 2,
          fill: false,
        },
        {
          label: `${term2.replace(/_/g, ' ').toUpperCase()} Performance`,
          data: padData(percentageData2, maxLength),
          borderColor: color2,
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: chartOptions
  });
}

function padData(data, length) {
  return [...data, ...Array(length - data.length).fill(null)];
}
