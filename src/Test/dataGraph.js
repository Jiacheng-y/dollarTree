const dataGraph = (month, year) => {
    switch(month) {
        case 1:
            month1Year = year - 1;
            month1Month = 12;
            month2Year = year - 1;
            month2Month = 11;
            break;
        case 2:
            month1Year = year;
            month1Month = 1;
            month2Year = year - 1;
            month2Month = 12;
            break;
        default:
            month1Year = year;
            month1Month = month - 1;
            month2Year = year;
            month2Month = month - 2;
    }
    return {
        lastMonth: month1Month,
        lastMonthYear: month1Year,
        twoMonthsAgo: month2Month,
        twoMonthsAgoYear: month2Year
    };
}

module.exports = dataGraph;