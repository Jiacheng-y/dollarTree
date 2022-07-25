const monthName = require('./monthName');

test('1 returns January', () => {
    expect(monthName(1)).toEqual("January");
})

test('12 returns December', () => {
    expect(monthName(12)).toEqual("December");
})