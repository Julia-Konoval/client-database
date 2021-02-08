import TableCSV from "./TableCSV.js";

const tableRoot = document.querySelector("#csvRoot");
const tableCSV = new TableCSV(tableRoot);

Papa.parse("./data/test.csv", {
  download: true,
  complete: function (results) {
    const headers = results.data[0];
    const data = results.data.slice(1);
    updateTable(data, headers);
  },
});

function updateTable(allData, headers) {
  // Trim data and add index as a string
  allData.forEach((data, index) => {
    data.unshift((index + 1).toString());
    data.forEach((content, i) => (data[i] = content.trim()));
  });

  headers.unshift("Index");
  tableCSV.update(allData, headers);
}
