import moment from "moment";

export function handleInput(key, event) {
  const obj = {};
  obj[key] = event.target.value;
  this.setState(obj);
}

export function calculateMaxRent(pastRent = 0, cpi = 0.033) {
  const plusTenPercent = pastRent * 1.1;
  const cpiCalc = pastRent * (1 + 0.05 + parseFloat(cpi));
  const min = Math.min(plusTenPercent, cpiCalc);
  return parseFloat(min).toFixed(2);
}

// Used to determine the rent on march 15 2019 from range data
export function determineRentOnDateFromRentRanges(targetDate, rentRanges = []) {
  if (!targetDate) throw new Error("No target date given.");
  let rent;
  for (let i = 0; i < rentRanges.length; i++) {
    const daysBefore = targetDate.diff(rentRanges[i].startDate, "days", true);
    const daysAfter = rentRanges[i].endDate.diff(targetDate, "days", true);
    if (daysBefore >= 0 && daysAfter >= 0) rent = rentRanges[i].rent;
  }
  return rent;
}

export function determineMaxRentFromRentRanges(
  targetDate,
  rentRanges = [],
  cpi = 0.033
) {
  const rentOnTargetDate = determineRentOnDateFromRentRanges(
    targetDate,
    rentRanges
  );
  return calculateMaxRent(rentOnTargetDate, cpi);
}

export function calculateTotalAmountOwedToTenant(rentRanges = [], cpi = 0.033) {
  // NOTE: rentRanges must be sorted past --> present
  // WARNING: Only accurate before mar 15 2020!
  let result = 0;
  if (rentRanges.length < 1) return result;
  const mar152019 = moment([2019, 2, 15]);
  const pastRent = determineRentOnDateFromRentRanges(mar152019, rentRanges);

  for (let i = 0; i < rentRanges.length; i++) {
    const rent = rentRanges[i].rent;
    const start = rentRanges[i].startDate;
    const end = rentRanges[i].endDate;

    const maxRent = calculateMaxRent(pastRent, cpi);
    const janFirst2020 = moment([2020, 0, 1]);
    const diff = rentRanges[i].endDate.diff(janFirst2020, "months", true);
    const isAfterJan2020 = diff > 0 ? true : false;
    const monthsPaidAfterJan2020 = isAfterJan2020
      ? end.diff(start, "months", true)
      : 0;

    result += rent > maxRent ? (rent - maxRent) * monthsPaidAfterJan2020 : 0;
  }
  return result > 0 ? parseFloat(result).toFixed(2) : 0;
}

export const checkFlags = (arr, flags) => {
  let result = "";
  const mapping = {
    and: " && ",
    or: " || ",
    not: "!"
  };
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "object") {
      result += "(";
      for (let j = 0; j < arr[i].length; j++) {
        const flagVal = flags[arr[i][j]];
        const mappingVal = mapping[arr[i][j]];
        if (typeof flagVal !== "undefined") {
          let term;
          if (flagVal === "yes") {
            term = true;
          } else if (flagVal === "no") {
            term = false;
          }
          if (typeof term !== "undefined") {
            result += term;
          } else {
            return false;
          }
        } else if (typeof mappingVal !== "undefined") {
          result += mappingVal;
        } else {
          throw new Error("Unknown flag or mapping");
        }
      }
    } else {
      result += ")";
      result += mapping[arr[i]];
    }
  }
  result += ")";
  return eval(result);
};
