import React, { useState, useEffect, useRef } from "react";
import { StyledBgImageWrapper } from "shared/BgImageWrapper/BgImageWrapper.styled";
import { useWindowSizeHook } from "hooks/WindowSizeHook";

const MoveDecorationTab = ({ children }) => {
  const [position, setPosition] = useState({ top: 440, left: -9 });
  const [direction, setDirection] = useState({ top: 0, left: 1 });
  const [balance, setBalance] = useState("632.000");
  const [percentage, setPercentage] = useState("1.29");
  const { windowSize } = useWindowSizeHook();
  const bgImgWrapperRef = useRef(null);

  useEffect(() => {
    const bgImgWrapper = bgImgWrapperRef.current;

    if (!bgImgWrapper) {
      console.error("BgImageWrapper element not found");
      return;
    }

    const elementWidth = 305; // Width of the decorative element
    const elementHeight = 122; // Height of the decorative element

    const updateMovementConstraints = () => {
      const parentWidth = bgImgWrapper.clientWidth;
      const parentHeight = bgImgWrapper.clientHeight;

      // Adjust constraints for mobile sizes
      let heightAdjustment = parentHeight - elementHeight;
      let widthAdjustment = parentWidth - elementWidth;

      if (windowSize.innerWidth < 768) {
        heightAdjustment = parentHeight - 80; // Adjust for mobile sizes
        widthAdjustment = parentWidth - 240; // Adjust for mobile sizes
      }

      return { heightAdjustment, widthAdjustment };
    };

    const moveDecorationTab = () => {
      const { heightAdjustment, widthAdjustment } = updateMovementConstraints();

      setPosition((prevPosition) => {
        const newTop = prevPosition.top + 5 * direction.top;
        const newLeft = prevPosition.left + 5 * direction.left;

        // Clamp the new position values within the boundaries
        const clampedTop = Math.max(0, Math.min(newTop, heightAdjustment));
        const clampedLeft = Math.max(0, Math.min(newLeft, widthAdjustment));

        // Determine new direction based on boundaries
        const newDirection = {
          top:
            clampedTop === 0 || clampedTop === heightAdjustment
              ? -direction.top
              : direction.top,
          left:
            clampedLeft === 0 || clampedLeft === widthAdjustment
              ? -direction.left
              : direction.left,
        };

        setDirection(newDirection);

        // Update balance and percentage when hitting the edge
        if (
          clampedTop === 0 ||
          clampedTop === heightAdjustment ||
          clampedLeft === 0 ||
          clampedLeft === widthAdjustment
        ) {
          updateBalance();
          updatePercentage();
        }

        return { top: clampedTop, left: clampedLeft };
      });
    };

    const updateBalance = () => {
      setBalance(generateRandomBalance());
    };

    const updatePercentage = () => {
      setPercentage(generateRandomPercentage());
    };

    const generateRandomBalance = () => {
      const randomValue = Math.random() * (1000 - 10) + 10;
      return parseFloat(randomValue).toFixed(3);
    };

    const generateRandomPercentage = () => {
      return (Math.random() * 100).toFixed(2);
    };

    // Move decoration tab every 50 milliseconds
    const intervalId = setInterval(moveDecorationTab, 50);

    return () => clearInterval(intervalId);
  }, [direction, windowSize.innerWidth]);

  return (
    <StyledBgImageWrapper ref={bgImgWrapperRef}>
      {children(position, balance, percentage)}
    </StyledBgImageWrapper>
  );
};

export default MoveDecorationTab;
