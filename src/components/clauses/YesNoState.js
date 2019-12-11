import { StyledPrimaryButton } from "../Buttons";
import React from "react"
import AppContext from "../AppContext"
import { navigate } from "gatsby";

class YesNoState extends React.Component {
    constructor(props) {
        super(props);

        if (!(props.yes && props.no && 
            props.questionText && props.stateName)) {
            // we need a valid inputs otherwise it's an error
            this.setState({ hasError: true});
            return
        }
        var yesText = props.yesText ? props.yesText : 'Yes';
        var noText = props.noText ? props.noText : 'No';

        this.state = {
            stateName: props.stateName,
            questionText: props.questionText,
            yes: props.yes,
            no: props.no,
            yesText: yesText,
            noText: noText,
        }
    }

    onChange = (yes, oldCtx, updateContext) => {
        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        newCtx[this.props.stateName] = yes;
        updateContext(newCtx);        

        if (yes) {
            navigate(this.state.yes);
        } else {
            navigate(this.state.no);
        }
    }

    render() {
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    <div>
                    <p>{this.state.questionText}</p>
                    <StyledPrimaryButton onClick={(e)=> { this.onChange(true, appCtx, updateContext)}} type="button">{this.state.yesText}</StyledPrimaryButton>&nbsp;
                    <StyledPrimaryButton onClick={(e)=> { this.onChange(false, appCtx, updateContext)}} type="button">{this.state.noText}</StyledPrimaryButton>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

export default YesNoState;