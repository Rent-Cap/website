import { StyledPrimaryButton } from "../components/Buttons";
import React from "react";
import AppContext from "./AppContext";
import {
  regulatedCities,
  regulatedCounties
} from "../../data/regulatedLocations";
import { navigate } from "@reach/router";

class FlowSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: "",
      btnText: props.btnText,
      errText: props.errText,
      disabled: true,
    };
  }

  onClick(appCtx) {
    var town = appCtx.town;
    var county = appCtx.county;
    var to = "";
    if (town !== "") {
      var disabled = false;
      this.setState({ disabled });
    }

    if (town in regulatedCities) {
      to = "/eligibility/cities/" + town;
    } else if (county in regulatedCounties) {
      to = "/eligibility/counties/" + county;
    } else if (town != "") {
      to = "/eligibility/state";
    }

    if (appCtx.lang !== 'undefined' && appCtx.lang === 'es') {
      to = '/es' + to;
    }

    if (to) {
      navigate(to);
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
          <div className="center-layout">
            <StyledPrimaryButton disabled={!appCtx.validCAZip} onClick={(e)=>{this.onClick(appCtx)}}>{this.state.btnText}</StyledPrimaryButton>
            {(appCtx.town === undefined && appCtx.zip !== undefined) ?
              <p className="error">{this.state.errText}</p>
            :
              <p className="error"></p>
            }
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default FlowSelector;
