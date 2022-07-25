const dataGraph = require('./dataGraph');

test('Jan edge case', () => {
    const result = {
        lastMonth: 12,
        lastMonthYear: 2021,
        twoMonthsAgo: 11,
        twoMonthsAgoYear: 2021
    }
    expect(dataGraph(1, 2022)).toEqual(result);
})

test('Feb edge case', () => {
    const result = {
        lastMonth: 1,
        lastMonthYear: 2023,
        twoMonthsAgo: 12,
        twoMonthsAgoYear: 2022
    }
    expect(dataGraph(2, 2023)).toEqual(result);
})

test('Normal case', () => {
    const result = {
        lastMonth: 3,
        lastMonthYear: 2021,
        twoMonthsAgo: 2,
        twoMonthsAgoYear: 2021
    }
    expect(dataGraph(4, 2021)).toEqual(result);
})