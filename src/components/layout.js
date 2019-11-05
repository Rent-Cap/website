import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./Header";
import styled from "styled-components";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 16px repeat(4, 1fr) 16px;
  grid-template-rows: 60px auto auto;
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
  header {
    grid-area: hd;
  }
  main {
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
      <Container>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main
          style={{
            margin: "0 auto 85px",
            maxWidth: 960,
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0
          }}
        >
          {children}
        </main>
        <Footer></Footer>
      </Container>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
