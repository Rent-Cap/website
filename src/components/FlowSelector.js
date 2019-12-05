import { PrimaryButton } from "../components/Buttons";
import React from "react"
import AppContext from "./AppContext"

const controlCounties = {
    "Alameda": true,
    "San Francisco": true,
};
const controlTowns = {
    "Oakland": true,
    "Berkley": true,
};

function FlowButton(props) {
    console.log('zip: ' + props.appCtx.zip, 'town: ' + props.appCtx.town, 'county: ' + props.appCtx.county);
    var zip = props.appCtx.zip;
    var town = props.appCtx.town;
    var county = props.appCtx.county;
    var to = ""
    if (town in controlTowns) {
        to = "tom/cities/" + town;
    } else if (county in controlCounties) {
        to = "tom/counties/" + county;
    } else if (zip != '') {
        to = "tom/state"
    } else {
        to = "tom/noop"
    }
    return (<PrimaryButton to={to}>Look up</PrimaryButton>)
}


class FlowSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: ''
        }
    }

    render() {
        return (
            <AppContext.Consumer>
                {({ updateContext, appCtx }) => (
                    <FlowButton appCtx={appCtx} />
                )}
            </AppContext.Consumer>
        )
    }  
}

export default FlowSelector