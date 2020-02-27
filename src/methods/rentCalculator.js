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

/**
 * rentHistooryToMonthlyRents - returns rent for each month from various inputs
 * 
 * @param {number} rentOn20190315 - The rent on 2019-03-15
 * @param {number} initialRent - The initial rent paid by the tenant in cents
 * @param {string} tenancyStartDate - The start date of the tenancy as a datestring (date objects won't break anything)
 * @param {array} rentChanges - An array of objects specifying changes to the rent as {"month":"2019-12", "rent":200000}
 * @param {string} currentDate - The current date a datestring e.g. "2020-02-12" (date objects won't break anything)
 * 
 * @return {object} The rent each moonth indexed by date string {"2019-03":150000, ..., "2019-12": 200000} up to the current month
 *
 */
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
      dateToISOMonth(rentChanges[changeIndex].month) === nextMonth // make sure rent changes dates are iso months
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
/**
 * calculateMaxRents - returns the max rent under AB1482 for each month based on the location of the zip code
 * 
 * @param {number} zip - A 5 digit CA zip code
 * @param {object} monthlyRents - An object of rents indexed by month string returned from rentHistoryToMonthlyRents() e.g. {"2019-03": 150000, ...}
 * 
 * @return {object} The max AB1482 rent each month indexed by date string {"2019-03":Infinity, ..., "2020-01": 165000} up to the current month. Infinity indicates no limit on rent
 *
 */
export function calculateMaxRents(zip, monthlyRents) {
  let maxRents = {};
  let rentMonths = Object.keys(monthlyRents).sort();
  let index201903;

  for (let i = 0; i < rentMonths.length; i++) {
    let maxRent = {
      maxRent: null,
      rollbackExempt: false
    };
    let month = rentMonths[i];

    if (i == 0) {
      // if this is the first rent month then this is the epoch rent so it is the max
      maxRent.maxRent = monthlyRents[rentMonths[i]];
    }

    if (month === "2019-03") { 
      index201903 = i; // keep index position to use for setting the lookback window later
      
      // if the month is 2019-03 set the epoch rent max to this rent annd not add an increase
      // TODO (@sh1mmer) this doesn't account for before after 2019-03-15 rent dates
      // e.g. if rent was due on 2019-03-20 then 2019-02 rent might be the legal max not rent paid in 2019-03
      maxRent.maxRent = monthlyRents[rentMonths[i]]; 
    }

    if (month < "2019-03") {
      // until 2019-03 there was no cap so those months have an infinite cap and are exempt from rollback
      maxRent.maxRent = Infinity;
    }
    
    if (month < "2020-01") {
      // before 2020-01 months are exmpet from rollbacks
      maxRent.rollbackExempt = true;
    }

    /* for each rent period we need to calculate how far to look back for lowest rent
     * N.B. the 2019-03 code is still applicable after 2020-04 since we need to be able to still calculate past
     * illegal increases starting 2019-03 to calculate the correct current rollback rent
    */
    let startLookback = (month < "2020-04" && index201903) ? index201903 : i - 12; // use 2019-03 rent if we have it rent have it before 2020-04
    startLookback = (startLookback < 0) ? 0 : startLookback; // if lookback is further than rent history start at first rent month 
    
    // find the lowest rent and its month in the lookback range
    var lowestRentMonth = rentMonths[startLookback];
    var lowestRent = monthlyRents[lowestRentMonth];
    for (let j = startLookback + 1; j <= i; j++) {
      // make sure we include i so if the rent lowers we can reset to the current month
      if (monthlyRents[rentMonths[j]] < lowestRent) {
        lowestRentMonth = rentMonths[j];
        lowestRent = monthlyRents[lowestRentMonth];
      }
    }

    // if we didn't already set a maxRent for this month we should set one
    if (maxRent.maxRent === null) {
      if (month === lowestRentMonth) {
        // if this is the lowest rent month don't add the multiplier
        // this is important for the case when rent decreases
        maxRent.maxRent = lowestRent;
      } else {
        // TODO (@sh1mmer) we might want a way to inject this CPI calc function especially if this gets a remote data driver later
        let cpi = cpiChangeLookup(zip, lowestRentMonth); // lookup CPI for the month of lowest rent in this zip
        let maxModifier = Math.min(cpi + 0.05, 0.1); // use least of cpi + 5% or 10%
        let maxRentAmt = monthlyRents[lowestRentMonth] * (1 + maxModifier);
        maxRentAmt = Number(maxRentAmt.toFixed(0)); // TODO (@sh1mmer) decide about rounding and precision here
        maxRent.maxRent = maxRentAmt;
      }
    }

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
    if (monthlyRents[month] > maxRents[month].maxRent && !maxRents[month].rollbackExempt) {
      // exclude months before 2020-01-01 since they hve no legal max (e.g. Infinity)
      return month;
    }
  }

  return null;
}

export function calculateOverpayments(monthlyRents, maxRents, currentDate) {
  // returns array of months entitled to a refund
  // [{month: "2019-03", maxRent: 140000}, ... ]
  // month is ISO Date month ("yyyy-MM"), rent is int of price in cents
  let firstIllegalIncreaseMonth = findFirstIllegalIncreaseMonth(
    monthlyRents,
    maxRents
  );

  // TODO (@sh1mmer) get first illegal rent and then calc the delta from rent paid to the previous legal amount
  let rentMonths = Object.keys(monthlyRents).sort();
  let lastLegalRent;
  let overPayments = {};

  for (let i = 0; i < rentMonths.length; i++) {
    let month = rentMonths[i];
    // step until we get to the first illegal increase month n.b. this can never be month 0
    if (firstIllegalIncreaseMonth === null || month < firstIllegalIncreaseMonth) {
      overPayments[month] = 0;
      continue;
    }
    if (month == firstIllegalIncreaseMonth) {
      // if this is the first month with illegal rent then we step backwards from here through the rents paid
      // to find last time rent was less than the maximum allowed for the first illegal increase to use as the rollback rent
      // the rollback amount is _not_ the maxRent allowed but the last rent below the max
      for (let j = i - 1; j >= 0; j--) {
        let rollbackMonth = rentMonths[j];
        if (monthlyRents[rollbackMonth] < maxRents[rollbackMonth].maxRent || // if this month was under the limit
            rollbackMonth === "2019-03" || // or if we hit 2019-03
            j == 0) { // or we hit the first month of the rental
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

export function calculateRollbackRent(monthlyRents, maxRents, currentDate) {
  // returns (int) cents of rent the user should be paying on current date
  // if the current rent is legal then it returns the current rent
  let overPayments = calculateOverpayments(monthlyRents, maxRents, currentDate);
  let currMonth = dateToISOMonth(currentDate);

  let rollback = monthlyRents[currMonth] - overPayments[currMonth];
  return (rollback === monthlyRents[currMonth]) ? monthlyRents[currMonth] : rollback;
}

export function calculateRefund(overPayments, currentDate) {
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
