import React from "react";
import {
  Amount,
  Flex,
  IconWrapper,
  Percent,
  StyledDecorationTab,
  Text,
} from "./DecorationTab.styled";
import MoveDecorationTab from "./MovingDecorationTab";
import { ArrowRightUpIcon } from "components/svgs";

const DecorationTab = () => {
  return (
    <MoveDecorationTab>
      {(position, balance, percentage) => (
        <div
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <StyledDecorationTab>
            <IconWrapper>
              <ArrowRightUpIcon />
            </IconWrapper>
            <div>
              <Text>Your balance</Text>
              <Flex>
                <Amount>${balance}</Amount>
                <Percent>+{percentage}%</Percent>
              </Flex>
            </div>
          </StyledDecorationTab>
        </div>
      )}
    </MoveDecorationTab>
  );
};

export default DecorationTab;
