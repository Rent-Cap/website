import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/typography.scss";
import "../styles/layout.scss";
import AppContext from "../components/AppContext"

// import "./layout.css";

class Layout extends React.Component {

  constructor (props) {
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
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>{this.props.children}</main>
            <Footer></Footer>
          </div>
        )}
      />
    <AppContext.Consumer>{ appCtx => (console.log('wat', appCtx))}</AppContext.Consumer>
    </div>
  );

  propTypes = {
    children: PropTypes.node.isRequired
  };
}

export default Layout;
