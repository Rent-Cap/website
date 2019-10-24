import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledPrimaryButton = styled.button`
  border-radius: 10px;
  border: 4px solid greenyellow;
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
