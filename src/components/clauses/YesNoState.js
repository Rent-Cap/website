import { StyledPrimaryButton } from "../Buttons";
import React from "react";
import AppContext from "../AppContext";
import { navigate } from "gatsby";

const YesNoState = ({ stateName, questionText, yesText, noText, yes, no }) => {
  var dict = {
    en: { yes: "Yes", no: "No" },
    es: { yes: "Si", no: "No" }
  };

  const onChange = (yes, oldCtx, updateContext) => {
    var newCtx = { ...oldCtx };

    newCtx[stateName] = yes;
    updateContext(newCtx);

    if (yes) {
      navigate(yes);
    } else {
      navigate(no);
    }
  };

  return (
    <AppContext.Consumer>
      {({ appCtx, updateContext }) => {
        return (
          <div>
            <p>{questionText}</p>
            <StyledPrimaryButton
              onClick={e => {
                onChange(true, appCtx, updateContext);
              }}
              type="button"
            >
              {yesText ? yesText : dict[appCtx.lang].yes}
            </StyledPrimaryButton>
            &nbsp;
            <StyledPrimaryButton
              onClick={e => {
                onChange(false, appCtx, updateContext);
              }}
              type="button"
            >
              {noText ? noText : dict[appCtx.lang].no}
            </StyledPrimaryButton>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default YesNoState;
