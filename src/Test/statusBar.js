const statusBar = (data) => {
    const proportion = (data.amount == 0
        ? (data.expenses == 0 ? 1 : 2)
        : (data.expenses / data.amount).toFixed(2)); 
    return proportion;
}

module.exports = statusBar;