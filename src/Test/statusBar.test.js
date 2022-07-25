const statusBar = require('./statusBar');

test('amount = expenses = 0', () => {
    const data = { amount : 0, expenses : 0}
    expect(statusBar(data)).toBe(1);
})

test('expenses > amount', () => {
    const data = { amount : 0, expenses : 20}
    expect(statusBar(data)).toBe(2);
})

test('terminating decimal', () => {
    const data = { amount : 100, expenses : 25}
    expect(statusBar(data)).toBe("0.25");
})

test('non-terminating decimal', () => {
    const data = { amount : 30.2, expenses : 22.1}
    expect(statusBar(data)).toBe("0.73");
})