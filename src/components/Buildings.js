import React from "react";
import Building from "./Building";
import AppContext from "./AppContext"
import { navigate } from "@reach/router";

const buildingTypes = [
  {
    title: "Apartment",
    description:
      "The property has multiple (3+) units that are all rented. In apartments buildings all residents will rent from the same owner.",
      type: "apartment",
      to: "/tom/state/apartments",
  },
  {
    title: "Duplex",
    description: "The property has exactly 2 separate units in it. The other unit may or may not be rented.",
    type: "duplex",
    to: "/tom/state/duplex",
  },
  {
    title: "Single Family",
    description: "The property has one living space in it and you rent either all or some of it (such as a bedroom or an 'in-law' apartment).",
    type: "sfh",
    to: "/tom/state/sfh",
  },
  {
    title: "Condo",
    description:
      "The property has multiple (3+) units that have been bought by individual owners. In a condo residents will either own their apartments or rent from different landlords.",
    type: "condo",
    to: "/tom/state/condo",
  }
];

const onClick = (appCtx, updateContext, type, to) => {
  appCtx.buildingType = type;
  updateContext(appCtx);

  navigate(to);
}

const Buildings = (buildings) => {
  if (Object.keys(buildings).length === 0) {
    buildings = buildingTypes;
  }
  const listItems = buildings.map(building => {
    return (
      <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
          <Building
            key={building.title}
            title={building.title}
            description={building.description}
            onClick={(e)=>{onClick(appCtx, updateContext, building.type, building.to)}}
          ></Building>
        )}
      </AppContext.Consumer>
    );
  });
  return <ul className="buildings-list">{listItems}</ul>;
};
export default Buildings;
