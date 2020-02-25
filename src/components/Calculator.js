import React from "react";
import Zip from "../components/Zip";
import AppContext from "./AppContext";
import YesNoState from "../components/clauses/YesNoState";
import CalculatorStepper from "./CalculatorStepper";

function Calculator() {
  return (
    <AppContext.Consumer>
      {appCtx => {
        return (
          <div className="card" id="calculator">
            <div className="card-body">
              <CalculatorStepper appCtx={appCtx}></CalculatorStepper>
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Calculator;
