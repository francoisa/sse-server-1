const getData = () => {
    var productList = [];
    for (let i = 0; i < 10; i++) {
        let rowData = {
            Id: i + 1,
            Title: `Product ${i + 1}`, 
            Price: Math.floor(Math.random() * 10000) + 5000 
        };
        productList.push(rowData);
    }
    return productList;
}

module.exports = getData;