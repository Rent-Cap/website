import zipDB from "../../data/zipDB";
import cpis from "../../data/cpiDB";

/*
*  CA Civil Code 1947.12. (g) (2)
*  “Percentage change in the cost of living” means the percentage change from April 1 of the prior year to April 1 
*  of the current year in the regional Consumer Price Index for the region where the residential real property is located, 
*  as published by the United States Bureau of Labor Statistics. If a regional index is not available, the California Consumer
*  Price Index for All Urban Consumers for all items, as determined by the Department of Industrial Relations, shall apply.
*/

export function dateAndAreaToCPI({ d, area, compat='soft' }) {
    // TODO (@sh1mmer) validate the compat modes, etc with the lawyers
    // tldr it's a bit messed up rn imo
    // WARNING current way compat mode is may mean the answers fluctuate as new CPIs become available
    // TODO (@sh1mmer) consider changing this so the hard compat mode always uses -2 years until April to make answers consistent 
    let year = d.getFullYear();
    let month = d.getMonth();
    let areas;
    if (cpis[year - 1]) {
        // try the previous year e.g. 2019 uses "2018" for the Apr 1 2018-2019 CPI delta
        areas = cpis[year -1];
    } else if (compat === 'soft' && cpis[year -2]) {
        // if we have soft compat on we allow checking 2 years ago since the year's delta won't have been published
        // e.g. Jan 2020 can use "2018" (Apr 1 2018- Apri 1 2019 delta)
        areas = cpis[year -2];
    } else if (compat === 'hard' && month < 4 && cpis[year -2]) {
        // if we have hard compat on we allow checking 2 years ago until april and then we fail
        areas = cpis[year -2];
    } else {
        // otherwise throw an error
        throw new Error("No CPI for " + year + " found. Has the CPI between " + (year -1) + "and " + year + " been published?");
    }

    if (!areas[area]) {
        throw new Error("Cannot find statistical area " + area + ". Please use one of: " + Object.keys(areas).join(",") + ".");
    }

    return areas[area];
}

export function dateAndZipToCPI({ d, zip, compat }) {
    if (!zipDB[zip]) {
        throw new Error("Please use valid California zip code");
    }

    let area = zipDB[zip].area;

    return dateAndAreaToCPI({ d, area: area, compat });
}