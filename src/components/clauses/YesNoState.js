import Button from '@material-ui/core/Button';
import React from "react";
import AppContext from "../AppContext";
import { navigate } from "gatsby";

const YesNoState = ({ stateName, questionText, yesText, noText, yes, no, callback}) => {
  var dict = {
    en: { yes: "Yes", no: "No" },
    es: { yes: "Si", no: "No" }
  };

  const onChange = (answer, oldCtx, updateContext) => {
    var newCtx = { ...oldCtx };

    newCtx[stateName] = answer;
    updateContext(newCtx, ()=>{if (callback) {callback({appCtx: newCtx, answer: answer})}});

    if (yes && answer) {
      navigate(yes);
    } else if (no) {
      navigate(no);
    }
  };

  return (
    <AppContext.Consumer>
      {({ appCtx, updateContext }) => {
        return (
          <div>
            <p>{questionText}</p>
            <Button
              onClick={e => {
                onChange(true, appCtx, updateContext);
              }}
              type="button"
              variant={(appCtx[stateName] !== undefined && appCtx[stateName]) ? "contained" : "outlined"}
              color="primary"
            >
              {yesText ? yesText : dict[appCtx.lang].yes}
            </Button>
            &nbsp;
            <Button
              onClick={e => {
                onChange(false, appCtx, updateContext);
              }}
              type="button"
              variant={(appCtx[stateName] !== undefined && !appCtx[stateName]) ? "contained" : "outlined"}
              color="primary"
            >
              {noText ? noText : dict[appCtx.lang].no}
            </Button>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default YesNoState;
