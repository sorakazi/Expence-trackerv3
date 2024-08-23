import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormWrapper = styled.form`
  height: 100%;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 50px;

  ul {
    margin-bottom: 80px;

    @media screen and (min-width: 1280px) {
      margin-bottom: 60px;
    }
  }

  @media screen and (min-width: 768px) {
    max-width: 399px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 12px 18px;

  background: transparent;
  border: 1px solid var(--gray-text-20);
  border-radius: var(--border-radius-12);
  color: var(--white-color);

  font-size: 16px;
  line-height: 24px;

  &::placeholder {
    color: var(--gray-text-40);
  }

  &:focus {
    border: 1px solid var(--primary-color);
    color: var(--white-color);
  }

  &.error {
    border: 1px solid var(--error-color);
  }

  &.success {
    border: 1px solid var(--success-color);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
    background-color: transparent;
    color: var(--white-color);
  }

  @media screen and (min-width: 768px) {
    height: 42px;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  cursor: pointer;

  min-width: 138px;
  padding: 14px 44px;
  margin-bottom: 20px;
  border: none;
  border-radius: 40px;

  font-size: 14px;
  letter-spacing: -0.02em;

  white-space: nowrap;
  transition: background-color 0.2s ease-in-out;

  background: var(--primary-color);
  color: var(--black-color);

  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--primary-hover-color);
  }

  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: var(--primary-color);
    }
  }

  @media screen and (min-width: 768px) {
    min-width: 145px;
    font-size: 16px;
  }
`;

export const NavigationWrapper = styled.div`
  span {
    color: var(--gray-text-60);
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 12px;
    line-height: 1.5;
  }
`;

export const StyledLink = styled(Link)`
  color: var(--white-color);
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 12px;
  font-style: normal;
  line-height: 1.5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const sharedMessageStyles = `
  margin-top: 4px;
  margin-left: 18px;
  font-size: 10px;
`;

export const ErrorMessage = styled.p`
  ${sharedMessageStyles}
  color: var(--error-color);
`;

export const HintMessage = styled.p`
  ${sharedMessageStyles}
  color: var(--gray-text-60);
`;
