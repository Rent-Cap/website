import React from "react";
import { PrimaryButton } from "../components/Buttons";
import AppContext from "../components/AppContext"

const County = () => {
    return (
        <AppContext.Consumer>
            {({ appCtx, updateContext }) => (
                <div>
                    <p>It looks like you live in { appCtx.town } in { appCtx.county } county.</p>

                    <p>Either { appCtx.town } doesn't have has rent or eviction protections, or you weren't eligible.</p>
                    <p>Since {appCtx.county } county has some protections we want to figure out if you are eligible for those protections provided by { appCtx.county } county law. If those don't apply the state-wide protections in AB1482 may still apply to you.</p>

                    <p>You can reach out to these great resources in { appCtx.county } county to figure out if you are eligible.</p>
                    <PrimaryButton to="/es/gethelp">Get help from a local tenants right group!</PrimaryButton>
                    

                    <p><br />Do you get rent control in { appCtx.county } county?</p>
                    <PrimaryButton to="/es/eligibility/state">No, help my check state-wide</PrimaryButton>
                    
                </div>
            )}
        </AppContext.Consumer>
    )
};

export default County;