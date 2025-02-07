function calcPercentageChange(prices) {
    const startPrice = prices[0];
    return prices.map(price => ((price - startPrice) / startPrice) * 100);
}

function aggregateData(dates, prices, interval = 'month') {
    let aggregatedDates = [];
    let aggregatedPrices = [];
    let currentPeriod = new Date(dates[0]);
    let currentPrices = [];

    dates.forEach((date, index) => {
        const currentDate = new Date(date);
        if (currentDate.getMonth() === currentPeriod.getMonth()) {
            currentPrices.push(prices[index]);
        } else {
            aggregatedDates.push(currentPeriod.toISOString().split('T')[0]);
            aggregatedPrices.push(currentPrices.reduce((sum, price) => sum + price, 0) / currentPrices.length);
            currentPeriod = currentDate;
            currentPrices = [prices[index]];
        }
    });

    aggregatedDates.push(currentPeriod.toISOString().split('T')[0]);
    aggregatedPrices.push(currentPrices.reduce((sum, price) => sum + price, 0) / currentPrices.length);

    return { dates: aggregatedDates, prices: aggregatedPrices };
}

function getPartyColor(term, index) {
    const isRepublican = term.includes('bush') || term.includes('reagan') || term.includes('trump');
    const party = isRepublican ? 'republican' : 'democrat';
    return partyColors[party][index];
}