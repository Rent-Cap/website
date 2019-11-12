import React from "react";

const Building = ({ title, description }) => (
  <li className="building-card">
    <div></div>
    <h2>{title}</h2>
    <p>{description}</p>
  </li>
);

export default Building;
