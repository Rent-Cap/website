import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
import AppContext from "./AppContext";

const LanguageSelect = ({ location, appCtx, updateContext }) => {
  const [currentLanguage, setCurrentLanguage] = useState();

  useEffect(() => {
    // reset this now we are setting it
    let defaultLang = false;

    // Chain else-ifs for additional languages
    if (appCtx.defaultLang && appCtx.browserLang) {
      // if we don't have a language yet allow browser lang to set the default
      // then navigate to the right language
      setCurrentLanguage(appCtx.browserLang);
      updateContext({ lang: appCtx.browserLang, defaultLang });
      navigateLang(appCtx.browserLang);
    }
    else if (location.pathname.startsWith("/es")) {
      updateContext({ lang: "es", defaultLang });
      setCurrentLanguage("es");
    } else {
      updateContext({ lang: "en", defaultLang })
      setCurrentLanguage("en");

    }
  }, [location]);

  const getPathWithoutLanguage = () => {
    const path = location.pathname;
    if (path.startsWith("/es")) return path.substring(3);
    return path;
  };

  const handleChange = (e) => {
    navigateLang(e.target.value);
    console.log("state", currentLanguage);
  };

  const navigateLang = (lang) => {
  switch (lang) {
    case "es":
      if (currentLanguage === "es") return;
      navigate(`/es/${getPathWithoutLanguage()}`);
    default:
      if (currentLanguage === "en") return;
      navigate(getPathWithoutLanguage());
    }
  };

  return (
    <div className="lang-select-wrapper">
      <select id="lang-select" onChange={handleChange}>
        <option value="en" defaultValue selected={currentLanguage === "en"}>
          EN
        </option>
        <option value="es" selected={currentLanguage === "es"}>
          ES
        </option>
      </select>
      <i className="down"></i>
    </div>
  );
};

export default LanguageSelect;
