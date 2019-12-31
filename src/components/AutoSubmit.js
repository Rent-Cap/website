import React from "react";
import AppContext from "./AppContext";

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
};

const AutoSubmit = () => {
    const submitForm = (appCtx) => {
        if (appCtx.includeDetails) {

            const values = {
                firstName: appCtx.firstName, 
                lastName: appCtx.lastName, 
                email: appCtx.email, 
                cell: appCtx.cell,
                tenancyDuration: appCtx.tenancyDuration,
                inEligibleType: appCtx.inEligibleType,
                vouchers: appCtx.vouchers,
                buildingAge: appCtx.buildingAge,
                sharedKitchenOrBath: appCtx.sharedKitchenOrBath,
                atLeast4Units: appCtx.atLeast4Units,
                condo: appCtx.condo,
                bizOwner: appCtx.bizOwner,
                exmpetionNotice: appCtx.exmpetionNotice,
                sfh: appCtx.sfh,
                landlordShare: appCtx.landlordShare,
                duplex: appCtx.duplex,
                sharedDuplex: appCtx.sharedDuplex,
                sharedUnitWithLandlord: appCtx.sharedUnitWithLandlord
            }
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "eligibiltyAnswers", ...values })
            })

                .catch(error => console.log(error));

        }

    };

    return (
        <AppContext.Consumer>
            {({ appCtx, updateContext }) => (
                <form  name="eligibiltyAnswers" data-netlify="true" data-netlify-honeypot="bot-field">
                    <input type="hidden" name="form-name" value="eligibiltyAnswers" />
                    <input type="hidden" name="tenancyDuration" value={appCtx.tenancyDuration} />
                    <input type="hidden" name="inEligibleType" value={appCtx.inEligibleType} />
                    <input type="hidden" name="vouchers" value={appCtx.vouchers} />
                    <input type="hidden" name="buildingAge" value={appCtx.buildingAge} />
                    <input type="hidden" name="sharedKitchenOrBath" value={appCtx.sharedKitchenOrBath} />
                    <input type="hidden" name="atLeast4Units" value={appCtx.atLeast4Units} />
                    <input type="hidden" name="condo" value={appCtx.condo} />
                    <input type="hidden" name="bizOwner" value={appCtx.bizOwner} />
                    <input type="hidden" name="exmpetionNotice" value={appCtx.exmpetionNotice} />
                    <input type="hidden" name="sfh" value={appCtx.sfh} />
                    <input type="hidden" name="landlordShare" value={appCtx.landlordShare} />
                    <input type="hidden" name="duplex" value={appCtx.duplex} />
                    <input type="hidden" name="sharedDuplex" value={appCtx.sharedDuplex} />
                    <input type="hidden" name="sharedUnitWithLandlord" value={appCtx.sharedUnitWithLandlord} />
                    {submitForm(appCtx)}
                </form>
            )}
        </AppContext.Consumer>
    );
};

export default AutoSubmit;