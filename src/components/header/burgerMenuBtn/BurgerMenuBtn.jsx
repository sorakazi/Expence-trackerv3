import React, { useState } from "react";
import BurgerMenu from "components/header/burgerMenu/BurgerMenu";
import { StyledBurgerBtn } from "./BurgerMenuBtn.styled";
import { BurgerMenuIcon } from "components/svgs";

const BurgerMenuBtn = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const openBurgerMenu = () => {
    setIsBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };

  return (
    <StyledBurgerBtn>
      <button className="burger-button" onClick={openBurgerMenu}>
        <BurgerMenuIcon />
      </button>
      {isBurgerMenuOpen && <BurgerMenu closeBurgerMenu={closeBurgerMenu} />}
    </StyledBurgerBtn>
  );
};

export default BurgerMenuBtn;
