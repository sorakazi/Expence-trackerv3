import styled from "styled-components";

export const StyledHeader = styled.header`
  border-bottom: 1px solid var(--gray-text-10);
  padding: 18px 0;
  background-color: ${(props) => props.backgroundColor || "black"};
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &.auth-user {
    justify-content: space-between;
  }
`;

export const StyledContainerUserBtn = styled.div`
  position: relative;
  width: max-content;
`;
