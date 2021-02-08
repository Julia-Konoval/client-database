export default class {
  /**
   * @param {HTMLTableElement} the table element will display the CSV data
   */
  constructor(root) {
    this.root = root;
    console.log("I am constructed!");
  }

  /**
   *  @param {string[][]} data A 2D array of data to be used as the table body
   * @param {string[][]} headerColumns list of headings to be used
   */
  update(data, headerColumns = []) {
    this.clear();
    this.setHeader(headerColumns);
    this.setBody(data);
  }

  clear() {
    this.root.innerHTML = "";
  }

  /**
   * @param {string[]} headerColumns list of headings to be used
   */
  setHeader(headerColumns) {
    this.root.insertAdjacentHTML(
      "afterbegin",
      `
<thead>
<tr>
${headerColumns.map((text) => `<th>${text}</th>`).join("")}
</tr>
</thead>
`
    );
  }

  /**
   * @param {string[][]} headerColumns list of headings to be used
   */
  setBody(data) {
    const rowsHtml = data.map((row) => {
      return `<tr>
    ${row.map((text) => `<td>${text}</td>`).join("")}
    </tr>`;
    });
    this.root.insertAdjacentHTML(
      "beforeend",
      `
    <tbody>
    ${rowsHtml.join("")}
    </tbody>
    `
    );
  }
}
