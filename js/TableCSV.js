export default class {
  constructor(root) {
    this.root = root;
  }
  update(data, headerColumns = []) {
    this.setHeader(headerColumns);
    this.setBody(data);
  }

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

  abbrState(input, to) {
    var states = [
      ["Alabama", "AL"],
      ["Alaska", "AK"],
      ["American Samoa", "AS"],
      ["Arizona", "AZ"],
      ["Arkansas", "AR"],
      ["Armed Forces Americas", "AA"],
      ["Armed Forces Europe", "AE"],
      ["Armed Forces Pacific", "AP"],
      ["California", "CA"],
      ["Colorado", "CO"],
      ["Connecticut", "CT"],
      ["Delaware", "DE"],
      ["District Of Columbia", "DC"],
      ["Florida", "FL"],
      ["Georgia", "GA"],
      ["Guam", "GU"],
      ["Hawaii", "HI"],
      ["Idaho", "ID"],
      ["Illinois", "IL"],
      ["Indiana", "IN"],
      ["Iowa", "IA"],
      ["Kansas", "KS"],
      ["Kentucky", "KY"],
      ["Louisiana", "LA"],
      ["Maine", "ME"],
      ["Marshall Islands", "MH"],
      ["Maryland", "MD"],
      ["Massachusetts", "MA"],
      ["Michigan", "MI"],
      ["Minnesota", "MN"],
      ["Mississippi", "MS"],
      ["Missouri", "MO"],
      ["Montana", "MT"],
      ["Nebraska", "NE"],
      ["Nevada", "NV"],
      ["New Hampshire", "NH"],
      ["New Jersey", "NJ"],
      ["New Mexico", "NM"],
      ["New York", "NY"],
      ["North Carolina", "NC"],
      ["North Dakota", "ND"],
      ["Northern Mariana Islands", "NP"],
      ["Ohio", "OH"],
      ["Oklahoma", "OK"],
      ["Oregon", "OR"],
      ["Pennsylvania", "PA"],
      ["Puerto Rico", "PR"],
      ["Rhode Island", "RI"],
      ["South Carolina", "SC"],
      ["South Dakota", "SD"],
      ["Tennessee", "TN"],
      ["Texas", "TX"],
      ["US Virgin Islands", "VI"],
      ["Utah", "UT"],
      ["Vermont", "VT"],
      ["Virginia", "VA"],
      ["Washington", "WA"],
      ["West Virginia", "WV"],
      ["Wisconsin", "WI"],
      ["Wyoming", "WY"],
    ];

    var i; // Reusable loop variable
    if (to == "abbr") {
      input = input.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      for (i = 0; i < states.length; i++) {
        if (states[i][0] == input) {
          return states[i][1];
        }
      }
      return "ERROR";
    } else if (to == "name") {
      input = input.toUpperCase();
      for (i = 0; i < states.length; i++) {
        if (states[i][1] == input) {
          return states[i][0];
        }
      }
    }
  }
  initialInfoCheck(name, phone, email) {
    if (name === "" || phone === "" || email === "") return true;
  }
  checkAge(age) {
    if (age < 21 || isNaN(age)) return "style=background-color:#d17b7b";
  }
  checkExperience(years) {
    if (years < 21) return "style=background-color:#d17b7b";
  }
  checkIncome(income) {
    if (income < 0 || income > 1000000) return "style=background-color:#d17b7b";
  }
  checkDate(date) {
    var m = moment(date, ["MM/DD/YYYY", "YYYY/MM/DD"], true);
    if (!m.isValid()) return "style=background-color:#d17b7b";
  }
  checkPhoneNumber(number) {
    const parsedNumber = libphonenumber.parsePhoneNumberFromString(
      number,
      "US"
    );
    if (!parsedNumber.isPossible()) return "style=background-color:#d17b7b";
  }
  checkChildren(hasChildren) {
    hasChildren = hasChildren.toLowerCase();
    if (hasChildren === "true") {
      return "TRUE";
    } else if (hasChildren === "false" || hasChildren === "") {
      return "FALSE";
    }
    return "ERROR";
  }

  checkLicense(license) {
    const letters = /^[0-9a-zA-Z]{0,6}$/;
    if (!license.match(letters)) return "style=background-color:#d17b7b";
  }

  setBody(data) {
    let invalidFile = false;
    const rowHtml = data.map((row) => {
      // If there is an invalid row, don't check other rows just keep returning throughout the map iteration
      if (invalidFile) return;
      invalidFile = this.initialInfoCheck(row[1], row[2], row[3]);

      return `
      <tr >
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td ${this.checkPhoneNumber(row[2])}>${row[2]}</td>
      <td >${row[3]}</td>
      <td ${this.checkAge(row[4])}>${row[4]}</td>
      <td ${this.checkExperience(row[5])}>${row[5]}</td>
      <td ${this.checkIncome(row[6])}>${Number(row[6]).toFixed(2)}</td>
      <td>${this.checkChildren(row[7])}</td>
      <td>${this.abbrState(row[8], "abbr")}</td>
      <td ${this.checkDate(row[9])}>${row[9]}</td>
      <td ${this.checkLicense(row[10])}>${row[10]}</td>

      </tr>
      `;
    });
    this.root.insertAdjacentHTML(
      "beforeend",
      `<tbody>
    ${rowHtml.join("")}</tbody>`
    );

    // Reset the table and display 'Invalid file'
    if (invalidFile) {
      this.root.innerHTML = "Invalid File";
    }
  }
}
