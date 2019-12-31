import React from "react";

// Explainer here: https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
// See also: ../../gatsby-browser.js

/*
zip: '', // zip code
area: '', // statistical area for CPI calc
town: '', // encorporated town/city for local ordinances 
county: '', // county for local ordinances
building_age: null, // building age (proxy for certificate of occupancy)
rental_type: null, // category of rental (e.g. condo, sfh, room, dorm room, hotel, etc)
duplex: null, // in a unit of a duplex
sfh_or_condo: null, // in a condo or single family home (proxy for alienable separable from title)
share_with_landlord: null, // do they share either a sfh/condo with landlord or duplex
share_bathroom_kitchen: null, // do they share a bathroom of kitchen with their landlord
gov_housing: null, // is it gov housing (or subsidized)
dorm: null, // is it a dorm
corp_owned: null, // is it owned by a corp
notice: null, // did they get a notice of excemption
shared_with_landlord_start_of_lease: null, // did they share with the landlord at the start of their lease
*/

const defaultState = {
  appCtx: { lang: "en", defaultLang: true, browserLang: null },
  updateContext: () => {}
};
const AppContext = React.createContext(defaultState);

class AppContextProvider extends React.Component {
  state = {
    ...defaultState
  };

  updateContext = appCtx => {
    appCtx = { ...this.state.appCtx, ...appCtx };
    this.setState({ appCtx });
  };

  componentDidMount() {
    // Getting appstate mode value from localStorage!
    const lsAppCtx = JSON.parse(localStorage.getItem("appCtx"));
  
    if (lsAppCtx) {
      this.setState({ appCtx: { ...lsAppCtx } });
    } else {
      // if we don't have a stored state then try to set lang from browser
      if (window.navigator.language) {
        if (window.navigator.language.startsWith("es")) { 
          this.setState({ appCtx: { ...this.state.appCtx, ...{ browserLang: "es"} } }, (s)=>{console.log(this.state)});
        }
      }
    }
  }

  render() {
    const { children } = this.props;
    const { appCtx } = this.state;

    return (
      <AppContext.Provider
        value={{
          appCtx,
          updateContext: this.updateContext
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
export { AppContextProvider };
