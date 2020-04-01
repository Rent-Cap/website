import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import AppContext from "../components/AppContext";
import HeaderEn from "./Header-en";
import HeaderEs from "./Header-es";
import FooterEn from "./Footer-en";
import FooterEs from "./Footer-es";
import "../styles/typography.scss";
import "../styles/layout.scss";

if (typeof document !== "undefined") {
  require("details-element-polyfill");
}

const Layout = ({ location, children }) => {
  return (
    <div>
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
          <div className="pageContainer">
            <AppContext.Consumer>
              {({ appCtx, updateContext }) => {
                return (
                  <>
                    {appCtx.lang && appCtx.lang === "es" ? (
                      <HeaderEs
                        siteTitle={data.site.siteMetadata.title}
                        location={location}
                      />
                    ) : (
                      <HeaderEn
                        siteTitle={data.site.siteMetadata.title}
                        location={location}
                      />
                    )}
                    <main id="main-content">{children}</main>
                    {appCtx.lang && appCtx.lang === "es" ? (
                      <FooterEs location={location} />
                    ) : (
                      <FooterEn location={location} />
                    )}
                  </>
                );
              }}
            </AppContext.Consumer>
          </div>
        )}
      />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
