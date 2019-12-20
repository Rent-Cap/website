import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";

const LanguageSelect = ({ location, updateContext }) => {
  const [currentLanguage, setCurrentLanguage] = useState();

  useEffect(() => {
    // Chain else-ifs for additional languages
    if (location.pathname.startsWith("/es")) {
      updateContext({ lang: "es" });
      setCurrentLanguage("es");
    } else {
      updateContext({ lang: "en" });
      setCurrentLanguage("en");
    }
  }, [location]);

  const getPathWithoutLanguage = () => {
    const path = location.pathname;
    if (path.startsWith("/es")) return path.substring(3);
    return path;
  };

  const handleChange = e => {
    switch (e.target.value) {
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
