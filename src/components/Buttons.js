import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledPrimaryButton = styled.button`
  border-radius: 10px;
  background: #FFCC00;
  color: black;
  padding: 28px 80px;
  font-size: 24px;
  line-height: 33px;
  font-weight: 700;
`;

const StyledSecondaryButton = styled.button`
  border-radius: 10px;
  border: 4px solid purple;
`;

export const SecondaryButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <StyledSecondaryButton>
        {children}
      </StyledSecondaryButton>
    </Link>
  )
}

export const PrimaryButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <StyledPrimaryButton>
        {children}
      </StyledPrimaryButton>
    </Link>
  );
};

export default PrimaryButton;
