import { Link } from "react-router-dom";
import Logo from "../header/logo/Logo";
import { StyledCommonWrapper } from "styles/Common.styled";
import {
  StyledHeader,
  StyledContainer,
  StyledContainerUserBtn,
} from "./Header.styled";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <StyledHeader>
      <StyledCommonWrapper>
        <StyledContainer className={isLoggedIn ? "auth-user" : ""}>
          <Logo isLoggedIn={isLoggedIn} />
          {isLoggedIn && (
            <StyledContainerUserBtn>
              <Link to="/logout">Logout</Link>
            </StyledContainerUserBtn>
          )}
        </StyledContainer>
      </StyledCommonWrapper>
    </StyledHeader>
  );
};
export default Header;
