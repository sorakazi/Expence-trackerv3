import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../header/logo/Logo";
import {
  StyledHeader,
  StyledContainer,
  StyledContainerUserBtn,
} from "./Header.styled";

const Header = ({ isLoggedIn }) => {
  return (
    <StyledHeader>
      <StyledContainer className={isLoggedIn ? "auth-user" : ""}>
        <Logo isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <StyledContainerUserBtn>
            <Link to="/logout">Logout</Link>
          </StyledContainerUserBtn>
        )}
      </StyledContainer>
    </StyledHeader>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
