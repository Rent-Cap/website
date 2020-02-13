/*
 * calculateMaxRent - determine the maximum current rent should be based on rent history
 *
 * zip - the zip code of the user, used to determine which CPI to use
 * rentOn20190315 - the rent on 15 Mar 2019 if they rented then
 * initialRent - the rent at the start of their tenancy
 * tenancyStartDate - the date they started their tenancy (ISO Date format yyyy-MM-dd e.g. 2019-03-15)
 * rentChanges - an array of rent changes tuples as objects
 *  - rent - the new rent amount (not the delta)
 *  - month - the month of the increase (ISO Month yyyy-MM e.g. 2019-05).
 * currentDate - the current date (ISO DATE format yyyy-MM-dd)
 *
 * return value - the maximum allowed per month
 *
 */

// returns array of tuples of monthly rents based on history
// [{month: "2019-03", rent: 140000, delta: 400}, ... ]
// month is ISO Date month ("yyyy-MM"), rent is int of price in cents, delta is change in rent from previous month
export function rentHistoryToMonthlyRents(
  rentOn20190315,
  initialRent,
  tenancyStartDate,
  rentChanges,
  currentDate
) {
  let monthlyRents = {};
  let startMonth;

  if (initialRent > 0) {
    // include full history if we have it
    startMonth = dateToISOMonth(tenancyStartDate); // use dateToISOMonth to cover date strings or date objs
    monthlyRents[startMonth] = initialRent;
  } else if (rentOn20190315 !== undefined && rentOn20190315 !== null) {
    // otherwise start from April 2019
    startMonth = "2019-03";
    monthlyRents[startMonth] = rentOn20190315;
  } else {
    // error we should have one or the other
    throw new Error(
      "Either tenancy start date must be provdied or rent on 2019-03-15"
    );
  }

  // DEBT (@sh1mmer)
  // there are some assumptions here about rent being due on the 1st of the month
  // ideally if we know the rent start / monthly rent date we can work around that
  // e.g. if your rent is due on 15th of the month and it's currently the 1st then your rent month isn't "complete" until 15th
  let finalMonth = dateToISOMonth(currentDate);
  let changeIndex = 0; // TODO (@sh1mmer) assumption that rentChanges are already sorted
  let currMonth = startMonth;

  while (!monthlyRents[finalMonth]) {
    let nextMonth = addISOMonths(currMonth, 1);
    if (
      rentChanges.length > 0 &&
      changeIndex < rentChanges.length &&
      rentChanges[changeIndex].month === nextMonth
    ) {
      // if the next month has a change in rent use that
      // TODO (@sh1mmer) assumption that there is only one rent increase in a month (probably true)
      monthlyRents[nextMonth] = rentChanges[changeIndex].rent;
      changeIndex += 1; // increment the change index
    } else {
      // otherwise copy previous month's rent
      monthlyRents[nextMonth] = monthlyRents[currMonth];
    }
    currMonth = nextMonth;
  }

  return monthlyRents;
}

// returns array of maximum allowable rent each month starting max(2019-03, tenancyStartDate, current date - 1y)
// [{month: "2019-03", maxRent: 140000}, ... ]
// month is ISO Date month ("yyyy-MM"), rent is int of price in cents
export function calculateMaxRents(zip, monthlyRents) {
  let maxRents = {};
  let rentMonths = Object.keys(monthlyRents).sort();
  let index201903;

  for (let i = 0; i < rentMonths.length; i++) {
    let month = rentMonths[i];

    if (month < "2020-01") {
      // until 2020-01 there was no cap
      if (month === "2019-03") {
        index201903 = i; // track this index for later
      }
      // TODO (@sh1mmer) fix assumption here about rent being the same for all of 2019-03 rather than before/after 2019-03-15
      maxRents[month] = -1; // -1 for infinity
      continue;
    }

    // look back 12 months for lowest rent or from 2019-03 if a year hasn't passed
    // TODO (@sh1mmer) tidy this up later when it isn't needed
    startLookback = month < "2020-04" ? index201903 : i - 12;

    let lowestRent = monthlyRents[startLookback];
    let lowestRentMonth = rentMonths[startLookback];
    for (let j = startLookback + 1; j < i; j++) {
      if (monthlyRents[rentMonths[j]] < lowestRent) {
        lowestRentMonth = rentMonths[j];
        lowestRent = monthlyRents[rentMonths[j]];
      }
    }

    let cpi = cpiChangeLookup(zip, lowestRentMonth); // lookup CPI for the month of lowest rent in this zip
    let maxModifier = Math.min(cpi + 0.05, 0.1); // use least of cpi + 5% or 10%
    let maxRent = monthlyRents[lowestRentMonth] * (1 + maxModifier);
    maxRents[month] = maxRent;
  }

  return maxRents;
}

