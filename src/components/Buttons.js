import React from "react";
import { Link, navigate } from "gatsby";
import "../styles/buttons.scss";

const DefaultButton = ({ className, children, type = "button", ...props }) => (
  <button type={type} className={`button ${className}`} {...props}>
    {children}
  </button>
);
export const StyledPrimaryButton = props => (
  <DefaultButton className="primaryButton" {...props}></DefaultButton>
);
export const StyledSecondaryButton = props => (
  <DefaultButton className="secondaryButton" {...props}></DefaultButton>
);

export const SecondaryButton = ({ to, children }) => {
  return (
    <StyledSecondaryButton onClick={() => navigate(to)}>
      {children}
    </StyledSecondaryButton>
  );
};

export const PrimaryButton = ({ to, children}) => {
  return (
    <StyledPrimaryButton onClick={() => navigate(to)} type="button">
      {children}
    </StyledPrimaryButton>
  );
};

// Versions from Calculator
// export const PrimaryButton = ({onClick, children}) => (
//   <button onClick={onClick} className="btn btn-outline-primary">{children}</button>
// )
// export const SecondaryButton = ({onClick, children}) => (
//   <button onClick={onClick} className="btn btn-outline-secondary">{children}</button>
// )
export const SuccessButton = ({ onClick, children }) => (
  <button onClick={onClick} className="btn btn-outline-success">
    {children}
  </button>
);
export const DangerButton = ({ onClick, children }) => (
  <button onClick={onClick} className="btn btn-outline-danger">
    {children}
  </button>
);
