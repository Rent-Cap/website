import React from "react";
import { Link } from "gatsby";

const Disclaimer = () => {
  return (
    <small>
      This does not consider local rent control ordinances. Check out our {" "}
      <Link to="/resources">resources page</Link> for more help.
    </small>
  );
};

export default Disclaimer;
