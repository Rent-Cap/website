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

        this.state = {
            stateName: props.stateName,
            questionText: props.questionText,
            yesText: props.yesText,
            noText: props.noText,
            yes: props.yes,
            no: props.no,
            dict: {
                en: {yes:'Yes', no:'No'},
                es: {yes:'Si', no:'No'}
            }
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
                    <StyledPrimaryButton onClick={(e)=> { this.onChange(true, appCtx, updateContext)}} type="button">{this.state.yesText ? this.state.yesText : this.state.dict[appCtx.lang].yes}</StyledPrimaryButton>&nbsp;
                    <StyledPrimaryButton onClick={(e)=> { this.onChange(false, appCtx, updateContext)}} type="button">{this.state.noText ? this.state.noText : this.state.dict[appCtx.lang].no}</StyledPrimaryButton>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

export default YesNoState;