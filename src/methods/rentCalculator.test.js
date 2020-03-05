import { rentHistoryToMonthlyRents,
          calculateMaxRents, 
          calculateOverpayments, 
          findFirstIllegalIncreaseMonth, 
          calculateRollbackRent, 
          calculateRefund 
        } from "./rentCalculator";

describe("Monthly rents", () => {
  it("should throw if it doesn't have a 2019-03-15 rent or a start rent", () => {
    var t = () => {
      rentHistoryToMonthlyRents(null,null,null,[],"2020-02-29");
    };
    expect(t).toThrow();

  });

  it("should handle an increase from 1500 to 1800, two months apart", () => {
    var monthlyRents = rentHistoryToMonthlyRents(
      1000,
      null,
      null,
      [{ month: "2019-06", rent: 1500 }, { month: "2019-08", rent: 1800 }],
      "2020-02-12"
    );

    expect(monthlyRents).toEqual({
      "2019-03": 1000,
      "2019-04": 1000,
      "2019-05": 1000,
      "2019-06": 1500,
      "2019-07": 1500,
      "2019-08": 1800,
      "2019-09": 1800,
      "2019-10": 1800,
      "2019-11": 1800,
      "2019-12": 1800,
      "2020-01": 1800,
      "2020-02": 1800
    });
  });

  it("should be able to create rents from 2019-03-15", () => {
    var monthlyRents = rentHistoryToMonthlyRents(
      1000,
      null,
      null,
      [],
      "2020-02-12"
    );

    expect(monthlyRents).toEqual({
      "2019-03": 1000,
      "2019-04": 1000,
      "2019-05": 1000,
      "2019-06": 1000,
      "2019-07": 1000,
      "2019-08": 1000,
      "2019-09": 1000,
      "2019-10": 1000,
      "2019-11": 1000,
      "2019-12": 1000,
      "2020-01": 1000,
      "2020-02": 1000
    });
  });

  it("should be able to create rents from a tenancy before 2019-03-15", () => {
    var monthlyRents = rentHistoryToMonthlyRents(
      null,
      1001,
      "2019-01-01",
      [],
      "2020-02-12"
    );

    expect(monthlyRents).toEqual({
      "2019-01": 1001,
      "2019-02": 1001,
      "2019-03": 1001,
      "2019-04": 1001,
      "2019-05": 1001,
      "2019-06": 1001,
      "2019-07": 1001,
      "2019-08": 1001,
      "2019-09": 1001,
      "2019-10": 1001,
      "2019-11": 1001,
      "2019-12": 1001,
      "2020-01": 1001,
      "2020-02": 1001
    });
  });

  it("should be able to create rents from a tenancy after 2019-03-15", () => {
    var monthlyRents = rentHistoryToMonthlyRents(
      null,
      1002,
      "2019-06-01",
      [],
      "2020-02-12"
    );

    expect(monthlyRents).toEqual({
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1002,
      "2019-09": 1002,
      "2019-10": 1002,
      "2019-11": 1002,
      "2019-12": 1002,
      "2020-01": 1002,
      "2020-02": 1002
    });
  });

  it("should be able to create rents from a tenancy and add increases", () => {
    var monthlyRents = rentHistoryToMonthlyRents(
      null,
      1002,
      "2019-06-01",
      [{ month: "2019-08", rent: 1500 }],
      "2020-02-12"
    );

    expect(monthlyRents).toEqual({
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1500,
      "2020-02": 1500
    });
  });

  it("should be able to handle rent decreases", () => {
    var monthlyRents = rentHistoryToMonthlyRents(
      null,
      1002,
      "2019-06-01",
      [{ month: "2019-08", rent: 1500 }, {month: "2020-01", rent: 1085}],
      "2020-02-12"
    );

    expect(monthlyRents).toEqual({
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1085,
      "2020-02": 1085
    });
  });
});

