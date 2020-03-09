import React from "react";
import { PrimaryButton } from "../components/Buttons";
import AppContext from "../components/AppContext";

const City = () => {
  return (
    <AppContext.Consumer>
      {({ appCtx, updateContext }) => (
        <div className="center-layout">
          <p>
            <h1>Wait! It looks like you live in {appCtx.town} in {appCtx.county} County, which has its own rent and eviction protections!</h1>
            Before checking your state-wide eligibility, you should first determine if {appCtx.town}'s protections cover you. If they do not cover you,
            then the state-wide protections of the Tenant Protection Act may still apply.
          </p>

          <p>
            You should check out {appCtx.town}'s city website to
            figure out if you are protected by their rent and eviction protections.
          </p>
          <PrimaryButton to="/resources">
            Check out our resources page!
          </PrimaryButton>

          <p>
            <br />
            <b>Think you may not be covered under {appCtx.town}'s rent and eviction protections?</b>
          </p>
          <PrimaryButton to="/eligibility/state/">
            Check my status state-wide
          </PrimaryButton>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default City;
