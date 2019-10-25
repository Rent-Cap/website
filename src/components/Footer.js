import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    text-align: center;
    font-size: 18px;
    grid-column: 4 / span 8;
    font-weight: 200;
    color: #979797;
`

const Footer = () => 
<StyledFooter>
    The information contained on this website is provided for informational purposes only, and should not be considered legal advice on any matter
</StyledFooter>;

export default Footer;
