import { StyledPrimaryButton } from "../Buttons";
import React from "react"
import AppContext from "../AppContext"
import { navigate } from "gatsby";

class YesNoMaybeState extends React.Component {
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
            yes: props.yes,
            no: props.no,
            maybe: props.maybe,
            yesText: props.yesText,
            noText: props.noText,
            maybeText: props.maybeText,
            dict: {
                en: {yes: 'Yes', no: 'No', maybe: "I don't know", eligibility: 'Check My Eligibility'},
                es: {yes: 'Si', no: 'No', maybe: 'No lo sé', eligibility: 'Verificar Mi Elegibilidad'}
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

        if (yes === 'yes') {
            navigate(this.state.yes);
        } else if (yes === 'no') {
            navigate(this.state.no);
        } else {
            navigate(this.state.maybe);
        }
    }

    render() {
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    <div>
                    <h1>{this.state.dict[appCtx.lang].eligibility}</h1>
                    <p>{this.state.questionText}</p>
                    <center><StyledPrimaryButton onClick={(e)=> { this.onChange('yes', appCtx, updateContext)}} type="button">{this.state.yesText ? this.state.yesText : this.state.dict[appCtx.lang].yes}</StyledPrimaryButton>&nbsp;
                    <StyledPrimaryButton onClick={(e)=> { this.onChange('no', appCtx, updateContext)}} type="button">{this.state.noText ? this.state.noText : this.state.dict[appCtx.lang].no}</StyledPrimaryButton>&nbsp;
                    <StyledPrimaryButton onClick={(e)=> { this.onChange('idk', appCtx, updateContext)}} type="button">{this.state.maybeText ? this.state.maybeText : this.state.dict[appCtx.lang].maybe}</StyledPrimaryButton></center>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

export default YesNoMaybeState;
