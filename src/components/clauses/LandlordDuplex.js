import { StyledPrimaryButton } from "../Buttons";
import React from "react"
import AppContext from "../AppContext"
import { navigate } from "gatsby";

class LandlordDuplex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            yes: props.yes,
            no: props.no,
        }
    }

    onLandlordOccupies = (yes, oldCtx, updateContext, to) => {

        console.log('click', yes, oldCtx, to);

        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        newCtx.landlordOccupiesDuplex = yes;

        updateContext(newCtx);        

        if (!yes) {
        navigate(to);
        }
    }

    onLandlordOccupiedAtStart = (yes, oldCtx, updateContext, to) => {

        console.log('click', yes, oldCtx, to);

        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        newCtx.onLandlordOccupiedAtStart = yes;

        updateContext(newCtx);        

        navigate(to);

    }


    render() {
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    <div>
                     { !appCtx.landlordOccupiesDuplex ?
                    
                    <div>
                        <p>Does your landlord live in the other unit of the Duplex you rent as their main residence?</p>
                    <StyledPrimaryButton onClick={(e)=> { this.onLandlordOccupies(true, appCtx, updateContext, this.state.yes)}} type="button">Yes</StyledPrimaryButton>&nbsp;
                    <StyledPrimaryButton onClick={(e)=> { this.onLandlordOccupies(false, appCtx, updateContext, this.state.no)}} type="button">No</StyledPrimaryButton>
                    </div>
                    :
                    
                    <div>
                        <p>Did your landlord live in the other unit of the Duplex when you started renting?</p>
                    <StyledPrimaryButton onClick={(e)=> { this.onLandlordOccupiedAtStart(true, appCtx, updateContext, this.state.yes)}} type="button">Yes</StyledPrimaryButton>&nbsp;
                    <StyledPrimaryButton onClick={(e)=> { this.onLandlordOccupiedAtStart(false, appCtx, updateContext, this.state.no)}} type="button">No</StyledPrimaryButton>
                    </div>
                    }
                    </div>

                )}
            </AppContext.Consumer>
        );
    }
}

export default LandlordDuplex;