export function findFirstIllegalIncreaseMonth(monthlyRents, maxRents) {
  // returns the first month that has rent above the max allowed
  // this includes rent that carried over from 2019 that subsequently became illegal not just new increases
  let rentMonths = Object.keys(monthlyRents).sort();

  // TODO (@sh1mmer) add something to find illegal increase based on number of increases in 12mo period
  for (let i = 0; i < rentMonths.length; i++) {
    let month = rentMonths[i];
    if (monthlyRents[month] > maxRents[month] && maxRents[month] !== -1) {
      // exclude months before 2020-01-01 since they hve no legal max (e.g. -1)
      return month;
    }
  }

  return null;
}

export function calculateRefunds(monthlyRents, maxRents, currentDate) {
  // returns array of months entitled to a refund
  // [{month: "2019-03", maxRent: 140000}, ... ]
  // month is ISO Date month ("yyyy-MM"), rent is int of price in cents
  let firstIllegalIncreaseMonth = findFirstIllegalIncreaseMonth(
    monthlyRents,
    maxRents
  );

  if (firstIllegalIncreaseMonth === null) {
    // we don't have any months in which the rent was too damn high (legally speaking)
    // TODO need to make the array still. jeez.
    return 0;
  }

  // TODO get first illegal rent and then calc the delta from rent paid to the previous legal amount
  let rentMonths = Object.keys(monthlyRents).sort();
  let lastLegalRent;
  let overPayments = {};

  for (let i = 0; i < rentMonths.length; i++) {
    let month = rentMonths[i];
    // step until we get to the first illegal increase month n.b. this can never be month 0
    if (month < firstIllegalIncreaseMonth) {
      overPayments[month] = 0;
      continue;
    }
    if (month >= firstIllegalIncreaseMonth) {
      // if this is the first month with illegal rent then we step backwards from here through the rents paid
      // to find the first rent less than the maximum allowed for the first illegal increase to use as the rollback rent
      // the rollback amount is _not_ the maxRent allowed but the last rent below the max
      for (let j = i - 1; j >= 0; j--) {
        let rollbackMonth = rentMonths[j];
        if (monthlyRents[rollbackMonth] < maxRents[firstIllegalIncreaseMonth]) {
          // TODO (@sh1mmer) after Jun 15 2020 this should always be i-1 (or it wouldn't be the first illegal increase)
          // before Jun 15 2020 since increase above the cap for 2020-01-01 were legal from 2019-03-15 to 2019-12-31
          // we want to be able to step back past i-1 if needed to find a rent paid less than the cap
          // TODO (@sh1mmer) validate how this works with multiple increases in 12mo period
          lastLegalRent = monthlyRents[rollbackMonth];
          break;
        }
      }
    }

    // set the overpayment for this month to the amount above the last legal rent
    overPayments[month] = monthlyRents[month] - lastLegalRent;
  }

  return overPayments;
}

export function calculateRollback(monthlyRents, maxRents, currentDate) {
  // returns (int) cents of rent the user should be paying on current date // if the current rent is legal then it returns 0
  let overPayments = calculateRefunds(monthlyRents, maxRents, currentDate);
  let currMonth = dateToISOMonth(currentDate);

  let rollback = monthlyRents[currMonth] - overPayments[currMonth];
  return rollback === monthlyRents[currMonth] ? 0 : rollback;
}

function calculateRefund(overPayments, currentDate) {
  // returns (int) cents of the total refund amount based on any monthly rents that were over the maxRents
  // we can just sum the over payments array
  return Object.values(overPayments).reduce(function(a, b) {
    return a + b;
  });
}

// dateToISOMonth - converts a date object or a datestring to an ISO month datestring e.g. yyyy-MM or "2019-03"
// accepts a date object or a valid datestring that can be used to make a date object
// idempotent for existing ISO month datestrings
export function dateToISOMonth(d) {
  let dDate = new Date(d); // make a new date from d to ensure that it is a date object while providing compat with valid date strings
  // TODO (@sh1mmer) make sure the use of the UTC functions doesn't then break date objects with timezones somehow
  return (
    dDate.getUTCFullYear() +
    "-" +
    (dDate.getUTCMonth() + 1 + "").padStart(2, "0")
  );
}

// addISOMonths - adds i months to a date object or a datestring and returns as an ISO month datestring e.g. yyyy-MM or "2020-01"
// accepts a date object or a valid datestring that can be used to make a date object and an int number of months (-ints will subtract)
// it will increment years as needed
export function addISOMonths(d, i) {
  let dDate = new Date(d); // make a new date from d to ensure that it is a date object while providing compat with valid date strings
  dDate.setUTCMonth(dDate.getUTCMonth() + i);
  return dateToISOMonth(dDate);
}

// cpiChange Lookup - returns the "change in the cost of living" for the specificied date and zip
export function cpiChangeLookup(zip, date) {
  // TODO (@sh1mmer) implement me!!
  return 0.033;
}

/*
exports.rentHistoryToMonthlyRents = rentHistoryToMonthlyRents;
exports.calculateMaxRents = calculateMaxRents;
exports.findFirstIllegalIncreaseMonth = findFirstIllegalIncreaseMonth;
exports.calculateRefunds = calculateRefunds;
exports.calculateRollback = calculateRollback;
exports.calculateRefund = calculateRefund;
exports.dateToISOMonth = dateToISOMonth;
exports.addISOMonths = addISOMonths;
*/