describe("Max rents", () => {
  // only 2020 months should get non-infinity max rent
  // max rent should go back to use the first rent month (2019-06) not the more recent 2019-12
  it("should not mark max rents until 2020-01", () => {
    var monthlyRents = {
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1500,
      "2020-02": 1500
    };

    var maxRents = calculateMaxRents(94110, monthlyRents);

    expect(maxRents).toEqual({
      "2019-06": { maxRent: 1002, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
      "2020-02": { maxRent: 1085, rollbackExempt: false },
    });
  });

  it("should not use rent before 2019-03 to calculate max rent", () => {
    var monthlyRents = {
      "2018-12": 300,
      "2019-01": 300,
      "2019-02": 300,
      "2019-03": 1002,
      "2019-04": 1002,
      "2019-05": 1002,
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1500
    };

    var maxRents = calculateMaxRents(94110, monthlyRents);

    expect(maxRents).toEqual({
      "2018-12": { maxRent: Infinity, rollbackExempt: true },
      "2019-01": { maxRent: Infinity, rollbackExempt: true },
      "2019-02": { maxRent: Infinity, rollbackExempt: true },
      "2019-03": { maxRent: 1002, rollbackExempt: true },
      "2019-04": { maxRent: 1085, rollbackExempt: true },
      "2019-05": { maxRent: 1085, rollbackExempt: true },
      "2019-06": { maxRent: 1085, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
    });
  });

    it("should reset the cap correctly if the rent decreases", () => {
      var monthlyRents = {
        "2018-12": 300,
        "2019-01": 300,
        "2019-02": 300,
        "2019-03": 1002,
        "2019-04": 1002,
        "2019-05": 1500,
        "2019-06": 1500,
        "2019-07": 900,
        "2019-08": 900,
        "2019-09": 2000,
        "2019-10": 2000,
        "2019-11": 2000,
        "2019-12": 2000,
        "2020-01": 2000
      };

      var maxRents = calculateMaxRents(94110, monthlyRents);

      expect(maxRents).toEqual({
        "2018-12": { maxRent: Infinity, rollbackExempt: true },
        "2019-01": { maxRent: Infinity, rollbackExempt: true },
        "2019-02": { maxRent: Infinity, rollbackExempt: true },
        "2019-03": { maxRent: 1002, rollbackExempt: true },
        "2019-04": { maxRent: 1085, rollbackExempt: true },
        "2019-05": { maxRent: 1085, rollbackExempt: true },
        "2019-06": { maxRent: 1085, rollbackExempt: true },
        "2019-07": { maxRent: 900, rollbackExempt: true },
        "2019-08": { maxRent: 975, rollbackExempt: true },
        "2019-09": { maxRent: 975, rollbackExempt: true },
        "2019-10": { maxRent: 975, rollbackExempt: true },
        "2019-11": { maxRent: 975, rollbackExempt: true },
        "2019-12": { maxRent: 975, rollbackExempt: true },
        "2020-01": { maxRent: 975, rollbackExempt: false },
      });
    });

  it("after 2020-03 we look back a year to calculate max rent", () => {
    var monthlyRents = {
      "2018-12": 300,
      "2019-01": 300,
      "2019-02": 300,
      "2019-03": 1002,
      "2019-04": 1002,
      "2019-05": 1002,
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1500,
      "2020-02": 1500,
      "2020-03": 1500,
      "2020-04": 1500,
      "2020-05": 1500,
    };

    var maxRents = calculateMaxRents(94110, monthlyRents);

    expect(maxRents).toEqual({
      "2018-12": { maxRent: Infinity, rollbackExempt: true },
      "2019-01": { maxRent: Infinity, rollbackExempt: true },
      "2019-02": { maxRent: Infinity, rollbackExempt: true },
      "2019-03": { maxRent: 1002, rollbackExempt: true },
      "2019-04": { maxRent: 1085, rollbackExempt: true },
      "2019-05": { maxRent: 1085, rollbackExempt: true },
      "2019-06": { maxRent: 1085, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
      "2020-02": { maxRent: 1085, rollbackExempt: false },
      "2020-03": { maxRent: 1085, rollbackExempt: false },
      "2020-04": { maxRent: 1085, rollbackExempt: false },
      "2020-05": { maxRent: 1085, rollbackExempt: false },
    });
  });
});

describe("Finding first illegal increase", () => {
  it("should find illegal incerases starting in 2020", () => {
    var monthlyRents = {
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1500,
      "2020-02": 1500
    };

    var maxRents = {
      "2019-06": { maxRent: 1002, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
      "2020-02": { maxRent: 1085, rollbackExempt: false },
    };

    var firstIllegalMonth = findFirstIllegalIncreaseMonth(monthlyRents, maxRents);

    expect(firstIllegalMonth).toEqual("2020-01");
  });

  it("should return null if there are no illegal increases", () => {
    var monthlyRents = {
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1085,
      "2020-02": 1085
    };

    var maxRents = {
      "2019-06": { maxRent: 1002, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
      "2020-02": { maxRent: 1085, rollbackExempt: false },
    };

    var firstIllegalMonth = findFirstIllegalIncreaseMonth(monthlyRents, maxRents);

    expect(firstIllegalMonth).toEqual(null);
  });
});

describe("Calcuating overpayments", () => {
  it("should not produce refunds before 2020", () => {
    var monthlyRents = {
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1500,
      "2020-02": 1500
    };

    var maxRents = {
      "2019-06": { maxRent: 1002, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
      "2020-02": { maxRent: 1085, rollbackExempt: false },
    };

    var refunds = calculateOverpayments(monthlyRents, maxRents, "2020-2-29");

    expect(refunds).toEqual({
      "2019-06": 0,
      "2019-07": 0,
      "2019-08": 0,
      "2019-09": 0,
      "2019-10": 0,
      "2019-11": 0,
      "2019-12": 0,
      "2020-01": 498,
      "2020-02": 498
    });
  });
});

describe("Calcuating rollback rent", () => {
  it("should show the correct rollback", () => {
    var monthlyRents = {
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1500,
      "2020-02": 1500
    };

    var maxRents = {
      "2019-06": { maxRent: 1002, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
      "2020-02": { maxRent: 1085, rollbackExempt: false },
    };

    var rollbackRent = calculateRollbackRent(monthlyRents, maxRents, "2020-2-29");

    expect(rollbackRent).toEqual(1002);
  });

  it("should return current max if there is no rollback", () => {
    var monthlyRents = {
      "2019-06": 1002,
      "2019-07": 1002,
      "2019-08": 1500,
      "2019-09": 1500,
      "2019-10": 1500,
      "2019-11": 1500,
      "2019-12": 1500,
      "2020-01": 1085,
      "2020-02": 1085
    };

    var maxRents = {
      "2019-06": { maxRent: 1002, rollbackExempt: true },
      "2019-07": { maxRent: 1085, rollbackExempt: true },
      "2019-08": { maxRent: 1085, rollbackExempt: true },
      "2019-09": { maxRent: 1085, rollbackExempt: true },
      "2019-10": { maxRent: 1085, rollbackExempt: true },
      "2019-11": { maxRent: 1085, rollbackExempt: true },
      "2019-12": { maxRent: 1085, rollbackExempt: true },
      "2020-01": { maxRent: 1085, rollbackExempt: false },
      "2020-02": { maxRent: 1085, rollbackExempt: false },
    };

    var rollbackRent = calculateRollbackRent(monthlyRents, maxRents, "2020-2-29");

    expect(rollbackRent).toEqual(1085);
  });
});

describe("Calcuating rollback rent", () => {
  it("should sum refunds correctly", () => {
    var overpayments = {
      "2019-06": 0,
      "2019-07": 0,
      "2019-08": 0,
      "2019-09": 0,
      "2019-10": 0,
      "2019-11": 0,
      "2019-12": 0,
      "2020-01": 498,
      "2020-02": 498
    };

    var refund = calculateRefund(overpayments, "2020-2-29");

    expect(refund).toEqual(996);
  });
});