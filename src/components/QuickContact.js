import React from "react";
import AppContext from "./AppContext";
import QuickContactForm from "./Contact";

function QuickContact() {
  return (
    <AppContext.Consumer>
      {appCtx => {
        return (
          <div id="quickContact">
            {!appCtx.quickFormSubmit ? (
              <div>
                <div className="card">
                  <div className="card-body">
                    <h5>Psst... before you calculate your rent</h5>
                    <p>
                      If you share your contact details with us we can follow up
                      later to support you with your housing situation
                    </p>
                    <QuickContactForm autohide={true} />
                  </div>
                </div>
                <br />
              </div>
            ) : (
              <div />
            )}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default QuickContact;
