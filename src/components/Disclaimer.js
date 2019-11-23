import React from "react";
import { Link } from "gatsby";

const Disclaimer = () => {
  return (
    <small>
      This does not consider local rent control ordinances, please check{" "}
      <Link to="/resources/local-ordinances">here</Link> for your local laws.
    </small>
  );
};

export default Disclaimer;
