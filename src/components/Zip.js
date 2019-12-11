import React from "react";
import AppContext from "./AppContext";
import zipDB from "../../data/zipDB";

class Zip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: ""
    };
    console.log(zipDB);
  }

  onChange = (newZip, appCtx, updateContext) => {
    console.log(zipDB);
    // only allow digits
    if (!/\d+/.test(newZip.substr(newZip.length - 1, newZip.length))) {
      newZip = newZip.substr(0, newZip.length - 1);
    }

    // keep length to 5 max
    if (newZip.length > 5) {
      newZip = newZip.substr(0, 5);
    }

    this.setState({ zip: newZip });

    if (newZip.length < 5) {
      // we only eval zips of length 5
      return;
    }

    var newCtx = {};
    for (const key in appCtx) {
      newCtx[key] = appCtx[key];
    }
    newCtx.zip = newZip;
    // if we can find this zip (then it's a CA zip) so we should set the context with the geo location
    if (newZip in zipDB) {
      newCtx.town = zipDB[newZip].town;
      newCtx.area = zipDB[newZip].area;
      newCtx.county = zipDB[newZip].county;
    } else {
      newCtx.town = undefined;
      newCtx.area = undefined;
      newCtx.county = undefined;
    }
    // we always update at least the zip for error handling
    updateContext(newCtx);
  };

  render() {
    return (
      <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
          <input
            type="text"
            value={this.state.zip}
            onChange={e => {
              this.onChange(e.target.value, appCtx, updateContext);
            }}
          />
        )}
      </AppContext.Consumer>
    );
  }
}

export default Zip;
