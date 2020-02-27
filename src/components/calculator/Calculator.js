import React from "react";
import AppContext from "../AppContext";
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
