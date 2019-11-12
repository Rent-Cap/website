import React from "react";
import styled from "styled-components";
import { Link, navigate } from "gatsby";

const StyledPrimaryButton = styled.button`
  display: inline-block;
  border-radius: 10px;
  background: #ffcc00;
  color: black;
  padding: 28px 80px;
  font-size: 24px;
  line-height: 33px;
  font-weight: 700;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  @media screen and (min-width: 767px) {
    width: auto;
  }
`;

const StyledSecondaryButton = styled.button`
  border-radius: 10px;
  border: 4px solid purple;
`;

export const SecondaryButton = ({ to, children }) => {
  return (
    <StyledSecondaryButton onClick={() => navigate(to)}>
      {children}
    </StyledSecondaryButton>
  );
};

export const PrimaryButton = ({ to, children }) => {
  return (
    <StyledPrimaryButton onClick={() => navigate(to)} type="button">
      {children}
    </StyledPrimaryButton>
  );
};

export default PrimaryButton;
