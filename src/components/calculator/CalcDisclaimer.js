import React from "react";

function CalcDisclaimer({ ab1482RentCapEligible }) {
  return (
    <div id="disclaimers">
      {ab1482RentCapEligible === undefined ? ( // if they haven't checked include a link to the eligibility calculator
        <div className="disclaimer">
          <p>
            This calculator assumes you are eligibile for the Tenant Protection
            Act. If you aren't sure if you are eligible you can use our{" "}
            <a href="">eligibility checker</a>. If you aren't eligible this
            calculator may over or under estimate the maximum rent increase your
            landlord could ask for depending on your local laws.
          </p>
        </div>
      ) : ab1482RentCapEligible === false ? ( // if they have checked but aren't eligible display a warning and reminder
        <div className="disclaimer">
          <p>
            This calculator assumes you are eligibile for the Tenant Protection
            Act. Your answers to our eligibility checker indicated that you
            aren't eligiblity for a rent cap under the Tenant Protection Act.
            Based on your answers this calculator may over or underestimate the
            maximum rent increase your landlord could ask for depending on your
            local laws.
          </p>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default CalcDisclaimer;
