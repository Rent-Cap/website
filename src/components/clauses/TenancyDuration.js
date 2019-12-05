import { StyledPrimaryButton } from "../Buttons";
import React from "react"
import AppContext from "../AppContext"
import { navigate } from "@reach/router";

class TenancyDuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shared: null,
            sharedTenantDuration: null,
            tenantDuration: null,
            to: props.to,
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

    onSharedDuration = (sharedTenantDuration, oldCtx, updateContext) => {
        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        this.setState({ sharedTenantDuration });
        
        newCtx.sharedTenantDuration = sharedTenantDuration;
        updateContext(newCtx);

        if (sharedTenantDuration) {
            navigate(this.state.to);
        }
    }

    onSingleDuration = (tenantDuration, oldCtx, updateContext) => {
        var newCtx = {};
        for (const key in oldCtx) {
            newCtx[key] = oldCtx[key];
        }

        this.setState({ tenantDuration });
        
        newCtx.tenantDuration = tenantDuration;
        updateContext(newCtx);  
        
        navigate(this.state.to);

    }

    render() {
        console.log(this.state)
        return (
            <AppContext.Consumer>
                {({ appCtx, updateContext }) => (
                    <div>
                        {this.state.shared === null ?
                            <div>
                                <p>Do you share your lease with another adult, or sub-lease from someone else who isn't the landlord?</p>
                                <StyledPrimaryButton onClick={(e) => { this.onShare(false, appCtx, updateContext) }} type="button">I'm the only person on the lease</StyledPrimaryButton>
                                <StyledPrimaryButton onClick={(e) => { this.onShare(true, appCtx, updateContext) }} type="button">I share my lease or sub-let</StyledPrimaryButton>
                            </div>
                        : (this.state.shared && this.state.sharedTenantDuration === null) ?
                            <div>
                                <p>Have you or anyone you share with or sub-let from been renting for at least 2 full years?</p>
                                <StyledPrimaryButton onClick={(e) => { this.onSharedDuration(true, appCtx, updateContext) }} type="button">Yes</StyledPrimaryButton>
                                <StyledPrimaryButton onClick={(e) => { this.onSharedDuration(false, appCtx, updateContext) }} type="button">No</StyledPrimaryButton>
                            </div> :
                            <div>
                                <p>Have you been renting for at least 1 full year?</p>
                                <StyledPrimaryButton onClick={(e) => { this.onSingleDuration(true, appCtx, updateContext) }} type="button">Yes</StyledPrimaryButton>
                                <StyledPrimaryButton onClick={(e) => { this.onSingleDuration(false, appCtx, updateContext) }} type="button">No</StyledPrimaryButton>
                            </div>
                        }
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

export default TenancyDuration;