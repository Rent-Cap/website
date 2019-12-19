import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import AppContext from '../components/AppContext';
import HeaderEn from "./Header-en";
import HeaderEs from "./Header-es";
import FooterEn from "./Footer-en";
import FooterEs from "./Footer-es";
import "../styles/typography.scss";
import "../styles/layout.scss";

if (typeof document !== "undefined") {
  require("details-element-polyfill");
}
// import "./layout.css";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => (
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
              {({ appCtx, updateContext }) => (
                (appCtx.lang && appCtx.lang === 'es') ?
                  <HeaderEn siteTitle={data.site.siteMetadata.title} />
                  :
                  <HeaderEs siteTitle={data.site.siteMetadata.title} />
              )}
            </AppContext.Consumer>
            <main id="main-content">{this.props.children}</main>
            <AppContext.Consumer>
              {({ appCtx, updateContext }) => (
                (appCtx.lang && appCtx.lang === 'es') ?
                  <FooterEn />
                  :
                  <FooterEs />
              )}
            </AppContext.Consumer>
          </div>
        )}
      />
    </div>
  );

  propTypes = {
    children: PropTypes.node.isRequired
  };
}

export default Layout;
