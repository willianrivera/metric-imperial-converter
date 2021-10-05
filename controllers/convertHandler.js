function ConvertHandler() {
  this.getNum = function (input) {
    const letters = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => letters.test(char));
    if (idx < 1) {
      return 1;
    }

    const values = input.slice(0, idx).split("/");
    if (values.length === 1) {
      const num = Number(values[0]);
      return num === null ? "invalid number" : num;
    }
    if (values.length === 2) {
      let [numerator, denominator] = values;
      numerator = Number(numerator);
      denominator = Number(denominator);
      return numerator === null || denominator === null
        ? "invalid number"
        : numerator / denominator;
    }

    return "invalid number";
  };

  this.getUnit = function (input) {
    const letters = /[a-zA-Z]/;
    const idx = input.split("").findIndex((char) => letters.test(char));
    if (idx < 0) {
      return "invalid unit";
    }
    const unit = input.slice(idx);
    return this.spellOutUnit(unit);
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const units = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    if (unit === "L") return "L";
    if (units.hasOwnProperty(unit.toLowerCase())) {
      return unit.toLowerCase();
    }
    return "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversionRate = {
      gal: galToL,
      L: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
    };
    return Math.round(conversionRate[initUnit] * initNum * 1e5) / 1e5;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const unitMapping = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    return `${initNum} ${unitMapping[initUnit]} converts to ${returnNum} ${unitMapping[returnUnit]}`;
  };
}

module.exports = ConvertHandler;
