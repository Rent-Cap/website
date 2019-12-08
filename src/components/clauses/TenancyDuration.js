import { StyledPrimaryButton } from "../Buttons";
import React from "react"
import AppContext from "../AppContext"
import { navigate } from "@reach/router";

class TenancyDuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shared: null,
            sharedWithLandlord: null,
            tenantOver24Mo: null,
            allTenantsOver12Mo: null,
            yes: props.yes,
            no: props.no,
        }
    }

    onShare = (shared, oldCtx, updateContext) => {
        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        this.setState({ shared });
        
        newCtx.shared = shared;
        updateContext(newCtx);
    }

    onLongestTenant = (tenantOver24Mo, oldCtx, updateContext) => {
        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        this.setState({ tenantOver24Mo });
        
        newCtx.tenantOver24Mo = tenantOver24Mo;
        updateContext(newCtx);

        if (tenantOver24Mo) {
            navigate(this.state.yes);
        }
    }

    onAllTenants = (allTenantsOver12Mo, oldCtx, updateContext) => {
        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        this.setState({ allTenantsOver12Mo });
        
        newCtx.allTenantsOver12Mo = allTenantsOver12Mo;
        updateContext(newCtx);  
        
        if (allTenantsOver12Mo) {
            navigate(this.state.yes);
        } else {
            navigate(this.state.no);
        }

    }

    render() {
        console.log(this.state)
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    <div>
                        {this.state.shared === null ?
                        <div>
                            <p>Excluding your landlord do you share with another adult who is on your lease, or sub-lease from someone else?</p>
                            <StyledPrimaryButton onClick={(e) => { this.onShare(false, appCtx, updateContext) }} type="button">I'm the only person on the lease</StyledPrimaryButton>&nbsp;
                            <StyledPrimaryButton onClick={(e) => { this.onShare(true, appCtx, updateContext) }} type="button">I share my lease or sub-let</StyledPrimaryButton>
                        </div>
                        : (this.state.shared && this.state.tenantOver24Mo === null) ?
                        <div>
                            <p>Have you or anyone you share with or sub-let from been renting this property for at least 2 full years?</p>
                            <StyledPrimaryButton onClick={(e) => { this.onLongestTenant(true, appCtx, updateContext) }} type="button">Yes</StyledPrimaryButton>&nbsp;
                            <StyledPrimaryButton onClick={(e) => { this.onLongestTenant(false, appCtx, updateContext) }} type="button">No</StyledPrimaryButton>
                        </div>
                        : (this.state.shared) ?
                        <div>
                            <p>Has everyone you share with been renting for at least 1 full year?</p>
                            <StyledPrimaryButton onClick={(e) => { this.onAllTenants(true, appCtx, updateContext) }} type="button">Yes</StyledPrimaryButton>&nbsp;
                            <StyledPrimaryButton onClick={(e) => { this.onAllTenants(false, appCtx, updateContext) }} type="button">No</StyledPrimaryButton>
                        </div>
                        :
                        <div>
                            <p>Have you been renting for at least 1 full year?</p>
                            <StyledPrimaryButton onClick={(e) => { this.onAllTenants(true, appCtx, updateContext) }} type="button">Yes</StyledPrimaryButton>&nbsp;
                            <StyledPrimaryButton onClick={(e) => { this.onAllTenants(false, appCtx, updateContext) }} type="button">No</StyledPrimaryButton>
                        </div>
                        }
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

export default TenancyDuration;