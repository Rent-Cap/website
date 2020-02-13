import React from "react";
import { QuickContactForm } from "../../components/Contact";
import Zip from "../../components/Zip";
import AppContext from "../../components/AppContext";
import CalcDisclaimer from "../../components/CalcDisclaimer";
import Calculator from "../../components/Calculator";
import QuickContact from "../../components/QuickContact";

function fn() {
  return (
    <div style={{ width: "100%" }}>
      <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
          <div>
            <h1>Rent Calculator</h1>
            {/* <div className="card">
              <div className="card-body">
                <p id="intro">
                  Renters eligible for protection under the Tenant Protection
                  Act are protected against rent increases that exceed 10% in a
                  one year period or the cost of living + 5%, whichever is
                  lower. If you have received a rent increase you can use our
                  calculator to help you determine what the allowable increase
                  is under the law, and if your rent increase exceeds the limit.
                  Eligible renters who got a rent increase anytime on or after
                  March 15, 2019 should use the rent calculator, as increases in
                  2019 may be rolled back resulting in a rent reduction.
                </p>
                <CalcDisclaimer
                  ab1482RentCapEligible={appCtx.ab1482RentCapEligible}
                />
              </div>
            </div>
            <br />
            <QuickContact /> */}
            <Calculator />
            <br />
          </div>
        )}
      </AppContext.Consumer>
    </div>
  );
}

export default fn;
