import React from "react";
import AppContext from "./AppContext";

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
};

const AutoSubmit = ({ pageName }) => {
    const submitForm = (appCtx, updateContext) => {
        // TODO (tomc) figure out how to submit both calc and eligibilty exactly once
        pageName = pageName ? pageName : 'autoSubmit';

        if (appCtx.includeDetails && !appCtx[pageName]) {

            const values = {
                firstName: appCtx.firstName, 
                lastName: appCtx.lastName, 
                email: appCtx.email, 
                cell: appCtx.cell,
                ab1482TenancyDuration: appCtx.ab1482TenancyDuration,
                ineligibleType: appCtx.ineligibleType,
                voucher: appCtx.voucher,
                builtBefore2005: appCtx.builtBefore2005,
                sharedKitchenOrBath: appCtx.sharedKitchenOrBath,
                atLeast4Units: appCtx.atLeast4Units,
                condo: appCtx.condo,
                bizOwner: appCtx.bizOwner,
                exmpetionNotice: appCtx.exmpetionNotice,
                sfh: appCtx.sfh,
                shareWithLandlord: appCtx.shareWithLandlord,
                duplex: appCtx.duplex,
                sharedDuplex: appCtx.sharedDuplex,
                sharedUnitWithLandlord: appCtx.sharedUnitWithLandlord,
                lang: appCtx.lang
            }
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "eligibiltyAnswers", ...values })
            }).then(()=>{
                var newCtx = {};
                newCtx[pageName] = true;
                updateContext( { appCtx, ...newCtx });
                console.log(values);
            }).catch(error => console.log(error));
            
        }

    };

    return (
        <AppContext.Consumer>
            {({ appCtx, updateContext }) => (
                <form  name="eligibiltyAnswers" data-netlify="true" data-netlify-honeypot="bot-field">
                    <input type="hidden" name="form-name" value="eligibiltyAnswers" />
                    <input type="hidden" name="ab1482TenancyDuration" value={appCtx.ab1482TenancyDuration} />
                    <input type="hidden" name="ineligibleType" value={appCtx.ineligibleType} />
                    <input type="hidden" name="voucher" value={appCtx.voucher} />
                    <input type="hidden" name="builtBefore2005" value={appCtx.builtBefore2005} />
                    <input type="hidden" name="sharedKitchenOrBath" value={appCtx.sharedKitchenOrBath} />
                    <input type="hidden" name="atLeast4Units" value={appCtx.atLeast4Units} />
                    <input type="hidden" name="condo" value={appCtx.condo} />
                    <input type="hidden" name="bizOwner" value={appCtx.bizOwner} />
                    <input type="hidden" name="exmpetionNotice" value={appCtx.exmpetionNotice} />
                    <input type="hidden" name="sfh" value={appCtx.sfh} />
                    <input type="hidden" name="shareWithLandlord" value={appCtx.shareWithLandlord} />
                    <input type="hidden" name="duplex" value={appCtx.duplex} />
                    <input type="hidden" name="sharedDuplex" value={appCtx.sharedDuplex} />
                    <input type="hidden" name="sharedUnitWithLandlord" value={appCtx.sharedUnitWithLandlord} />
                    <input type="hidden" name="lang" value={appCtx.lang} />
                    {submitForm(appCtx, updateContext)}
                </form>
            )}
        </AppContext.Consumer>
    );
};

export default AutoSubmit;