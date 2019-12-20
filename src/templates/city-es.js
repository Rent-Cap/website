import React from "react";
import { PrimaryButton } from "../components/Buttons";
import AppContext from "../components/AppContext";

const City = () => {
  return (
    <AppContext.Consumer>
      {({ appCtx, updateContext }) => (
        <div>
          <p>
            It looks like you live in {appCtx.town} in {appCtx.county} county.
          </p>

          <p>
            Since {appCtx.town} has rent and eviction protections we want to
            figure out if you are eligible for those. If those don't cover you
            then the state-wide protections of AB 1482 may still apply, and
            we'll help you figure that out too.
          </p>

          <p>
            You can reach out to these great resources in {appCtx.town} to
            figure out if you are eligible.
          </p>
          <PrimaryButton to="/es/resources">
            Get help from a local tenants right group!
          </PrimaryButton>

          <p>
            <br />
            Think you may not be covered under rent control provisions in{" "}
            {appCtx.town}?
          </p>
          <PrimaryButton to="/es/eligibility/state/">
            Check my status state-wide
          </PrimaryButton>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default City;
