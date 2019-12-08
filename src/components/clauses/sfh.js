import AppContext from "../AppContext";
import { navigate } from "gatsby";
import React from "react";

const SingleFamilyHome = () => {
    return (
    <AppContext.Consumer>
        {({ appCtx}) => 
                {
                appCtx.shareWithLandlord ?
                    navigate('/eligibility/state/sfhShared')
                    :
                    navigate('/eligibility/state/sfhNotShared')
                }
        }
    </AppContext.Consumer>
    )
}

export default SingleFamilyHome