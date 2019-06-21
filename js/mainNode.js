// const { compare, createSortedIncludedData } = require("./main")
// console.log(compare)
// console.log(createSortedIncludedData)

// exports.compare = (a, b) => {
//     if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
//     if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
//     return 0;
// }

// exports.createSortedIncludedData = (includedData) => {
//     let currentId = "";
//     let sortedData = {};

//     includedData.forEach(item => {
//         if (currentId === "") {
//             currentId = item.id.split("-")[0];
//             sortedData[currentId] = [];
//             sortedData[currentId].push(item);
//         }

//         let newId = item.id.split("-")[0];
//         if (newId === currentId) sortedData[currentId].push(item);
//         else {
//             currentId = item.id.split("-")[0];
//             sortedData[currentId] = [];
//             sortedData[currentId].push(item);
//         }
//     });
//     return sortedData;
// }