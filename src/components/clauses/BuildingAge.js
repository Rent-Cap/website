import { StyledPrimaryButton } from "../Buttons";
import React from "react"
import AppContext from "../AppContext"
import { navigate } from "gatsby";

class BuildingAge extends React.Component {
    constructor(props) {
        super(props);
        var absYear, relYear;
        var currYear = (new Date()).getFullYear();

        if (props.type === "relative") {
            relYear = props.relYear;
            absYear = currYear - props.relYear;
        }  else if (props.type === "absolute") {
            absYear = props.absYear;
            relYear = currYear - props.absYear;
        } else {
            // we need a valid type
            this.setState({ hasError: true});
            return
        }

        this.state = {
            absYear: absYear,
            relYear: relYear,
            yes: props.yes,
            no: props.no,
            stateName: props.stateName,
        }
    }

    onChange = (olderThan, oldCtx, updateContext, to) => {

        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        newCtx.olderThan = olderThan;

        // set the least built before year as long as builtBefore isn't 0
        if (olderThan && oldCtx.builtBefore && oldCtx.builtBefore > this.state.absYear) {
            newCtx.builtBefore = this.state.absYear;
            newCtx[this.state.stateName] = true;
        } else {
            newCtx[this.state.stateName] = false;
        }
        updateContext(newCtx);        

        navigate(to);
    }

    render() {
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    <div>
                    <p>Is your building at least {this.state.relYear} years old (built before {this.state.absYear})?</p>
                    <StyledPrimaryButton onClick={(e)=> { this.onChange(true, appCtx, updateContext, this.state.yes)}} type="button">Yes</StyledPrimaryButton>&nbsp;
                    <StyledPrimaryButton onClick={(e)=> { this.onChange(false, appCtx, updateContext, this.state.no)}} type="button">No</StyledPrimaryButton>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

export default BuildingAge;