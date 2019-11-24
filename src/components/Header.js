import React from "react";
import Helmet from "react-helmet";
import Logo from "./Logo";
import { Link } from "gatsby";
import "../styles/header.scss";

const Header = () => (
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
    <header className="inline-grid">
      <Link to="/">
        <Logo />
      </Link>
      <ul id="languages">
        <li>
          <strong>
            <Link to="/">English</Link>
          </strong>
        </li>
        <li>
          <Link to="/es">Español</Link>
        </li>
      </ul>
    </header>
  </>
);

export default Header;
