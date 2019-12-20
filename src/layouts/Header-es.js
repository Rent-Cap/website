import React, { useState } from "react";
import Helmet from "react-helmet";
import Logo from "../components/Logo";
import { Link, navigate } from "gatsby";
import "../styles/header.scss";
import AppContext from '../components/AppContext';

const Header = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Rent Cap" />
        <meta property="og:site_name" content="Rent Cap" />
        <meta property="og:url" content="https://rentcap.info" />
        <meta
          property="og:description"
          content="Are you a California resident who wants to know whether your rent is protected under rent control or the new Tenant Protections Act? Rent Cap can help you find out!"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <a id="skip-links" href="#main-content">
        Skip Links
      </a>
      <header className="inline-grid">
        <Link to="/es">
          <Logo />
        </Link>
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
      </header>
      <AppContext.Consumer>
        {({ appCtx, updateContext }) => (
          <div>

            <button onClick={() => { updateContext({ lang: 'en' }); const url = props.location.pathname; if (url.startsWith('/es')) { navigate(url.substring(3)); } }}>en</button> / <button onClick={() => { updateContext({ lang: 'es' }); const url = props.location.pathname; if (!url.startsWith('/es')) { navigate('/es' + url); } }}>es</button>
          </div>
        )}
      </AppContext.Consumer>
      <div id="links" data-open={`${open}`}>
        <ul>
          <li>
            <Link
              to="/es/eligibility"
              onClick={() => {
                setOpen(false);
              }}
            >
              ¿Estoy Protegido?
            </Link>
          </li>
          <li>
            <Link
              to="/es/calculator"
              onClick={() => {
                setOpen(false);
              }}
            >
              Calcule Su Renta
            </Link>
          </li>
          <li>
            <Link
              to="/es/about-the-bill"
              onClick={() => {
                setOpen(false);
              }}
            >
              Sobre La Protección de Inquilinos
            </Link>
          </li>
          <li>
            <Link
              to="/es/resources"
              onClick={() => {
                setOpen(false);
              }}
            >
              Recursos
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
