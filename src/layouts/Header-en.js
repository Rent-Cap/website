import React, { useState } from "react";
import Helmet from "react-helmet";
import Logo from "../components/Logo";
import { Link, navigate } from "gatsby";
import "../styles/header.scss";
import AppContext from "../components/AppContext";
import LanguageSelect from "../components/LanguageSelect";

const Header = ({ location }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Helmet>
        <meta property="og:title" content="California Tenant Protections" />
        <meta property="og:site_name" content="California Tenant Protections" />
        <meta property="og:url" content="https://tenantprotections.org/" />
        <meta
          property="og:description"
          content="Are you a California resident who wants to know whether your rent is protected under rent control or the new Tenant Protections Act? Rent Cap can help you find out!"
        />
        <meta property="og:image" content="/Opengraph-es.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <a id="skip-links" href="#main-content">
        Skip Links
      </a>
      <header className="inline-grid">
        <Link to="/">
          <Logo />
        </Link>
        <div className="right-links">
          <AppContext.Consumer>
            {({ appCtx, updateContext }) => (
              <LanguageSelect
                location={location}
                appCtx={appCtx}
                updateContext={updateContext}
              />
            )}
          </AppContext.Consumer>
          <div id="mobile-trigger">
            <button type="button" onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 32 32"
                width="32px"
              >
                <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div id="links" data-open={`${open}`}>
        <ul>
          <li>
            <Link
              to="/eligibility"
              onClick={() => {
                setOpen(false);
              }}
            >
              Am I Protected?
            </Link>
          </li>
          <li>
            <Link
              to="/calculator"
              onClick={() => {
                setOpen(false);
              }}
            >
              Rent Calculator
            </Link>
          </li>
          <li>
            <Link
              to="/about-the-bill"
              onClick={() => {
                setOpen(false);
              }}
            >
              About the bill
            </Link>
          </li>
          <li>
            <Link
              to="/resources"
              onClick={() => {
                setOpen(false);
              }}
            >
              Resources
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              onClick={() => {
                setOpen(false);
              }}
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
