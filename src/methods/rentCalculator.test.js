import { calculateMaxRent, rentHistoryToMonthlyRents } from "./rentCalculator";

describe("Monthly rents", () => {
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
});
