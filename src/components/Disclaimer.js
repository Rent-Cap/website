import React from "react";
import { Link } from "gatsby";
import AppContext from "./AppContext";

var dict = {
    en: {
        text1: "This does not consider local rent control ordinances. Check out our ",
        text2: "resources page",
        text3: "for more help.",
    },
    es: {
        text1: "Esto no considera las ordenanzas locales de control de alquileres. Consulte nuestra",
        text2: "página de recursos",
        text3: "para obtener más ayuda.",
    }
};

const Disclaimer = () => {
  return (
    <AppContext.Consumer>
      {({ appCtx }) => (
      <small>
        {dict[appCtx.lang].text1}
        <Link to="/resources">{dict[appCtx.lang].text2}</Link> {dict[appCtx.lang].text3}
      </small>
    )}
    </AppContext.Consumer>
  );
};

export default Disclaimer;
