import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import UserBarBtn from "components/header/userBar/UserBarBtn";
import TransactionsHistoryNav from "components/header/navBar/TransactionsHistoryNav";
import UserPanel from "../userPanel/UserPanel";
import { StyledContainerUserBtn } from "../Header.styled";
import {
  ModalBackdrop,
  StyledBurgerMenu,
  StyledCloseBurgerBtn,
} from "./BurgerMenu.styled";
import { CloseBurgerIcon } from "components/svgs";

// Ensure this element exists in your HTML file
const modalRoot = document.querySelector("#modal");

const BurgerMenu = ({ closeBurgerMenu }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  const toggleUserPanel = () => {
    setIsUserPanelOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleModalCloseKeyDown = (e) => {
      if (e.code === "Escape") {
        closeBurgerMenu();
      }
    };

    document.addEventListener("keydown", handleModalCloseKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleModalCloseKeyDown);
      document.body.style.overflow = "visible";
    };
  }, [closeBurgerMenu]);

  const handleModalClose = (e) => {
    if (e.currentTarget === e.target) {
      closeBurgerMenu();
    }
  };

  return ReactDOM.createPortal(
    <ModalBackdrop onClick={handleModalClose}>
      <StyledBurgerMenu>
        <StyledCloseBurgerBtn onClick={closeBurgerMenu}>
          <CloseBurgerIcon width={27} height={27} />
        </StyledCloseBurgerBtn>
        <StyledContainerUserBtn>
          <UserBarBtn
            variant="burger"
            toggleUserPanel={toggleUserPanel}
            isUserPanelOpen={isUserPanelOpen} // Pass this prop to ensure correct behavior
          />
          {isUserPanelOpen && <UserPanel variant="burger" />}
        </StyledContainerUserBtn>
        <TransactionsHistoryNav
          closeBurgerMenu={closeBurgerMenu}
          variant="burger" // Ensure this variant is handled properly in TransactionsHistoryNav
        />
      </StyledBurgerMenu>
    </ModalBackdrop>,
    modalRoot
  );
};

BurgerMenu.propTypes = {
  closeBurgerMenu: PropTypes.func.isRequired,
};

export default BurgerMenu;
