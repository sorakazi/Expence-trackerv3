import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { StyledLogo } from "./Logo.styled";
import { LogoIcon } from "components/header/svgs";

const Logo = ({ isLoggedIn }) => {
  return (
    <StyledLogo>
      <Link to={isLoggedIn ? "/transactions/incomes" : "/"}>
        <LogoIcon className="logo-icon-svg" width={27} height={16} />

        <p>ExpenseTracker</p>
      </Link>
    </StyledLogo>dddddddd
  );
};

export default Logo;

Logo.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
