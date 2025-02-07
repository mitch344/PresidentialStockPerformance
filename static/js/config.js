const presidentialTerms = {
    trump_term2: ["2025-01-20", new Date().toISOString().split('T')[0]],
    biden_term1: ["2021-01-20", "2025-01-20"],
    trump_term1: ["2017-01-20", "2021-01-20"],
    obama_term2: ["2013-01-20", "2017-01-20"],
    obama_term1: ["2009-01-20", "2013-01-20"],
    bush_term2: ["2005-01-20", "2009-01-20"],
    bush_term1: ["2001-01-20", "2005-01-20"],
    clinton_term2: ["1997-01-20", "2001-01-20"],
    clinton_term1: ["1993-01-20", "1997-01-20"],
    hw_bush_term1: ["1989-01-20", "1993-01-20"],
    reagan_term2: ["1985-01-20", "1989-01-20"],
    reagan_term1: ["1981-01-20", "1985-01-20"],
};

const partyColors = {
    republican: ['#FF5733', '#C92A1A'],
    democrat: ['#1E90FF', '#4682B4'],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                padding: 20,
                font: {
                    size: 14
                }
            }
        }
    },
    scales: {
        y: {
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            },
            title: {
                display: true,
                text: 'Percentage Change'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Months from Start of Term'
            }
        }
    }
};