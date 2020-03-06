import React from "react";
import * as CalcCore from "../../methods/rentCalculator"
import {dateAndZipToCPI} from "../../methods/cpi"

export const Step4 = ({ appCtx }) => {
    var ctx = appCtx.appCtx;
    var now = Date();
    var monthlyRents = CalcCore.rentHistoryToMonthlyRents(ctx.rentOn20190315, ctx.initialRent, ctx.tenancyStartDate, ctx.rentChanges, now);
    var maxRents = CalcCore.calculateMaxRents(ctx.zip, monthlyRents, dateAndZipToCPI);
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
                        <p>{refund ?
                            "Since you received a rent increase that was not legal you may be entitled to a refund from your landlord for each month you overpayed. The amount shown above is the total amount you paid above your \"rollback rent\"." :
                            "Since we did not recieve an illegal rent increase we do not think you are currently entitled to a refund from your landlord."
                        }</p>
                    </div>
                    <div>
                        <h1>Rollback Rent</h1>
                    <h2 className="bigInfo">{refund ? <>${rollbackRent}</> : <>No Rollback</>}</h2>
                        <p>{refund ?
                            "Since we think you received an illegal rent increase your rent should \'rollback\" to the last legal rent you paid that was less than your current maximum legal rent." :
                            "Since your current rent is equal or less than the legal maximum your landlord can choose to charge you, and you did not recieve any illegal increases we think your current rent is legal."
                        }</p>
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
