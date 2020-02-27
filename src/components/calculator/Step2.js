
import AppContext from "../AppContext";
import React, { useEffect } from "react";
import YesNoState from "../clauses/YesNoState";

function Step2() {
    return (
        <AppContext.Consumer>
        {appCtx => {
          return (
            <>
              {appCtx.moveInAfter15Mar2019 === undefined ?
              <YesNoState
                questionText="Did you move in after March 15th, 2019?"
                stateName="moveInAfter15Mar2019"
              /> :
              ( // only show rent after move in date
                <div>
                  {appCtx.moveInAfter15Mar2019 ? ( // ask about the correct date
                    <label for="initialRent">
                      What was your initial rent when you first rented your current unit?
              </label>
                  ) : (
                      <label for="initialRent">
                        What was your rent on March 15th, 2019?
              </label>
                    )}
    
                  <input name="initialRent" id="initialRent" type="text" />
                </div>
              )}
            </>
          );
        }}
      </AppContext.Consumer>
    );
}

export default Step2;