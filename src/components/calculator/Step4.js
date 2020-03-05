import React from "react";
import * as CalcCore from "../../methods/rentCalculator"

export const Step4 = ({ appCtx }) => {
  var ctx = appCtx.appCtx;
  var now = Date();
  var monthlyRents = CalcCore.rentHistoryToMonthlyRents(ctx.rentOn20190315, ctx.initialRent, ctx.tenancyStartDate, ctx.rentChanges, now);
  var maxRents = CalcCore.calculateMaxRents(ctx.zip, monthlyRents);
  var overpayments = CalcCore.calculateOverpayments(monthlyRents, maxRents, now);
  var refund = CalcCore.calculateRefund(overpayments, now);
  var rollbackRent = CalcCore.calculateRollbackRent(monthlyRents, maxRents, now);
  return (<>
    <div>
      {ctx.rentChange ?
        <>
          <div>
            <h1>Legal Rent Increase{ctx.rentChanges.length > 1 ? "s" : ""}</h1>
            <h2 className="bigInfo">
              {refund ? "No" : "Yes" // since everyone should be getting refunds now we use this to quickly check about illegal increases
              }
            </h2>
            <p>We {refund ? "" : "do not"} think your rent increase{ctx.rentChanges.length > 1 ? "s were" : " was"} above the legal limit.</p>
          </div>
          <div>
            <h1>Suggested Refund</h1>
            <h2 className="bigInfo">${refund}</h2>
            <p>Since you recieved a rent increase that was not legal you may be entitled to a refund from your landlord for each month you overpayed.</p>
          </div>
          <div>
            <h1>Rollback Rent</h1>
            <h2 className="bigInfo">${rollbackRent}</h2>
            <p>Since you recieved a rent increase that was not legal your rent should revert to the last legal rent you paid that was less than your current maximum legal rent.</p>
          </div>
        </>
        : <></>}
      <div>
        <h1>Maximum Rent</h1>
        <h2 className="bigInfo">${maxRents[CalcCore.dateToISOMonth(now)].maxRent}</h2>
        <p>We believe the maximum your landlord can ask you for in rent is ${maxRents[CalcCore.dateToISOMonth(now)].maxRent} for the next 12 months.</p>
      </div>
    </div>
  </>);
};
