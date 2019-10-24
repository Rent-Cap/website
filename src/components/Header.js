import React from "react";
import Helmet from "react-helmet";
import { TypographyStyle, GoogleFont } from "react-typography";
import Typography from "typography";
import lincolnTheme from "typography-theme-lincoln";
import Logo from "./Logo";
import { Link } from "gatsby";
import styled from "styled-components";
const typography = new Typography(lincolnTheme);

const StyledHeader = styled.header`
  display: inline-grid;
  max-width: 100vw;
  position: relative;
  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 24px;
    text-decoration: none;
    border-bottom: none;
    text-shadow: none;
    background-image: none;
    grid-column-start: 0;
    grid-column-end: span 1;
    img {
      margin-bottom: 0;
      width: 100px;
    }
  }
  #languages {
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content: center;
    height: 100%;
    align-items: center;
    position: absolute;
    right: 24px;
    top: 8px;
  }
`;

const Header = () => (
  <StyledHeader className="inline-grid">
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
    <TypographyStyle typography={typography} />
    <GoogleFont typography={typography} />
    <Link>
      <Logo />
    </Link>
    <ul id="languages">
      <li>
        <strong><Link to="/">English</Link></strong>
      </li>
      <li>
        <Link to="/es">Español</Link>
      </li>
    </ul>
  </StyledHeader>
);

export default Header;
