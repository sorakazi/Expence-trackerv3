import React from "react";
import PropTypes from "prop-types";
import { StyledLogo } from "./Logo.styled";
import { LogoIcon } from "components/header/svgs";

const Logo = ({ isLoggedIn }) => {
  return (
    <StyledLogo>
      <LogoIcon className="logo-icon-svg" width={27} height={16} />

      <p>ExpenseTracker</p>
    </StyledLogo>
  );
};

export default Logo;

Logo.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
