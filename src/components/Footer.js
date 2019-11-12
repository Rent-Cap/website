import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: inline-grid;
  grid-template-columns: inherit;
  p {
    font-size: 0.8rem;
    line-height: 0.9rem;
    grid-column-start: 2;
    grid-column-end: -2;
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      The information contained on this website is provided for informational
      purposes only, and should not be considered legal advice on any matter
    </p>
  </StyledFooter>
);
export default Footer;
