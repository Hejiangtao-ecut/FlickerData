const bodyData = [
    { column: 0, words: "", row: 0 },
    { column: 1, words: "title-----", row: 0 },
    { column: 4, words: "", row: 0 },
    { column: 0, words: "product", row: 1 },
    { column: 1, words: "2015", row: 1 },
    { column: 3, words: "2016", row: 1 },
    { column: 4, words: "2017", row: 1 },
    { column: 0, words: "", row: 2 },
    { column: 0, words: "Matcha", row: 3 },
    { column: 1, words: "43.3", row: 3 },
    { column: 3, words: "85.8", row: 3 },
    { column: 4, words: "93.7", row: 3 },
    { column: 0, words: "Milk", row: 4 },
    { column: 1, words: "83.1", row: 4 },
    { column: 3, words: "73.4", row: 4 },
    { column: 4, words: "55.1", row: 5 },
    { column: 0, words: "Walnut", row: 6 },
    { column: 1, words: "72.4", row: 6 },
    { column: 3, words: "53.9", row: 6 },
    { column: 4, words: "39.1", row: 6 },
    { column: 0, words: "", row: 5 },
    { column: 1, words: "", row: 5 },
    { column: 3, words: "", row: 5 },
    { column: 4, words: "", row: 5 }
];

const analysis = [];

bodyData.forEach(item => {
    const { column, row, words } = item;
    // 对应行不存在数组的时候创建一个
    if (!analysis[row]) {
        analysis[row] = [];
    }
    analysis[row][column] = words;
})

console.log(analysis);

const relData = [];
analysis.forEach((item, index) => {
    const goodData = item.filter(v => v);
    // if (!relData[index].length) {
    //     relData.pop();
    // }
    goodData.length ? relData.push(goodData) : '';
})
console.log(relData);