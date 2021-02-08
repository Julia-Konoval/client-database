import TableCsv from "./TableCSV.js";

const tableRoot = document.querySelector("#csvRoot");
const tableCsv = new TableCsv(tableRoot);
tableCsv.update(
  [
    [4500, "dom", 16],
    [9500, "dom", 26],
    [4400, "dom", 86],
  ],
  ["ID", "Name", "Age"]
);

