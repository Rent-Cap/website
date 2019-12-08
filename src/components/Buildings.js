import React from "react";
import Building from "./Building";
import AppContext from "./AppContext"
import { navigate } from "@reach/router";

const buildingTypes = [
  {
    title: "Single Family",
    description: "You live on a property that has one unit, such as a house, on it, even if you only rent a room or live in an 'in-law'.",
    type: "sfh",
    to: "/eligibility/state/sfh",
  },
  {
    title: "Duplex",
    description: "You live in a property that has exactly two separate units in it.",
    type: "duplex",
    to: "/eligibility/state/duplex",
  },
  {
    title: "Apartment",
    description:
      "You live in a building with three or more units.",
      type: "apartment",
      to: "/eligibility/state/condo",
  },
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
