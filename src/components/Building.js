import React from "react";

const Building = ({ title, description, onClick }) => (
  <li className="building-card" onClick={(e)=>{onClick(e)}}>
    <div></div>
    <h2>{title}</h2>
    <p>{description}</p>
  </li>
);

export default Building;
