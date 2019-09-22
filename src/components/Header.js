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
    grid-column-start: 2;
    grid-column-end: span 2;
    img {
      margin-bottom: 0;
      width: 48px;
    }
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
      <meta property="og:image" content="/static/rentcap.svg" />
      <link rel="icon" href="/static/rentcap.svg" type="image/svg+xml" />
    </Helmet>
    <TypographyStyle typography={typography} />
    <GoogleFont typography={typography} />
    <Link>
      <Logo />
    </Link>
  </StyledHeader>
);

export default Header;
