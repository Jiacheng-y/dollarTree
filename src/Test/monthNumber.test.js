const monthNumber = require('./monthNumber');

test('Jan returns 1', () => {
    expect(monthNumber("Jan")).toEqual(1);
})

test('Dec returns 12', () => {
    expect(monthNumber("Dec")).toEqual(12);
})