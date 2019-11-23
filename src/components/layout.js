import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import "../styles/typography.scss";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 16px repeat(4, 1fr) 16px;
  grid-template-rows: 85px auto auto;
  min-height: 100vh;
  grid-template-areas:
    "hd  hd   hd   hd   hd   hd"
    "... main main main main ..."
    "ft  ft   ft   ft   ft   ft";
  @media (min-width: 980px) {
    grid-template-columns: 2fr repeat(12, 1fr) 2fr;
    grid-template-areas:
      "hd  hd   hd   hd   hd   hd   hd   hd   hd   hd   hd   hd   hd   hd"
      "... main main main main main main main main main main main main ..."
      "ft  ft   ft   ft   ft   ft   ft   ft   ft   ft   ft   ft   ft   ft";
  }
  * {
    box-sizing: border-box;
  }
  header {
    grid-area: hd;
  }
  footer {
    margin-top: 2rem;
    grid-area: ft;
  }
  main {
    min-height: calc(100vh - 85px);
    max-width: 100%;
    grid-area: main;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .inline-grid {
    display: inline-grid;
    grid-template-columns: inherit;
    column-gap: inherit;
  }
  ul {
    &.cities {
      margin-left: 0;
    }
  }
`;

// import "./layout.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Container>
          <Header siteTitle={data.site.siteMetadata.title} />
          <main>{children}</main>
          <Footer></Footer>
        </Container>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
